using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MvcPortal.Models;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface.ServiceModel;

namespace MvcPortal
{
    [Route("/devices", "POST")]
    [Route("/devices/{PhoneNumber}", "GET")]
    public class Devices
    {
        public string PhoneNumber { get; set; }
        public string DeviceToken { get; set; }
    }

    public class DeviceResponse
    {
        public DeviceResponse()
        {
            this.ResponseStatus = new ResponseStatus();
            this.Device = new Device();
        }
        public long DeviceId { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
        public Device Device { get; set; }
        public ResponseStatus ResponseStatus { get; set; }
    }
}