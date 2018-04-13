using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("album-anh")]
    public class AlbumAnhController : Controller
    {
        // GET: AlbumAnh
        public ActionResult Index()
        {
            return View();
        }
    }
}