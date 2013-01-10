using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ServiceStack.DataAnnotations;

namespace MvcPortal.Models
{
    public class Device
    {
        [AutoIncrement]
        public long Id { get; set; }


        public string DeviceToken { get; set; }

        public string DevicePhoneNumber { get; set; }
    }

   
}