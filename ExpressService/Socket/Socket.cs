using SuperSocket.SocketBase;
using SuperSocket.SocketBase.Protocol;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressService.Socket
{
    public class Socket
    {
        static bool AsServer = false;
        static MsgPackServer msgPackServer;
        public static bool Run(bool asServer=false)
        {
            AsServer = asServer;
            int ListenPort = int.Parse(ConfigurationManager.AppSettings["ListenPort"]);

            msgPackServer = new MsgPackServer();
            if (!msgPackServer.Setup(ListenPort))
            {
                if (asServer)
                {
                    LogHelper.LogInfo("Failed to setup!");
                    return false;
                }
                else
                {
                    Console.WriteLine("Failed to setup!");
                    Console.ReadKey();
                    return false;
                }               
            }

            msgPackServer.NewSessionConnected += new SessionHandler<MsgPackSession>(appServer_NewSessionConnected);
            //msgPackServer.NewRequestReceived += new RequestHandler<MsgPackSession, BinaryRequestInfo>(appServer_NewRequestReceived);
            msgPackServer.SessionClosed += new SessionHandler<MsgPackSession, CloseReason>(AppServer_SessionClosed);

            if (!msgPackServer.Start())
            {
                if (asServer)
                {
                    LogHelper.LogInfo("Failed to start!");
                    return false;
                }
                else
                {
                    Console.WriteLine("Failed to start!");
                    Console.ReadKey();
                    return false;
                }
            }

            return true;
        }

        public static bool Stop()
        {
            if (msgPackServer != null)
            {
                msgPackServer.Stop();
            }
            return true;
        }
        static void AppServer_SessionClosed(MsgPackSession session, CloseReason value)
        {
            if (AsServer)
            {
                LogHelper.LogInfo(string.Format("Session [{0}] Closed!", session.SessionID));
            }
            else
            {
                Console.WriteLine(string.Format("Session[{ 0}] Closed!", session.SessionID));
            }
            
        }

        static void appServer_NewSessionConnected(MsgPackSession session)
        {
            if (AsServer)
            {
                LogHelper.LogInfo(string.Format("Session [{0}] Connect!", session.SessionID));
            }
            else
            {
                Console.WriteLine(string.Format("Session[{0}] Connect!", session.SessionID));
            }
        }
    }
}
