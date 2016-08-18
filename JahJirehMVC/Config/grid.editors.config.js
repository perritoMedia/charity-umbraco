[
    {
        "name": "Rich text editor",
        "alias": "rte",
        "view": "rte",
        "icon": "icon-article"
    },
    {
        "name": "Image",
        "alias": "media",
        "view": "media",
        "icon": "icon-picture"
    },
    {
        "name": "Macro",
        "alias": "macro",
        "view": "macro",
        "icon": "icon-settings-alt"
    },
    {
        "name": "Embed",
        "alias": "embed",
        "view": "embed",
        "icon": "icon-movie-alt"
    },
    {
        "name": "Headline",
        "alias": "headline",
        "view": "textstring",
        "icon": "icon-coin",
        "config": {
            "style": "font-size: 36px; line-height: 45px; font-weight: bold",
            "markup": "<h1>#value#</h1>"
        }
    },
    {
        "name": "Quote",
        "alias": "quote",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-quote color-blue",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "editors": [
                {
                    "name": "Heading 1",
                    "alias": "heading1",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae",
                    "description": "e.g. Scripture text"
                },
                {
                    "name": "Heading 2",
                    "alias": "heading2",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae",
                    "description": "e.g. Scripture reference"
                }
            ],
            "renderInGrid": "0",
            "frontView": ""
        }
    },
    {
        "name": "Video",
        "alias": "video",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-video color-blue",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "editors": [
                {
                    "name": "Video url",
                    "alias": "videoUrl",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
                },
                {
                    "name": "Heading",
                    "alias": "heading",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
                }
            ],
            "renderInGrid": "0",
            "frontView": ""
        }
    },
    {
        "name": "Newsletter signup box",
        "alias": "newsletterSignupBox",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-autofill color-blue",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "editors": [
                {
                    "name": "Title",
                    "alias": "title",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
                },
                {
                    "name": "Content",
                    "alias": "content",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
                },
                {
                    "name": "Bottom Link Text",
                    "alias": "bottomLinkText",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
                },
                {
                    "name": "Bottom Link",
                    "alias": "bottomLink",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
                },
                {
                    "name": "Button Text",
                    "alias": "buttonText",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
                }
            ],
            "renderInGrid": "0",
            "frontView": ""
        }
    },
    {
        "name": "Button",
        "alias": "button",
        "view": "/App_Plugins/LeBlender/editors/leblendereditor/LeBlendereditor.html",
        "icon": "icon-exit-fullscreen color-blue",
        "render": "/App_Plugins/LeBlender/editors/leblendereditor/views/Base.cshtml",
        "config": {
            "editors": [
                {
                    "name": "Button text",
                    "alias": "buttonText",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
                },
                {
                    "name": "Button link",
                    "alias": "buttonLink",
                    "propretyType": {},
                    "dataType": "0cc0eba1-9960-42c9-bf9b-60e150b429ae"
                },
                {
                    "name": "Button colour",
                    "alias": "buttonColour",
                    "propretyType": {},
                    "dataType": "0225af17-b302-49cb-9176-b9f35cab9c17"
                }
            ],
            "renderInGrid": "0",
            "frontView": ""
        }
    },
    {
        "name": "Page Title",
        "alias": "pageTitle",
        "view": "textstring",
        "icon": "icon-font color-blue",
        "config": {
            "style": "",
            "markup": "<h2 class=\"page-title\">#value#</h2>"
        }
    },
    {
        "name": "Headline (h3)",
        "alias": "headingh3",
        "view": "textstring",
        "icon": "icon-coin color-blue",
        "config": {
            "markup": "<h3 class=\"title\">#value#</h3>",
            "style": ""
        }
    },
    {
        "name": "Headline (h4)",
        "alias": "headlineH4",
        "view": "textstring",
        "icon": "icon-coin color-blue",
        "config": {
            "markup": "<h4\"><em>#value#</em></h4>",
		"style": ""

        }
    }
]