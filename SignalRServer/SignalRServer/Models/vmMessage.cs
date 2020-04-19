using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRServer.Models
{
    public class vmMessage
    {
        public string Connectionid { get; set; }
        public string Senderconnid { get; set; }
        public string Receiverconnid { get; set; }
        public string Senderid { get; set; }
        public string Receiverid { get; set; }
        public string Message { get; set; }
        public string Messagestatus { get; set; }
        public DateTime Messagedate { get; set; } = DateTime.Now;
        public bool IsGroup { get; set; } = false;
        public bool IsMultiple { get; set; } = false;
        public bool IsPrivate { get; set; } = false;
    }
}
