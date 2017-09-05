using SuperSocket.SocketBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ExpressService.Socket
{
    public class CmdHelper
    {
        private static bool logCmd = bool.Parse(System.Configuration.ConfigurationManager.AppSettings["LogCmd"]);
        private static bool logSendData = bool.Parse(System.Configuration.ConfigurationManager.AppSettings["LogSendData"]);

        public static byte[] GenSocketData(IList<byte[]> bytes)
        {
            var dataLenght = 0;
            foreach (var b in bytes)
            {
                dataLenght = dataLenght + b.Length;
            }
            var data = new byte[dataLenght];
            var destIndex = 0;
            foreach (var b in bytes)
            {
                Array.ConstrainedCopy(b, 0, data, destIndex, b.Length);
                destIndex = destIndex + b.Length;
            }
            return data;
        }

        public static void GenSocketLog(MsgPackSession session ,string cmdtype, byte[] data, bool isreq=true)
        {
            try
            {
                if (logCmd)
                {
                    var log = new Data.socketlog();
                    log.id = DateTime.Now.Ticks.ToString();
                    log.datetime = DateTime.Now;
                    var clientip = string.Empty;
                    if (session != null && session.RemoteEndPoint != null)
                    {
                        clientip = session.RemoteEndPoint.Address.ToString() + ":" + session.RemoteEndPoint.Port;
                    }
                    log.clientip = clientip;
                    log.cmdtype = cmdtype;
                    log.senddata = ToHexString(data);
                    log.isreq = isreq;
                    ThreadPool.QueueUserWorkItem(new WaitCallback((obj) => {
                        Data.expressEntities db = new Data.expressEntities();
                        db.socketlogs.Add((Data.socketlog)obj);
                        db.SaveChanges();
                    }), log);
                }                
            }
            catch (Exception es)
            {
                LogHelper.LogError(es);
            }                   
        }

        public static string ToHexString(byte[] bytes) 
        {
            string hexString = string.Empty;
            if (bytes != null)
            {
                StringBuilder strB = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    strB.Append(bytes[i].ToString("X2"));
                }
                hexString = strB.ToString();
            }
            return hexString;
        }

        public static void SendData(MsgPackSession session, byte[] data) {
            if (logSendData) {
                var sendInfo = "SEND: " + BitConverter.ToString(data);
                Console.WriteLine(sendInfo);
                LogHelper.LogInfo(sendInfo);
            }
            session.Send(data, 0, data.Length);
        }
    }
}
