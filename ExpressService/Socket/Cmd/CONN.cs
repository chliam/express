using SuperSocket.SocketBase.Command;
using SuperSocket.SocketBase.Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressService.Socket
{
    public class CONN : CommandBase<MsgPackSession, BinaryRequestInfo>
    {
        public override void ExecuteCommand(MsgPackSession session, BinaryRequestInfo requestInfo)
        {
            try
            {
                var scid = Encoding.UTF8.GetString(requestInfo.Body,0, requestInfo.Body.Length-8);
                Console.WriteLine(string.Format("命令:{0} 柜子编号:{1}", requestInfo.Key, scid));
                var scinfo = Data.Entities.Instance.scinfoes.FirstOrDefault(p => p.id == scid);
                SessionCaches.SCSessionDic[session.SessionID] = scid;
                var sendData = CmdHelper.GenSocketData(new List<byte[]> {
                    new byte[] { 0x02 },
                    Encoding.UTF8.GetBytes("CONN"),
                    new byte[] { 0x08 },
                    new byte[] { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 },
                    new byte[] { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 }
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
