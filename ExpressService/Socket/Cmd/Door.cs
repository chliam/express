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
            CmdHelper.GenSocketLog(session, requestInfo.Key, requestInfo.Body);
            try
            {
                var expressid = Encoding.UTF8.GetString(requestInfo.Body, 3, requestInfo.Body.Length - 3-8);
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
                    Encoding.UTF8.GetBytes("DOOR"),
                    new byte[] { 0x01,0x01 }
                });
                    CmdHelper.SendData(session, sendData);
                }
                else
                {
                    var reason = (int)requestInfo.Body[0];
                    var status = (int)requestInfo.Body[1];
                    if (reason == 1) //快递员尝试放件
                    {                      
                        var sendData = CmdHelper.GenSocketData(new List<byte[]> {
                        new byte[] { 0x02 },
                        Encoding.UTF8.GetBytes("DOOR"),
                        new byte[] { 0x01,0x00 }
                    });
                        CmdHelper.SendData(session, sendData);
                    }
                    else if (reason == 2) //快递员完成放件
                    {
                        if (!string.IsNullOrEmpty(express.scid) && scid == express.scid)
                        {
                            express.intime = DateTime.Now;
                            express.state = "1";
                            express.scid = scid;
                            express.qrcode = string.Format("{0}:{1}#", scid, expressid); //TODO:推送给用户
                            Data.Entities.Instance.SaveChanges();
                            PushHelper.PushMessage(express.telephoone,string.Format("您有新的快递,请尽快收取,快递单号:{0}",expressid));                       
                            var sendData = CmdHelper.GenSocketData(new List<byte[]> {
                            new byte[] { 0x02 },
                            Encoding.UTF8.GetBytes("DOOR"),
                            new byte[] { 0x01,0x00 }
                        });
                            CmdHelper.SendData(session, sendData);
                        }
                        else
                        {
                            var sendData = CmdHelper.GenSocketData(new List<byte[]> {
                            new byte[] { 0x02 },
                            Encoding.UTF8.GetBytes("DOOR"),
                            new byte[] { 0x01,0x01 }
                        });
                            CmdHelper.SendData(session, sendData);
                            return;
                        }
                    }
                    else if (reason == 3) //APP用户完成去件
                    {
                        if (!string.IsNullOrEmpty(express.scid) && scid == express.scid)
                        {
                            express.outtime = DateTime.Now;
                            express.state = "2";
                            Data.Entities.Instance.SaveChanges();
                            var sendData = CmdHelper.GenSocketData(new List<byte[]> {
                            new byte[] { 0x02 },
                            Encoding.UTF8.GetBytes("DOOR"),
                            new byte[] { 0x01,0x00 }
                        });
                            CmdHelper.SendData(session, sendData);
                        }
                        else
                        {
                            var sendData = CmdHelper.GenSocketData(new List<byte[]> {
                            new byte[] { 0x02 },
                            Encoding.UTF8.GetBytes("DOOR"),
                            new byte[] { 0x01, 0x01 }
                        });
                            CmdHelper.SendData(session, sendData);
                            return;
                        }
                    }
                    else
                    {
                        var sendData = CmdHelper.GenSocketData(new List<byte[]> {
                            new byte[] { 0x02 },
                            Encoding.UTF8.GetBytes("DOOR"),
                            new byte[] { 0x01, 0x01 }
                        });
                        CmdHelper.SendData(session, sendData);
                        return;
                    }
                }
            }
            catch (Exception es)
            {
                LogHelper.LogError(es);
                var sendData = CmdHelper.GenSocketData(new List<byte[]> {
                        new byte[] { 0x02 },
                        Encoding.UTF8.GetBytes("ERRO"),
                        new byte[] { 0x01, 0x01 }
                    });
                CmdHelper.SendData(session, sendData);
            }                   
        }
    }
}
