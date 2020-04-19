using System;
using System.Collections.Generic;

namespace SignalRServer.Models.EntityModels
{
    public partial class UserLogin
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserPass { get; set; }
    }
}
