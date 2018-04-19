using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Areas.Admin.Models
{
    public class FilterModel
    {
    }

    public class PostFilterModel
    {
        public string ViewModel { get; set; }
        public bool? Published { get; set; }
        public string StartDay { get; set; }
        public string StartMonth { get; set; }
        public string StartYear { get; set; }
        public string EndDay { get; set; }
        public string EndMonth { get; set; }
        public string EndYear { get; set; }
    }
}