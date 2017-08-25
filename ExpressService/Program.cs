using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace ExpressService
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            if (!Environment.UserInteractive)
            {
                ServiceBase[] ServicesToRun = new ServiceBase[] { new ExpressService() };
                ServiceBase.Run(ServicesToRun);
                return;
            }
            else
            {
                Console.WriteLine("您现在运行的是快递箱服务管理程序！");
                Console.WriteLine("请按下面提示按键继续..");
                Console.WriteLine("-[i]: 将系统安装为Windows服务;");
                Console.WriteLine("-[u]: 将系统从Windows服务中卸载;");
                Console.WriteLine("-[r]: 直接运行服务;");
                Console.WriteLine("-[q]: 退出管理程序;");
                string mArg = Console.ReadLine();
                while (mArg.ToLower() != "q")
                {
                    Console.WriteLine();
                    switch (mArg.ToLower())
                    {
                        case ("i"):
                            SelfInstaller.InstallMe();
                            break;
                        case ("u"):
                            SelfInstaller.UninstallMe();
                            break;
                        case ("r"):
                            Socket.Socket.run();
                            break;
                        default:
                            Console.WriteLine("不可用的命令！");
                            break;
                    }
                    Console.WriteLine("请按下面提示按键继续..");
                    Console.WriteLine("-[i]: 将系统安装为Windows服务;");
                    Console.WriteLine("-[u]: 将系统从Windows服务中卸载;");
                    Console.WriteLine("-[r]: 直接运行服务;");
                    Console.WriteLine("-[q]: 退出管理程序;");
                    mArg = Console.ReadLine();
                }
            }
        }
    }
}
