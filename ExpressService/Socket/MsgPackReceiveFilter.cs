using SuperSocket.Common;
using SuperSocket.Facility.Protocol;
using SuperSocket.SocketBase.Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ExpressService.Socket
{
    public class MsgPackReceiveFilter : FixedHeaderReceiveFilter<BinaryRequestInfo>
    {
        public MsgPackReceiveFilter() : base(6)
        {
        }

        protected override int GetBodyLengthFromHeader(byte[] header, int offset, int length)
        {
            var headerData = new byte[1];
            Array.Copy(header, offset + 5, headerData, 0, 1);
            //return BitConverter.ToInt32(headerData,0);
            return (int)headerData[0]+8;
        }

        protected override BinaryRequestInfo ResolveRequestInfo(ArraySegment<byte> header, byte[] bodyBuffer, int offset, int length)
        {
            return new BinaryRequestInfo(Encoding.UTF8.GetString(header.Array, header.Offset+1, 4), bodyBuffer.CloneRange(offset, length));
        }

    }
}
