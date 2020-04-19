using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SignalRServer.data;
using SignalRServer.Models.EntityModels;

namespace SignalRServer.api.chat
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class chatController : ControllerBase
    {
        private DataAccess _objChat = null;

        public chatController()
        {
            this._objChat = new DataAccess();
        }


        //GET: api/chat/userChat
        [HttpGet("[action]")]
        public async Task<object> userChat([FromQuery]string param)
        {
            object result = null; object resdata = null;

            try
            {
                if (param != string.Empty)
                {
                    dynamic data = JsonConvert.DeserializeObject(param);
                    UserChat model = JsonConvert.DeserializeObject<UserChat>(data.ToString());
                    if (model != null)
                    {
                        resdata = await _objChat.getUserChat(model);
                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            result = new
            {
                resdata
            };

            return result;
        }
    }
}