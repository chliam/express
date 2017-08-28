using SuperSocket.SocketBase;
using SuperSocket.SocketBase.Protocol;

namespace ExpressService.Socket
{
    public class MsgPackSession : AppSession<MsgPackSession, BinaryRequestInfo>
    {
        protected override void HandleUnknownRequest(BinaryRequestInfo requestInfo)
        {
            base.HandleUnknownRequest(requestInfo);         
            CmdHelper.GenSocketLog(this, requestInfo.Key, requestInfo.Body, false);
        }
    }
}