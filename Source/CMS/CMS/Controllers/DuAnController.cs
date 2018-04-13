using CMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("du-an")]
    public class DuAnController : Controller
    {
        private BDSHDEntities db = new BDSHDEntities();

        // GET: DuAn
        [Route]
        public ActionResult List()
        {
            var model = new ListDuAnViewModel();

            model.DuAns = db.Projects.Where(p => p.Published == true).OrderByDescending(p => p.TimeCreated).ToList();

            return View(model);
        }

        [Route("{alias}-{id:int}")]
        public ActionResult Detail(string alias, int id)
        {
            ShowDuAnViewModel model = new ShowDuAnViewModel();

            model.DuAn = db.Projects.Where(p => p.Id == id && p.Alias == alias).FirstOrDefault();
            model.Images = db.ImageProjects.Where(p => p.ProjectId == id).ToList();
            model.DuAnKhacs = db.Projects.Where(p => p.Published == true && p.Id != id).OrderByDescending(p => p.TimeCreated).Take(8).ToList();

            return View(model);
        }
    }
}