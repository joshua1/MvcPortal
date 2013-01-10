using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ServiceStack.DataAnnotations;

namespace MvcPortal.Models
{
    public class Message
    {
        [AutoIncrement]
        public long Id { get; set; }

        public string MessageId { get; set; }
        public int StatusCode { get; set; }
        public string MessageStatus { get; set; }
        public DateTime DateSent { get; set; }
        public string PhoneNumber { get; set; }
        public string MessageText { get; set; }
    }
}