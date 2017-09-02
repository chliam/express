using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using static ExpressApi.Models.WebApiModels;

namespace ExpressApi.Controllers
{
    public class WebApiController : ApiController
    {
        [ResponseType(typeof(ResultModel))]
        [HttpPost]
        public IHttpActionResult Login(LoginModel model)
        {
            var user = Data.Entities.Instance.userinfoes.FirstOrDefault(p => p.telephone == model.telephone);
            if (user == null)
            {
                return Ok(new ResultModel() { status = "failure", message = "该手机号还未注册！" });
            }
            else if (user.password != model.password)
            {
                return Ok(new ResultModel() { status = "failure", message = "手机号或密码错误！" });
            }
            return Ok(new ResultModel() { status = "success" });
        }

        [ResponseType(typeof(ResultModel))]
        [HttpPost]
        public IHttpActionResult Register(RegisterModel model)
        {
            var user = Data.Entities.Instance.userinfoes.FirstOrDefault(p => p.telephone == model.telephone);
            if (user != null)
            {
                return Ok(new ResultModel() { status = "failure", message = "该手机号已注册！" });
            }
            else
            {
                var varcode = Data.Entities.Instance.varcodes.FirstOrDefault(p=>p.telephone==model.telephone && p.code==model.varcode && p.isvared==false);
                if (varcode == null)
                {
                    return Ok(new ResultModel() { status = "failure", message = "验证码错误！" });
                }
                else
                {
                    varcode.isvared = true;
                }
                user = new Data.userinfo();
                user.telephone = model.telephone;
                user.password = model.password;
                Data.Entities.Instance.userinfoes.Add(user);
                Data.Entities.Instance.SaveChanges();
                return Ok(new ResultModel() { status = "success" });
            }       
        }

        [ResponseType(typeof(ResultModel))]
        [HttpPost]
        public IHttpActionResult GetVerificationCode(GetVerificationCodeModel model)
        {
            var user = Data.Entities.Instance.userinfoes.FirstOrDefault(p => p.telephone == model.telephone);
            if (user != null && model.usetype == "1")
            {
                return Ok(new ResultModel() { status = "failure", message = "该手机号已注册！" });
            }

            if (user == null && model.usetype == "2")
            {
                return Ok(new ResultModel() { status = "failure", message = "该手机号还未注册！" });
            }

            Random random = new Random();
            var code = random.Next(8999) + 1000;
            var varcode = new Data.varcode();
            varcode.id = DateTime.Now.ToString("yyyyMMddHHmmssfff") + code.ToString();
            varcode.code = code.ToString();
            varcode.isvared = false;
            varcode.sendtime = DateTime.Now;
            varcode.telephone = model.telephone;
            Data.Entities.Instance.varcodes.Add(varcode);
            Data.Entities.Instance.SaveChanges();

            return Ok(new ResultModel() { status = "success",result=code.ToString() });
        }

        [ResponseType(typeof(ResultModel))]
        [HttpPost]
        public IHttpActionResult ForgetPassword(RegisterModel model)
        {
            var user = Data.Entities.Instance.userinfoes.FirstOrDefault(p => p.telephone == model.telephone);
            if (user == null)
            {
                return Ok(new ResultModel() { status = "failure", message = "该手机号还未注册！" });
            }
            else
            {
                var varcode = Data.Entities.Instance.varcodes.FirstOrDefault(p => p.telephone == model.telephone && p.code == model.varcode && p.isvared == false);
                if (varcode == null)
                {
                    return Ok(new ResultModel() { status = "failure", message = "验证码错误！" });
                }
                else
                {
                    varcode.isvared = true;
                }
                user.password = model.password;
                Data.Entities.Instance.SaveChanges();
                return Ok(new ResultModel() { status = "success" });
            }
        }

        [ResponseType(typeof(ResultModel))]
        [HttpPost]
        public IHttpActionResult FindExpress(FindExpressModel model)
        {
            var waitexpresses = Data.Entities.Instance.expresses.Where(p => p.id.Contains(model.expressid) && p.state== "1" && p.telephoone == model.telephone).OrderBy(p => p.intime).ToList(); 
            var historyexpresses = Data.Entities.Instance.expresses.Where(p => p.id.Contains(model.expressid) && p.state == "2" && p.telephoone == model.telephone).OrderBy(p => p.intime).ToList();
            return Ok(new ResultModel() { status = "success", result = new { waitexpresses = waitexpresses, historyexpresses = historyexpresses } });
        }

        [ResponseType(typeof(ResultModel))]
        [HttpPost]
        public IHttpActionResult FindOneExpress(FindExpressModel model)
        {
            var express = Data.Entities.Instance.expresses.FirstOrDefault(p => p.id == model.expressid && p.telephoone == model.telephone);
            var logistics = Data.Entities.Instance.logistics.FirstOrDefault(p => p.id == model.expressid);
            var logisticsdetails = Data.Entities.Instance.logisticsdetails.Where(p => p.id == model.expressid).OrderBy(p => p.datetime).ToList();
            return Ok(new ResultModel() { status = "success",result=new { express = express, logistics = logistics, logisticsdetails = logisticsdetails } });
        }

    }
}
