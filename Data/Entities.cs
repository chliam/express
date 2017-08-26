using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class Entities
    {
        private static expressEntities _expressEntities;

        private Entities()
        {
        }

        public static expressEntities Instance
        {
            get
            {
                if (_expressEntities == null)
                {
                    _expressEntities = new expressEntities();
                }
                return _expressEntities;

            }
        }
    }
}
