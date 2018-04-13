using CMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("bai-viet")]
    public class BaiVietController : Controller
    {
        private BDSHDEntities db = new BDSHDEntities();

        [Route("{alias}")]
        public ActionResult List(string alias)
        {
            ListBaiVietViewModel model = new ListBaiVietViewModel();
            model.DanhMuc = db.CategoryPosts.Where(p => p.Alias == alias).FirstOrDefault();
            model.BaiViets = db.Posts.Where(p => p.Published == true && p.CategoryId == model.DanhMuc.Id).OrderByDescending(p => p.TimeCreated).ToList();
            model.DuAnNoiBats = db.Projects.Where(p => p.Published == true && p.Featured == true).OrderByDescending(p => p.TimeCreated).Take(8).ToList();


            return View(model);
        }

        [Route("{categoryAlias}/{alias}-{id}")]
        public ActionResult Detail(string categoryAlias, string alias, int id)
        {
            ShowBaiVietViewModel model = new ShowBaiVietViewModel();
            model.DanhMuc = db.CategoryPosts.Where(p => p.Alias == categoryAlias).FirstOrDefault();
            model.BaiViet = db.Posts.Where(p => p.Alias == alias && p.Id == id).FirstOrDefault();
            model.BaiVietKhacs = db.Posts.Where(p => p.Published == true && p.CategoryId == model.DanhMuc.Id && p.Id != model.BaiViet.Id).OrderByDescending(p => p.TimeCreated).Take(4).ToList();

            return View(model);
        }
    }
}