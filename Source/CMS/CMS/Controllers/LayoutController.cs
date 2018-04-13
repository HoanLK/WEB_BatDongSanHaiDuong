using CMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    public class LayoutController : Controller
    {
        BDSHDEntities db = new BDSHDEntities();

        // GET: Layout
        public ActionResult Index()
        {
            return View();
        }

        //Header Top
        public ActionResult HeaderTop()
        {
            HeaderTopViewModel model = new HeaderTopViewModel();
            model.InfoCompany = db.InfoCompanies.Find(1);

            return PartialView("~/Views/Shared/_HeaderTop.cshtml", model);
        }

        //Footer
        public ActionResult Footer()
        {
            FooterViewModel model = new FooterViewModel();
            model.InfoCompany = db.InfoCompanies.Find(1);

            return PartialView("~/Views/Shared/_Footer.cshtml", model);
        }

        //Sidebar1
        public ActionResult Sidebar1()
        {
            Sidebar1ViewModel model = new Sidebar1ViewModel();

            //Tin tức
            List<Post> tintucs = new List<Post>();
            var thitruongs = db.Posts.Where(p => p.Featured == true && p.Published == true && p.CategoryId == (db.CategoryPosts.Where(cp => cp.Alias == "thi-truong").FirstOrDefault()).Id).ToList();
            var duans = db.Posts.Where(p => p.Featured == true && p.Published == true && p.CategoryId == (db.CategoryPosts.Where(cp => cp.Alias == "du-an").FirstOrDefault()).Id).ToList();
            var noibos = db.Posts.Where(p => p.Featured == true && p.Published == true && p.CategoryId == (db.CategoryPosts.Where(cp => cp.Alias == "noi-bo").FirstOrDefault()).Id).ToList();
            tintucs.AddRange(thitruongs);
            tintucs.AddRange(duans);
            tintucs.AddRange(noibos);
            model.TinTucs = tintucs.OrderByDescending(p => p.TimeCreated).Take(5).ToList();
            //Videos
            model.Videos = db.Videos.Where(p => p.Published == true).OrderByDescending(p => p.TimeCreated).ToList();

            return PartialView("~/Views/Shared/_Sidebar1.cshtml", model);
        }
    }
}