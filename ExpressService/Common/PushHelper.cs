using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cn.jpush.api;
using cn.jpush.api.common;
using cn.jpush.api.common.resp;
using cn.jpush.api.push.mode;
using System.Threading;

namespace ExpressService
{
    public class PushHelper
    {
        private static JPushClient client = new JPushClient("20b4d3cae464288cc36eed7d", "3869a8b43d41c73993c2a7e3");

        public static void PushMessage(string telephone, string message)
        {
            PushPayload payload = new PushPayload();
            payload.platform = Platform.all();
            payload.audience = Audience.s_tag(telephone);
            payload.notification = new Notification().setAlert(message);
            ThreadPool.QueueUserWorkItem(new WaitCallback((obj) =>
            {
                try
                {
                    client.SendPush((PushPayload)obj);
                    LogHelper.LogInfo(string.Format("消息推送成功(收件人:{0} 消息:{1})",telephone,message));
                }
                catch (Exception e)
                {
                    LogHelper.LogError(e);
                }
            }), payload);
        }
    }
}
