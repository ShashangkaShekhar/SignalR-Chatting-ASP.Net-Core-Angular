using System;
using System.Collections.Generic;

namespace SignalRServer.Models.EntityModels
{
    public partial class UserChat
    {
        public long Chatid { get; set; }
        public string Connectionid { get; set; }
        public string Senderid { get; set; }
        public string Receiverid { get; set; }
        public string Message { get; set; }
        public string Messagestatus { get; set; }
        public DateTime? Messagedate { get; set; }
        public bool? IsGroup { get; set; }
        public bool? IsMultiple { get; set; }
        public bool? IsPrivate { get; set; }
    }
}
