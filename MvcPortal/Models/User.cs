﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcPortal.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
    }
}