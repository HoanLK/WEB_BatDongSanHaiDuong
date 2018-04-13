using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CMS.Models;

namespace CMS.Controllers
{
    [RoutePrefix("video")]
    public class VideoController : Controller
    {
        private BDSHDEntities db = new BDSHDEntities();

        [Route]
        public ActionResult List()
        {
            ListVideoViewModel model = new ListVideoViewModel();
            model.Videos = db.Videos.Where(p => p.Published == true).OrderByDescending(p => p.TimeCreated).ToList();
            model.DuAnNoiBats = db.Projects.Where(p => p.Published == true && p.Featured == true).OrderByDescending(p => p.TimeCreated).Take(8).ToList();

            return View(model);
        }

        [Route("{alias}-{id}")]
        public ActionResult Detail(string alias, int id)
        {
            ShowVideoViewModel model = new ShowVideoViewModel();
            model.Video = db.Videos.Where(p => p.Alias == alias && p.Id == id).FirstOrDefault();
            model.VideoKhacs = db.Videos.Where(p => p.Published == true && p.Id != model.Video.Id).OrderByDescending(p => p.TimeCreated).Take(4).ToList();

            return View(model);
        }
    }
}