(function(faq, undefined) {

    faq.Constants = {};
    faq.Controllers = {};
    faq.Directives = {};
    faq.Models = {};
    faq.Services = {};

}(window.faq = window.faq || {}));

(function(models, undefined) {

	/**
	* @class FAQListing
	* @this FAQListing
	* @param {JSON} data
	* @param {optional array of FAQItem} data.items
	* @param {optional array of string} data.categories
	* @description Class defining a FAQ listing, which possesses multiple FAQ items and a list of categories.
	*/
	models.FAQListing = function(data) {
		var self = this;
		self.items = [];
		self.categories = [];
		if (data !== undefined) {
			if (data.items !== undefined) {
				if (data.items.length > 0) {
					self.items = data.items.map(function(item) {
						return new faq.Models.FAQItem(item);
					});
				}
			}
			if (data.categories !== undefined) {
				self.categories = data.categories;
			}
		}
	};

	/**
	* @class FAQItem
	* @this FAQItem
	* @param {JSON} data
	* @param {optional string} data.question
	* @param {optional string} data.answer
	* @param {optional string} data.categories - A comma seperated list
	* @description Class defining a FAQ item, which possess a question, an answer, and potentially a list of categories to which it belongs.
	*/
	models.FAQItem = function(data) {
		var self = this;
		self.question = '';
		self.answer = '';
		self.categories = '';
		if (data !== undefined) {
			if (data.question !== undefined) {
				self.question = data.question;
			}
			if (data.answer !== undefined) {
				self.answer = data.answer;
			}
			if (data.categories !== undefined) {
				self.categories = data.categories;
			}
		}
	};

	/**
	* @class UmbracoProperty
	* @class UmbracoProperty
	* @param {JSON} data
	* @param {string} data.label
	* @param {string} data.description;
	* @param {string} data.view;
	* @param {JSON} data.config
	* @param {faq.Models.RTEPropertyEditorConfig} data.config.editor
	* @param {string} data.value
	* @description A Class representing the data needed to create a Umbraco Property Editor.
	*/
	models.UmbracoProperty = function(data) {
		var self = this;
		self.label = 'bodyText';
		self.description = 'Load some stuff here';
		self.view = 'rte';
		self.validation = {
			mandatory: false
		};
		self.value = '';
		if (data !== undefined) {
			if (data.label !== undefined) {
				self.label = data.label;
			}
			if (data.description !== undefined) {
				self.description = data.description;
			}
			if (data.view !== undefined) {
				self.view = data.view;
			}
			if (data.view === 'rte' || data.view === undefined) {
				// If no view defined, it's a RTE by default, so add default RTE editor config.
				self.config = {
					editor: new faq.Models.RTEPropertyEditorConfig()
				};
			} else if (data.view === 'tags') {
				self.config = {
					group: 'faq',
					storageType: 'Json'
				};
			}
			if (data.config !== undefined) {
				if (data.config.editor !== undefined) {
					self.config = {
						editor: new faq.Models.RTEPropertyEditorConfig(data.config.editor)
					};
				} else {
					self.config = data.config;
				}
			}
			if (data.value !== undefined) {
				self.value = data.value;
			}
		}
	};

	/**
	* @class RTEPropertyEditorConfig
	* @class RTEPropertyEditorConfig
	* @param {JSON} data
	* @param {array of string} data.toolbar
	* @param {array of string} data.stylesheets
	* @param {{height: integer, width: integer}} data.dimensions
	* @description A class representing configuration options for an Umbraco RT Property Editor.
	*/
	models.RTEPropertyEditorConfig = function(data) {
		var self = this;
		self.toolbar = ["code", "undo", "redo", "cut", "styleselect", "bold", "italic", "alignleft", "aligncenter", "alignright", "bullist", "numlist", "link", "umbmediapicker", "umbmacro", "table", "umbembeddialog"];
		self.stylesheets = [];
		self.dimensions = {
			height: 200
		};
		if (data !== undefined) {
			if (data.toolbar !== undefined) {
				self.toolbar = data.toolbar;
			}
			if (data.stylesheets !== undefined) {
				self.stylesheets = data.stylesheets;
			}
			if (data.dimensions !== undefined) {
				self.dimensions = {
					height: data.dimensions.height,
					width: data.dimensions.width
				};
			}
		}
	};

}(window.faq.Models = window.faq.Models || {}));

angular.module("umbraco").controller("faq.listing.editor.controller", function($scope) {

	// Initialization Methods ////////////////////////////////////////////////////

	/**
	* @method init
	* @description Triggered on the controller loaded, kicks off any initialization functions.
	*/
	$scope.init = function() {
		$scope.setVariables();
	};

	/**
	* @method createPropertyEditorsForItems
	* @param {array of faq.Models.FAQItem} items
	* @description Build a series of RTE property editors for each item, and add them to $scope.rteProperties;
	*/
	$scope.createPropertyEditorsForItems = function(items) {
		if (items && items.length > 0) {
			items.forEach(function(item, index) {
				var newRteProperty = new faq.Models.UmbracoProperty({
					label: 'Answer',
					description: '',
					value: item.answer
				});
				var newTagProperty = new faq.Models.UmbracoProperty({
					label: 'Categories',
					description: '',
					value: item.categories,
					view: 'tags'
				});
				$scope.rteProperties.push(newRteProperty);
				$scope.tagProperties.push(newTagProperty);
			});
		}
	};

	/**
	* @method watchForPropertyUpdates
	* @description Activates a $scope.$watch to listen for updates to the rteProperties in the property editors, and then update the answers accordingly.
	*/
	$scope.watchForPropertyUpdates = function() {
		$scope.$watch('rteProperties', function () {
			$scope.handleRtePropertyEditorUpdate($scope.rteProperties);
		}, true);
		$scope.$watch('tagProperties', function () {
			$scope.handleTagPropertyEditorUpdate($scope.tagProperties);
		}, true);
	};

	/**
	* @method setVariables
	* @description Called by $scope.init(). Sets the initial state for any scope variables.
	*/
	$scope.setVariables = function() {
		$scope.rteProperties = [];
		$scope.tagProperties = [];
		var value = new faq.Models.FAQListing();
		if ($scope.model.value) {
			value = new faq.Models.FAQListing($scope.model.value);
		}
		// Ensure there is at least one FAQItem.
		if (value.items.length < 1) {
			var newItem = new faq.Models.FAQItem();
			value.items.push(newItem);
		}
		$scope.createPropertyEditorsForItems(value.items);
		$scope.watchForPropertyUpdates();
		$scope.model.value = value;
	};

	// Event Handler Methods /////////////////////////////////////////////////////

	/**
	* @method addItem
	* @description Adds a new FAQItem to the array of questions.
	*/
	$scope.addItem = function() {
		var newItem = new faq.Models.FAQItem();
		var newRteProperty = new faq.Models.UmbracoProperty({
			label: 'Answer',
			description: '',
			value: ''
		});
		var newTagProperty = new faq.Models.UmbracoProperty({
			label: 'Categories',
			description: '',
			value: '',
			view: 'tags'
		});
		$scope.model.value.items.push(newItem);
		$scope.rteProperties.push(newRteProperty);
		$scope.tagProperties.push(newTagProperty);
	};

	/**
	* @method deleteItem
	* @param {integer} index - The index (zero-based) of the item to delete from the question array.
	* @description Deletes a FAQItem from the array of questions.
	*/
	$scope.deleteItem = function(index) {
		$scope.model.value.items.splice(index, 1);
		$scope.compileCategories
	};

	/**
	* @method handleRtePropertyEditorUpdate
	* @param {array of faq.Models.Umbraco} properties
	* @description Updates the $scope.model.value with any changes to the answers via the property editors.
	*/
	$scope.handleRtePropertyEditorUpdate = function(properties) {
		if (properties && properties.length) {
			properties.forEach(function(property, index) {
				$scope.model.value.items[index].answer = property.value;
			});
		}
	};

	/**
	* @method handleTagPropertyEditorUpdate
	* @param {array of faq.Models.Umbraco} properties
	* @description Updates the $scope.model.value with any changes to the categories via the property editors.
	*/
	$scope.handleTagPropertyEditorUpdate = function(properties) {
		if (properties && properties.length) {
			properties.forEach(function(property, index) {
				$scope.model.value.items[index].categories = property.value;
			});
			$scope.compileCategories();
		}
	};

	/**
	* @method sortItem
	* @param {integer} index - The index of the item to be shifted.
	* @param {integer} change - The amount of positions to shift the item by.
	* @description Sorts an item into a new position in $scope.model.value.items.
	*/
	$scope.sortItem = function(index, change) {
		$scope.model.value.items.splice((index + change), 0, $scope.model.value.items.splice(index, 1)[0]);
		$scope.rteProperties.splice((index + change), 0, $scope.rteProperties.splice(index, 1)[0]);
		$scope.tagProperties.splice((index + change), 0, $scope.tagProperties.splice(index, 1)[0]);
		$scope.handleRtePropertyEditorUpdate($scope.rteProperties);
		$scope.handleTagPropertyEditorUpdate($scope.tagProperties);
	};


	// Helper Methods ////////////////////////////////////////////////////////////

	/**
	* @method isOnlyQuestion
	* @returns {bool}
	* @description Returns true if the $scope.model.value.items length is 0 or 1. Otherwise returns false.
	*/
	$scope.isOnlyQuestion = function() {
		var isOnlyQuestion = false;
		if ($scope.model.value.items.length < 2) {
			isOnlyQuestion = true;
		}
		return isOnlyQuestion;
	};

	/**
	* @method compileCategories
	* @description Iterates through all items in $scope.model.value.items, and takes all categories in them and concats them into a list of categories.
	*/
	$scope.compileCategories = function() {
		var categories = [];
		$scope.model.value.items.forEach(function(item) {
			item.categories.forEach(function(newCategory) {
				var categoryExists = false;
				if (categories.length > 0) {
					categories.forEach(function(oldCategory){
						if (oldCategory == newCategory) {
							categoryExists = true;
						}
					});
				}
				if (!categoryExists) {
					categories.push(newCategory);
				}
			});
		});
		$scope.model.value.categories = categories;
	};

	// Call $scope.init() ////////////////////////////////////////////////////////

	$scope.init();

});
