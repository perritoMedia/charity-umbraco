using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace JahJirehMVC.Models
{
    public class ContactFormViewModel
    {
        [Required]
        [DisplayName("Subject")]
        public string Subject { get; set; }
        [Required]
        [DisplayName("Name")]
        public string Name { get; set; }
        [Required]
        [DisplayName("E-mail")]
        public string Email { get; set; }
        [DisplayName("Phone")]
        public string Phone { get; set; }
        [Required]
        [DisplayName("Message")]
        public string Message { get; set; }
        public int ThankYouPage { get; set; }
    }
}