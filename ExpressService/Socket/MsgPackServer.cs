using SuperSocket.SocketBase;
using SuperSocket.SocketBase.Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressService.Socket
{
    public class MsgPackServer : AppServer<MsgPackSession, BinaryRequestInfo>
    {
        public MsgPackServer() : base(new MsgPackReceiveFilterFactory())
        {

        }
    }
}
