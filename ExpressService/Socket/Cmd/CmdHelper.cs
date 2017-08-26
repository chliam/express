using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressService.Socket
{
    public class CmdHelper
    {
        public static byte[] GenSocketData(IList<byte[]> bytes)
        {
            var dataLenght = 0;
            foreach (var b in bytes)
            {
                dataLenght = dataLenght + b.Length;
            }
            var data = new byte[dataLenght];
            var destIndex = 0;
            foreach (var b in bytes)
            {
                Array.ConstrainedCopy(b, 0, data, destIndex, b.Length);
                destIndex = destIndex + b.Length;
            }
            return data;
        }
    }
}
