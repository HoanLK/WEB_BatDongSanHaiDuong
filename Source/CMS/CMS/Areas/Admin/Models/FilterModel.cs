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
        public bool ViewModel { get; set; }
        public string Type { get; set; }

        public bool? Published { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}