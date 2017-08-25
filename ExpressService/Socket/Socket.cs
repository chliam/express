using SuperSocket.SocketBase;
using SuperSocket.SocketBase.Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressService.Socket
{
    public class Socket
    {
        public static void run()
        {
            //var appServer = new AppServer();

            ////Setup the appServer
            //if (!appServer.Setup(2012)) //Setup with listening port
            //{
            //    Console.WriteLine("Failed to setup!");
            //    Console.ReadKey();
            //    return;
            //}

            //appServer.NewSessionConnected += new SessionHandler<AppSession>(appServer_NewSessionConnected);
            //appServer.NewRequestReceived += new RequestHandler<AppSession, StringRequestInfo>(appServer_NewRequestReceived);
            //appServer.SessionClosed += new SessionHandler<AppSession, CloseReason>(AppServer_SessionClosed);
            ////SuperSocket.SocketBase.Protocol.BinaryRequestInfo
            //Console.WriteLine();

            ////Try to start the appServer
            //if (!appServer.Start())
            //{
            //    Console.WriteLine("Failed to start!");
            //    Console.ReadKey();
            //    return;
            //}

            //Console.WriteLine("Success start!");

            MsgPackServer msgPackServer = new MsgPackServer();

            //Setup the appServer
            if (!msgPackServer.Setup(2017))
            {
                Console.WriteLine("Failed to setup!");
                Console.ReadKey();
                return;
            }

            msgPackServer.NewSessionConnected += new SessionHandler<MsgPackSession>(appServer_NewSessionConnected);
            //msgPackServer.NewRequestReceived += new RequestHandler<MsgPackSession, BinaryRequestInfo>(appServer_NewRequestReceived);
            msgPackServer.SessionClosed += new SessionHandler<MsgPackSession, CloseReason>(AppServer_SessionClosed);

            Console.WriteLine();

            //Try to start the appServer
            if (!msgPackServer.Start())
            {
                Console.WriteLine("Failed to start!");
                Console.ReadKey();
                return;
            }

            Console.WriteLine("The server started successfully, press key 'q' to stop it!");
        }

        private static void AppServer_SessionClosed(MsgPackSession session, CloseReason value)
        {
            Console.WriteLine("Sessoin closed!");
        }

        static void appServer_NewSessionConnected(MsgPackSession session)
        {
            session.Send("Welcome to SuperSocket Telnet Server");
        }

        //static void appServer_NewRequestReceived(MsgPackSession session, BinaryRequestInfo requestInfo)
        //{
        //    switch (requestInfo.Key.ToUpper())
        //    {
        //        case ("ECHO"):
        //            session.Send(requestInfo.Body);
        //            break;

        //        case ("ADD"):
        //            session.Send(requestInfo.Parameters.Select(p => Convert.ToInt32(p)).Sum().ToString());
        //            break;

        //        case ("MULT"):

        //            var result = 1;

        //            foreach (var factor in requestInfo.Parameters.Select(p => Convert.ToInt32(p)))
        //            {
        //                result *= factor;
        //            }

        //            session.Send(result.ToString());
        //            break;
        //    }
        //}
    }
}
