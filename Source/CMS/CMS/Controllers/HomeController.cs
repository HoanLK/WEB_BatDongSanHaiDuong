using CMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    public class HomeController : Controller
    {
        private BDSHDEntities db = new BDSHDEntities();

        public ActionResult Index()
        {
            HomeViewModel model = new HomeViewModel();
            //Dự án nổi bật
            model.DuAnNoiBats = db.Projects.Where(p => p.Published == true && p.Featured == true).OrderByDescending(p => p.TimeCreated).Take(4).ToList();
            //Phong thủy
            var categoryPostPhongThuy = db.CategoryPosts.Where(cp => cp.Alias == "phong-thuy").FirstOrDefault();
            model.PhongThuyPostNewnest = db.Posts.Where(p => p.Published == true && p.Featured == true && p.CategoryId == categoryPostPhongThuy.Id).OrderByDescending(p => p.TimeCreated).FirstOrDefault();
            model.PhongThuyPosts = db.Posts.Where(p => p.Published == true && p.Featured == true && p.CategoryId == categoryPostPhongThuy.Id && p.Id != model.PhongThuyPostNewnest.Id).OrderByDescending(p => p.TimeCreated).Take(3).ToList();
            //Kiến trúc
            var categoryPostKienTruc = db.CategoryPosts.Where(cp => cp.Alias == "kien-truc").FirstOrDefault();
            model.KienTrucPostNewnest = db.Posts.Where(p => p.Published == true && p.Featured == true && p.CategoryId == categoryPostKienTruc.Id).OrderByDescending(p => p.TimeCreated).FirstOrDefault();
            model.KienTrucPosts = db.Posts.Where(p => p.Published == true && p.Featured == true && p.CategoryId == categoryPostKienTruc.Id && p.Id != model.KienTrucPostNewnest.Id).OrderByDescending(p => p.TimeCreated).Take(3).ToList();

            return View(model);
        }
    }
}
