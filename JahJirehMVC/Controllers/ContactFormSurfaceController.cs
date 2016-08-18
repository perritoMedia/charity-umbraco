using JahJirehMVC.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using umbraco;
using Umbraco.Web.Mvc;

namespace JahJirehMVC.Controllers
{
    public class ContactSurfaceController : SurfaceController

    {
        [HttpPost]
        public ActionResult Contact(ContactFormViewModel model)
        {
            if (ModelState.IsValid)
            {
                var sb = new StringBuilder();
                sb.AppendFormat("<p>Meddelande: {0}</p>", model.Message);
                sb.AppendFormat("<p>Namn: {0}</p>", model.Name);
                sb.AppendFormat("<p>E-post: {0}</p>", model.Email);
                sb.AppendFormat("<p>Telefon: {0}</p>", model.Phone);

                library.SendMail("noreply@test.se", "info@test.se", model.Subject, sb.ToString(), true);

                return RedirectToUmbracoPage(model.ThankYouPage);
            }
            return CurrentUmbracoPage();
        }


    }
}