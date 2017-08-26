using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressService.Socket
{
    public class SessionCaches
    {
        private SessionCaches()
        {
        }

        private static IDictionary<string, string> _scSessionDic;

        public static IDictionary<string, string> SCSessionDic
        {
            get
            {
                if (_scSessionDic == null)
                {
                    _scSessionDic = new Dictionary<string, string>();
                }
                return _scSessionDic;
            }
        }
    }
}
