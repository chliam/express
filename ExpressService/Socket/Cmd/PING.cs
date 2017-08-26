using SuperSocket.SocketBase.Command;
using SuperSocket.SocketBase.Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressService.Socket.Cmd
{
    public class PING : CommandBase<MsgPackSession, BinaryRequestInfo>
    {
        public override void ExecuteCommand(MsgPackSession session, BinaryRequestInfo requestInfo)
        {
            try
            {
                var gpsinfo = Encoding.UTF8.GetString(requestInfo.Body, 1, requestInfo.Body.Length - 1);
                Console.WriteLine(string.Format("命令:{0} 经纬度:{1}", requestInfo.Key, gpsinfo));

                if (SessionCaches.SCSessionDic.ContainsKey(session.SessionID))
                {
                    var scid = SessionCaches.SCSessionDic[session.SessionID];
                    var gps = Data.Entities.Instance.gpses.Where(p => p.scid == scid).OrderByDescending(p => p.datetime).FirstOrDefault();
                    if (gps == null || gps.gpsdetaile != gpsinfo)
                    {
                        gps = new Data.gps();
                        gps.id = string.Format("{0}_{1}", scid, DateTime.Now.ToString("yyMMddHHmmssfff"));
                        gps.datetime = DateTime.Now;
                        gps.gpsdetaile = gpsinfo;
                        gps.scid = scid;
                        Data.Entities.Instance.gpses.Add(gps);
                        Data.Entities.Instance.SaveChanges();
                    }
                    var scinfo = Data.Entities.Instance.scinfoes.FirstOrDefault(p => p.id == scid);
                    if (scinfo != null && string.IsNullOrEmpty(scinfo.gpg))
                    {
                        scinfo.gpg = gpsinfo;
                        Data.Entities.Instance.SaveChanges();
                    }
                }

                var sendData = CmdHelper.GenSocketData(new List<byte[]> {
                        new byte[] { 0x02 },
                        Encoding.UTF8.GetBytes("PING"),
                        new byte[] { 0x00 }
                    });
                session.Send(sendData, 0, sendData.Length);
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
