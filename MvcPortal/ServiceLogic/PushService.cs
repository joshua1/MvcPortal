﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using MvcPortal.Models;

using ServiceStack.ServiceClient.Web;
using ServiceStack.Text;

namespace MvcPortal.ServiceLogic
{
    public class PushService
    {
        public static string ServiceUrl = ConfigurationManager.AppSettings["ServiceUrl"];
        public static MessageResponse DoSendMessage(MessageOptions data)
        {
            JsonServiceClient client = new JsonServiceClient(ServiceUrl);
            MessageResponse response = client.Send<MessageResponse>(JsonSerializer.SerializeToString(data));
            return response;
        }
        //public object DoGet(string action,MessageOptions data)
        //{
        //    JsonServiceClient client
        //}
    }
}