using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SignalRServer.data;
using SignalRServer.Models;
using SignalRServer.Models.EntityModels;

namespace SignalRServer.api.auth
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class userController : ControllerBase
    {
        private DataAccess _objAuthtication = null;

        public userController()
        {
            this._objAuthtication = new DataAccess();
        }


        //POST: api/user/userlogin
       [HttpPost("[action]")]
        public async Task<object> userlogin([FromBody]UserLogin model)
        {
            object result = null; object resdata = null;

            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Login
                resdata = await _objAuthtication.getUserlogin(model);
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