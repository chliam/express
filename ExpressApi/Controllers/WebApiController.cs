﻿using System;
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
            try
            {
                var db = Data.Entities.NewInstance;
                var user = db.userinfoes.FirstOrDefault(p => p.telephone == model.telephone);
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
            catch (Exception es)
            {
                return Ok(new ResultModel() { status = "failure", message = es.Message });
            }           
        }

        [ResponseType(typeof(ResultModel))]
        [HttpPost]
        public IHttpActionResult Register(RegisterModel model)
        {
            try
            {
                var db = Data.Entities.NewInstance;
                var user = db.userinfoes.FirstOrDefault(p => p.telephone == model.telephone);
                if (user != null)
                {
                    return Ok(new ResultModel() { status = "failure", message = "该手机号已注册！" });
                }
                else
                {
                    var varcode = db.varcodes.FirstOrDefault(p => p.telephone == model.telephone && p.code == model.varcode && p.isvared == false);
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
                    db.userinfoes.Add(user);
                    db.SaveChanges();
                    return Ok(new ResultModel() { status = "success" });
                }
            }
            catch (Exception es)
            {
                return Ok(new ResultModel() { status = "failure", message = es.Message });
            }        
        }

        [ResponseType(typeof(ResultModel))]
        [HttpPost]
        public IHttpActionResult GetVerificationCode(GetVerificationCodeModel model)
        {
            try
            {
                var db = Data.Entities.NewInstance;
                var user = db.userinfoes.FirstOrDefault(p => p.telephone == model.telephone);
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
                db.varcodes.Add(varcode);
                db.SaveChanges();

                return Ok(new ResultModel() { status = "success", result = code.ToString() });
            }
            catch (Exception es)
            {
                return Ok(new ResultModel() { status = "failure", message = es.Message });
            }            
        }

        [ResponseType(typeof(ResultModel))]
        [HttpPost]
        public IHttpActionResult ForgetPassword(RegisterModel model)
        {
            try
            {
                var db = Data.Entities.NewInstance;
                var user = db.userinfoes.FirstOrDefault(p => p.telephone == model.telephone);
                if (user == null)
                {
                    return Ok(new ResultModel() { status = "failure", message = "该手机号还未注册！" });
                }
                else
                {
                    var varcode = db.varcodes.FirstOrDefault(p => p.telephone == model.telephone && p.code == model.varcode && p.isvared == false);
                    if (varcode == null)
                    {
                        return Ok(new ResultModel() { status = "failure", message = "验证码错误！" });
                    }
                    else
                    {
                        varcode.isvared = true;
                    }
                    user.password = model.password;
                    db.SaveChanges();
                    return Ok(new ResultModel() { status = "success" });
                }
            }
            catch (Exception es)
            {
                return Ok(new ResultModel() { status = "failure", message = es.Message });
            }         
        }

        [ResponseType(typeof(ResultModel))]
        [HttpPost]
        public IHttpActionResult UpdatePassword(UpdatePasswordModel model)
        {
            try
            {
                var db = Data.Entities.NewInstance;
                var user = db.userinfoes.FirstOrDefault(p => p.telephone == model.telephone);
                if (user == null)
                {
                    return Ok(new ResultModel() { status = "failure", message = "该手机号还未注册！" });
                }
                else
                {
                    if (user.password != model.oldpassword)
                    {
                        return Ok(new ResultModel() { status = "failure", message = "旧密码错误！" });
                    }
                    else
                    {
                        user.password = model.newpassword;
                        db.SaveChanges();
                        return Ok(new ResultModel() { status = "success" });
                    }   
                }
            }
            catch (Exception es)
            {
                return Ok(new ResultModel() { status = "failure", message = es.Message });
            }
        }

        [ResponseType(typeof(ResultModel))]
        [HttpPost]
        public IHttpActionResult FindExpress(FindExpressModel model)
        {
            try
            {
                var db = Data.Entities.NewInstance;
                var query = from e in db.expresses
                            join l in db.logistics on e.id equals l.id into templ
                            from ll in templ.DefaultIfEmpty()
                            join c in db.companies on ll.companyid equals c.id into tempc
                            from cc in tempc.DefaultIfEmpty()
                            select new
                            {
                                id = e.id,
                                name = e.name,
                                telephoone = e.telephoone,
                                intime = e.intime,
                                outtime = e.outtime,
                                qrcode = e.qrcode,
                                scid = e.scid,
                                state = e.state,
                                remark = ll == null ? "" : ll.remark,
                                datetime = ll == null ? null : ll.datetime,
                                company = cc == null ? "" : cc.name
                            };
                var expresses = query.Where(p => p.id.Contains(model.expressid) && p.telephoone == model.telephone).OrderBy(p => p.intime).ToList();
                var waitexpresses = expresses.Where(p => p.state == "1").ToList();
                var historyexpresses = expresses.Where(p => p.state == "2").ToList();
                return Ok(new ResultModel() { status = "success", result = new { waitexpresses = waitexpresses, historyexpresses = historyexpresses } });
            }
            catch (Exception es)
            {
                return Ok(new ResultModel() { status = "failure", message = es.Message });
            }      
        }

        [ResponseType(typeof(ResultModel))]
        [HttpPost]
        public IHttpActionResult FindOneExpress(FindExpressModel model)
        {
            try
            {
                var db = Data.Entities.NewInstance;
                var logistics = db.logistics.FirstOrDefault(p => p.id == model.expressid);
                var logisticsdetails = db.logisticsdetails.Where(p => p.id == model.expressid).OrderBy(p => p.datetime).ToList();
                var company = string.Empty;
                if (logistics != null)
                {
                    company = db.companies.FirstOrDefault(p => p.id == logistics.companyid)?.name;
                }
                return Ok(new ResultModel() { status = "success", result = new { logistics = logistics, company = company, logisticsdetails = logisticsdetails } });
            }
            catch (Exception es)
            {
                return Ok(new ResultModel() { status = "failure", message = es.Message });
            }         
        }


        [ResponseType(typeof(ResultModel))]
        [HttpPost]
        public IHttpActionResult AddFeedback(FeedbackModel model)
        {
            try
            {
                var db = Data.Entities.NewInstance;
                var feedback = new Data.feedback()
                {
                    datetime = DateTime.Now,
                    content = model.content,
                    feedbacktype = model.feedbacktype,
                    telephone = model.telephone
                };
                db.feedbacks.Add(feedback);
                db.SaveChanges();
                return Ok(new ResultModel() { status = "success", result = feedback.id });
            }
            catch (Exception es)
            {
                return Ok(new ResultModel() { status = "failure", message = es.Message });
            }           
        }

        [ResponseType(typeof(ResultModel))]
        [HttpPost]
        public IHttpActionResult UploadUserPic(UserPicModel model)
        {
            try
            {
                var db = Data.Entities.NewInstance;
                var userpic = new Data.userpic()
                {
                    telephone = model.telephone,
                    pic1 = model.pic1,
                    pic2 = model.pic2,
                    pic3 = model.pic3
                };
                db.userpics.Add(userpic);
                db.SaveChanges();
                return Ok(new ResultModel() { status = "success" });
            }
            catch (Exception es)
            {
                return Ok(new ResultModel() { status = "failure", message = es.Message });
            }
        }

        [ResponseType(typeof(ResultModel))]
        [HttpPost]
        public IHttpActionResult GetAuthStatus(LoginModel model)
        {
            try
            {
                var db = Data.Entities.NewInstance;
                var userpic = db.userpics.FirstOrDefault(p => p.telephone == model.telephone);
                return Ok(new ResultModel() { status = "success",result=new { authed = (userpic!=null)} });
            }
            catch (Exception es)
            {
                return Ok(new ResultModel() { status = "failure", message = es.Message });
            }
        }
    }
}
