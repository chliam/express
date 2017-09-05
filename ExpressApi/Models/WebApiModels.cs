using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExpressApi.Models
{
    public class WebApiModels
    {
        [Serializable]
        public class LoginModel
        {
            public string telephone { get; set; }
            public string password { get; set; }
        }

        [Serializable]
        public class RegisterModel
        {
            public string telephone { get; set; }
            public string password { get; set; }
            public string varcode { get; set; }
        }

        [Serializable]
        public class UpdatePasswordModel
        {
            public string telephone { get; set; }
            public string oldpassword { get; set; }
            public string newpassword { get; set; }
        }


        [Serializable]
        public class GetVerificationCodeModel
        {
            public string telephone { get; set; }
            public string usetype { get; set; }
        }
        

        [Serializable]
        public class FindExpressModel
        {
            public string telephone { get; set; }
            public string expressid { get; set; }
            public string companyid { get; set; }
        }

        [Serializable]
        public class FeedbackModel
        {
            public string telephone { get; set; }
            public string feedbacktype { get; set; }
            public string content { get; set; }
        }

        [Serializable]
        public class UserPicModel
        {
            public string telephone { get; set; }
            public string pic1 { get; set; }
            public string pic2 { get; set; }
            public string pic3 { get; set; }
        }

        [Serializable]
        public class ResultModel
        {
            public string status { get; set; }
            public string message { get; set; }
            public object result { get; set; }
        }      
    }
}