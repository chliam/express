using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ExpressBoxSimulator
{
    public partial class Main : Form
    {
        public Main()
        {
            InitializeComponent();
        }

        Socket _socket;
        private Socket socket
        {
            get
            {
                if (_socket == null)
                {
                    _socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);                 
                }
                return _socket;
            }
        }

        private void Main_Load(object sender, EventArgs e)
        {
            cmbReason.SelectedIndex = 0;
            cmbStatus.SelectedIndex = 0;
            Thread th = new Thread(Recive);
            th.IsBackground = true;
            th.Start();
        }

        private void btnConn_Click(object sender, EventArgs e)
        {
            try
            {
                if (txtServer.Text.Split('.').Length!=4)
                {
                    MessageBox.Show("服务IP无效！");
                    return;
                }
                if (txtBoxID.Text.Trim().Length != 8)
                {
                    MessageBox.Show("设备标识必须为8位！");
                    return;
                }
                if (socket.Connected)
                {
                    socket.Close();
                    _socket = null;
                }
                socket.Connect(txtServer.Text.Trim(), (int)txtPort.Value);
                var type = new byte[] { 0x01 };
                var cmd = Encoding.UTF8.GetBytes("CONN");
                var len = new byte[] { 0x08 };
                var body = Encoding.UTF8.GetBytes(txtBoxID.Text.Trim());
                var sign = new byte[] { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 };
                var sendData = new byte[type.Length + cmd.Length + len.Length + body.Length + sign.Length];
                Array.ConstrainedCopy(type, 0, sendData, 0, type.Length);
                Array.ConstrainedCopy(cmd, 0, sendData, type.Length, cmd.Length);
                Array.ConstrainedCopy(len, 0, sendData, type.Length + cmd.Length, len.Length);
                Array.ConstrainedCopy(body, 0, sendData, type.Length + cmd.Length + len.Length, body.Length);
                Array.ConstrainedCopy(sign, 0, sendData, type.Length + cmd.Length + len.Length + body.Length, sign.Length);
                socket.Send(sendData);
            }
            catch (Exception es)
            {
                MessageBox.Show(es.Message);
            }
        }

        private void btnDoor_Click(object sender, EventArgs e)
        {
            try
            {
                if (socket.Connected)
                {
                    if (txtExpressID.Text.Trim().Length<1 || txtExpressID.Text.Trim().Length > 12)
                    {
                        MessageBox.Show("快递单号为1~12位！");
                        return;
                    }
                    var type = new byte[] { 0x00 };
                    var cmd = Encoding.UTF8.GetBytes("DOOR");
                    var len = new byte[] { 0x0E };
                    var reason = new byte[] { 0x00 };
                    if (cmbReason.SelectedIndex == 1)
                    {
                        reason = new byte[] { 0x01 };
                    }
                    else if (cmbReason.SelectedIndex == 2)
                    {
                        reason = new byte[] { 0x02 };
                    }
                    var status = new byte[] { 0x00, 0x0B };
                    if (cmbStatus.SelectedIndex == 1)
                    {
                        status = new byte[] { 0x01,0x0B };
                    }
                    var body = Encoding.UTF8.GetBytes(txtExpressID.Text.Trim());
                    switch (body.Length) {
                        case 1:
                            len = new byte[] { 0x04 };
                            break;
                        case 2:
                            len = new byte[] { 0x05 };
                            break;
                        case 3:
                            len = new byte[] { 0x06 };
                            break;
                        case 4:
                            len = new byte[] { 0x07 };
                            break;
                        case 5:
                            len = new byte[] { 0x08 };
                            break;
                        case 6:
                            len = new byte[] { 0x09 };
                            break;
                        case 7:
                            len = new byte[] { 0x0A };
                            break;
                        case 8:
                            len = new byte[] { 0x0B };
                            break;
                        case 9:
                            len = new byte[] { 0x0C };
                            break;
                        case 10:
                            len = new byte[] { 0x0D };
                            break;
                        case 11:
                            len = new byte[] { 0x0E };
                            break;
                        case 12:
                            len = new byte[] { 0x10 };
                            break;
                        default:
                            break;
                    }
                    var sign = new byte[] { 0x00,0x00,0x00,0x00, 0x00, 0x00, 0x00, 0x00 };
                    var sendData = new byte[type.Length + cmd.Length + len.Length + reason.Length + status.Length + body.Length + sign.Length];
                    Array.ConstrainedCopy(type, 0, sendData, 0, type.Length);
                    Array.ConstrainedCopy(cmd, 0, sendData, type.Length, cmd.Length);
                    Array.ConstrainedCopy(len, 0, sendData, type.Length + cmd.Length, len.Length);
                    Array.ConstrainedCopy(reason, 0, sendData, type.Length + cmd.Length + len.Length, reason.Length);
                    Array.ConstrainedCopy(status, 0, sendData, type.Length + cmd.Length + len.Length + reason.Length, status.Length);
                    Array.ConstrainedCopy(body, 0, sendData, type.Length + cmd.Length + len.Length + reason.Length + status.Length, body.Length);
                    Array.ConstrainedCopy(sign, 0, sendData, type.Length + cmd.Length + len.Length + reason.Length + status.Length+ body.Length, sign.Length);
                    socket.Send(sendData);
                }
                else
                {
                    MessageBox.Show("请先执行CONN！");
                }               
            }
            catch (Exception es)
            {
                MessageBox.Show(es.Message);
            }
        }

        private void btnPing_Click(object sender, EventArgs e)
        {
            try
            {
                if (socket.Connected)
                {                   
                    var type = new byte[] { 0x00 };
                    var cmd = Encoding.UTF8.GetBytes("PING");
                    var len = new byte[] { 0x18 };
                    var payload = new byte[] { 0x00 };
                    var body = Encoding.UTF8.GetBytes(string.Format("N{0}E{1}",txtLatitude.Value,txtLongitude.Value));
                    var sign = new byte[] { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 };
                    var sendData = new byte[type.Length + cmd.Length + len.Length + payload.Length + body.Length + sign.Length];
                    Array.ConstrainedCopy(type, 0, sendData, 0, type.Length);
                    Array.ConstrainedCopy(cmd, 0, sendData, type.Length, cmd.Length);
                    Array.ConstrainedCopy(len, 0, sendData, type.Length + cmd.Length, len.Length);
                    Array.ConstrainedCopy(payload, 0, sendData, type.Length + cmd.Length + len.Length, payload.Length);
                    Array.ConstrainedCopy(body, 0, sendData, type.Length + cmd.Length + len.Length + payload.Length, body.Length);
                    Array.ConstrainedCopy(sign, 0, sendData, type.Length + cmd.Length + len.Length + payload.Length + body.Length, sign.Length);
                    socket.Send(sendData);
                }
                else
                {
                    MessageBox.Show("请先执行CONN！");
                }
            }
            catch (Exception es)
            {
                MessageBox.Show(es.Message);
            }
        }

        /// <summary>
        /// 不停的接受服务器发来的消息
        /// </summary>
        void Recive()
        {
            while (true)
            {
                if (_socket!=null && _socket.Connected)
                {
                    try
                    {
                        byte[] buffer = new byte[1024 * 1024 * 3];
                        int r = socket.Receive(buffer);
                        if (r != 0)
                        {
                            Action<string> actionDelegate = (x) => { this.listMsg.Items.Add(x); };
                            this.listMsg.Invoke(actionDelegate, Encoding.UTF8.GetString(buffer, 0, r));
                        }
                    }
                    catch (Exception es)
                    {
                        Action<string> actionDelegate = (x) => { this.listMsg.Items.Add(x); };
                        this.listMsg.Invoke(actionDelegate, es.Message);
                    }
                }                
            }
        }
    }
}
