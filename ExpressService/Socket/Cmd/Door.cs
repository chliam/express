using SuperSocket.SocketBase.Command;
using SuperSocket.SocketBase.Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressService.Socket
{
    public class DOOR : CommandBase<MsgPackSession, BinaryRequestInfo>
    {
        public override void ExecuteCommand(MsgPackSession session, BinaryRequestInfo requestInfo)
        {
            try
            {
                var expressid = Encoding.UTF8.GetString(requestInfo.Body, 3, requestInfo.Body.Length - 3);
                Console.WriteLine(string.Format("命令:{0} 快递单号:{1}", requestInfo.Key, expressid));

                var scid = string.Empty;
                if (SessionCaches.SCSessionDic.ContainsKey(session.SessionID))
                {
                    scid = SessionCaches.SCSessionDic[session.SessionID];
                }

                var express = Data.Entities.Instance.expresses.FirstOrDefault(p => p.id == expressid);
                if (express == null)
                {
                    var sendData = CmdHelper.GenSocketData(new List<byte[]> {
                    new byte[] { 0x02 },
                    Encoding.UTF8.GetBytes("NONE"),
                    new byte[] { 0x00 }
                });
                    session.Send(sendData, 0, sendData.Length);
                }
                else
                {
                    var reason = (int)requestInfo.Body[0];
                    var status = (int)requestInfo.Body[1];
                    if (reason == 1)
                    {
                        express.intime = DateTime.Now;
                        express.state = "1";
                        express.scid = scid;
                        express.qrcode = string.Format("{0}:{1}#", expressid, scid);
                        Data.Entities.Instance.SaveChanges();
                        var sendData = CmdHelper.GenSocketData(new List<byte[]> {
                        new byte[] { 0x02 },
                        Encoding.UTF8.GetBytes("DOOR"),
                        new byte[] { 0x00 }
                    });
                        session.Send(sendData, 0, sendData.Length);
                    }
                    else if (reason == 2)
                    {
                        if (!string.IsNullOrEmpty(express.scid) && scid == express.scid)
                        {
                            express.outtime = DateTime.Now;
                            express.state = "0";
                            Data.Entities.Instance.SaveChanges();
                            var sendData = CmdHelper.GenSocketData(new List<byte[]> {
                            new byte[] { 0x02 },
                            Encoding.UTF8.GetBytes("DOOR"),
                            new byte[] { 0x00 }
                        });
                            session.Send(sendData, 0, sendData.Length);
                        }
                        else
                        {
                            var sendData = CmdHelper.GenSocketData(new List<byte[]> {
                            new byte[] { 0x02 },
                            Encoding.UTF8.GetBytes("NONE"),
                            new byte[] { 0x00 }
                        });
                            session.Send(sendData, 0, sendData.Length);
                            return;
                        }
                    }
                }
            }
            catch (Exception es)
            {
                LogHelper.LogError(es);
                var sendData = CmdHelper.GenSocketData(new List<byte[]> {
                        new byte[] { 0x02 },
                        Encoding.UTF8.GetBytes("ERRO"),
                        new byte[] { 0x00 }
                    });
                session.Send(sendData, 0, sendData.Length);
            }                   
        }
    }
}
