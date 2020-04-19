using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SignalRServer.data;
using SignalRServer.Models;
using SignalRServer.Models.EntityModels;

namespace SignalRServer.hub
{
    public class ChatHub : Hub
    {
        private readonly static ConnectionMapping<string> _connections = new ConnectionMapping<string>();
        public DataAccess _objData = null;

        public async Task SendMessage(vmMessage _message)
        {
            //Receive Message
            List<string> ReceiverConnectionids = _connections.GetConnections(_message.Receiverid).ToList<string>();
            if (ReceiverConnectionids.Count() > 0)
            {
                //Save-Receive-Message
                try
                {
                    _objData = new DataAccess();
                    _message.IsPrivate = true;
                    _message.Connectionid = String.Join(",", ReceiverConnectionids);
                    await _objData.saveUserChat(_message);
                    await Clients.Clients(ReceiverConnectionids).SendAsync("ReceiveMessage", _message);
                }
                catch (Exception) { }
            }
        }


        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            if (httpContext != null)
            {
                try
                {
                    //Add Logged User
                    var userName = httpContext.Request.Query["user"].ToString();
                    //var UserAgent = httpContext.Request.Headers["User-Agent"].FirstOrDefault().ToString();
                    var connId = Context.ConnectionId.ToString();
                    _connections.Add(userName, connId);

                    //Update Client
                    await Clients.All.SendAsync("UpdateUserList", _connections.ToJson());
                }
                catch (Exception) { }
            }
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var httpContext = Context.GetHttpContext();
            if (httpContext != null)
            {
                //Remove Logged User
                var username = httpContext.Request.Query["user"];
                _connections.Remove(username, Context.ConnectionId);

                //Update Client
                await Clients.All.SendAsync("UpdateUserList", _connections.ToJson());
            }

            //return base.OnDisconnectedAsync(exception);
        }
    }
}
