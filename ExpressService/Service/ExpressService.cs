using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace ExpressService
{
    public partial class ExpressService : ServiceBase
    {
        public ExpressService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            LogHelper.LogInfo("启动服务");
            try
            {
                
            }
            catch (Exception es)
            {
                LogHelper.LogInfo("启动服务失败");
                LogHelper.LogError(es);
                this.Stop();
            }
        }

        protected override void OnStop()
        {
            LogHelper.LogInfo("停止服务");
            try
            {
                
            }
            catch (Exception es)
            {
                LogHelper.LogError(es);
            }
        }
    }
}
