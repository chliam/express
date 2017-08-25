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
            var result = Encoding.UTF8.GetString(requestInfo.Body);
            Console.WriteLine(string.Format("Key:{0} Body:{1}",requestInfo.Key,result));
            session.Send(result);
        }

    }
}
