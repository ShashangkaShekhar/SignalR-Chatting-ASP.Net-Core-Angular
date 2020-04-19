using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SignalRServer.Models;
using SignalRServer.Models.EntityModels;

namespace SignalRServer.data
{
    public class DataAccess
    {
        private SignalRChatContext _ctx = null;

        public async Task<object> getUserlogin(UserLogin model)
        {
            var loggeduser = (dynamic)null;
            try
            {
                using (_ctx = new SignalRChatContext())
                {
                    loggeduser = await (from x in _ctx.UserLogin
                                        where x.UserName == model.UserName && x.UserPass == model.UserPass
                                        select x).FirstOrDefaultAsync();
                }

            }
            catch (Exception ex)
            {
                ex.ToString();
                loggeduser = null;
            }

            return loggeduser;
        }

        public async Task<object> saveUserChat(vmMessage _model)
        {
            string message = string.Empty;
            try
            {
                using (_ctx = new SignalRChatContext())
                {
                    UserChat model = new UserChat()
                    {
                        Chatid = _ctx.UserChat.DefaultIfEmpty().Max(x => x == null ? 0 : x.Chatid) + 1,
                        Connectionid = _model.Connectionid,
                        Senderid = _model.Senderid,
                        Receiverid = _model.Receiverid,
                        Message = _model.Message,
                        Messagestatus = _model.Messagestatus,
                        Messagedate = _model.Messagedate,
                        IsGroup = _model.IsGroup,
                        IsPrivate = _model.IsPrivate,
                        IsMultiple = _model.IsMultiple
                    };
                    _ctx.UserChat.Add(model);
                    await _ctx.SaveChangesAsync();
                    message = "Saved";
                }
            }
            catch (Exception ex)
            {
                message = "Error:" + ex.ToString();
            }
            return message;
        }

        public Task<List<UserChat>> getUserChat(UserChat model)
        {
            return Task.Run(() =>
            {
                List<UserChat> userChat = null;
                try
                {
                    using (_ctx = new SignalRChatContext())
                    {
                        userChat = (from x in _ctx.UserChat
                                    where (x.Senderid == model.Senderid && x.Receiverid == model.Receiverid) || (x.Receiverid == model.Senderid && x.Senderid == model.Receiverid)
                                    select x).ToList();
                    }
                }
                catch (Exception ex)
                {
                    ex.ToString();
                    userChat = null;
                }

                return userChat;
            });
        }
    }
}
