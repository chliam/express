namespace ExpressBoxSimulator
{
    partial class Main
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows 窗体设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要修改
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Main));
            this.btnConn = new System.Windows.Forms.Button();
            this.btnDoor = new System.Windows.Forms.Button();
            this.txtServer = new System.Windows.Forms.TextBox();
            this.txtPort = new System.Windows.Forms.NumericUpDown();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.btnPing = new System.Windows.Forms.Button();
            this.label3 = new System.Windows.Forms.Label();
            this.txtBoxID = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.cmbReason = new System.Windows.Forms.ComboBox();
            this.cmbStatus = new System.Windows.Forms.ComboBox();
            this.label7 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.txtExpressID = new System.Windows.Forms.TextBox();
            this.txtLongitude = new System.Windows.Forms.NumericUpDown();
            this.txtLatitude = new System.Windows.Forms.NumericUpDown();
            this.listMsg = new System.Windows.Forms.ListBox();
            ((System.ComponentModel.ISupportInitialize)(this.txtPort)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtLongitude)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtLatitude)).BeginInit();
            this.SuspendLayout();
            // 
            // btnConn
            // 
            this.btnConn.Location = new System.Drawing.Point(485, 13);
            this.btnConn.Name = "btnConn";
            this.btnConn.Size = new System.Drawing.Size(75, 27);
            this.btnConn.TabIndex = 0;
            this.btnConn.Text = "Conn";
            this.btnConn.UseVisualStyleBackColor = true;
            this.btnConn.Click += new System.EventHandler(this.btnConn_Click);
            // 
            // btnDoor
            // 
            this.btnDoor.Location = new System.Drawing.Point(485, 56);
            this.btnDoor.Name = "btnDoor";
            this.btnDoor.Size = new System.Drawing.Size(75, 27);
            this.btnDoor.TabIndex = 1;
            this.btnDoor.Text = "Door";
            this.btnDoor.UseVisualStyleBackColor = true;
            this.btnDoor.Click += new System.EventHandler(this.btnDoor_Click);
            // 
            // txtServer
            // 
            this.txtServer.Location = new System.Drawing.Point(63, 16);
            this.txtServer.Name = "txtServer";
            this.txtServer.Size = new System.Drawing.Size(93, 21);
            this.txtServer.TabIndex = 2;
            this.txtServer.Text = "116.62.146.2";
            // 
            // txtPort
            // 
            this.txtPort.Location = new System.Drawing.Point(204, 16);
            this.txtPort.Maximum = new decimal(new int[] {
            65536,
            0,
            0,
            0});
            this.txtPort.Name = "txtPort";
            this.txtPort.Size = new System.Drawing.Size(90, 21);
            this.txtPort.TabIndex = 3;
            this.txtPort.Value = new decimal(new int[] {
            2017,
            0,
            0,
            0});
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(14, 20);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(47, 12);
            this.label1.TabIndex = 4;
            this.label1.Text = "服务IP:";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(166, 20);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(35, 12);
            this.label2.TabIndex = 5;
            this.label2.Text = "端口:";
            // 
            // btnPing
            // 
            this.btnPing.Location = new System.Drawing.Point(313, 99);
            this.btnPing.Name = "btnPing";
            this.btnPing.Size = new System.Drawing.Size(75, 27);
            this.btnPing.TabIndex = 6;
            this.btnPing.Text = "Ping";
            this.btnPing.UseVisualStyleBackColor = true;
            this.btnPing.Click += new System.EventHandler(this.btnPing_Click);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(311, 20);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(59, 12);
            this.label3.TabIndex = 8;
            this.label3.Text = "设备标识:";
            // 
            // txtBoxID
            // 
            this.txtBoxID.Location = new System.Drawing.Point(370, 16);
            this.txtBoxID.Name = "txtBoxID";
            this.txtBoxID.Size = new System.Drawing.Size(93, 21);
            this.txtBoxID.TabIndex = 7;
            this.txtBoxID.Text = "00000001";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(14, 63);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(35, 12);
            this.label4.TabIndex = 9;
            this.label4.Text = "原因:";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(14, 108);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(35, 12);
            this.label5.TabIndex = 10;
            this.label5.Text = "经度:";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(166, 108);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(35, 12);
            this.label6.TabIndex = 11;
            this.label6.Text = "纬度:";
            // 
            // cmbReason
            // 
            this.cmbReason.FormattingEnabled = true;
            this.cmbReason.Items.AddRange(new object[] {
            "未知",
            "放件",
            "取件"});
            this.cmbReason.Location = new System.Drawing.Point(63, 59);
            this.cmbReason.Name = "cmbReason";
            this.cmbReason.Size = new System.Drawing.Size(92, 20);
            this.cmbReason.TabIndex = 12;
            // 
            // cmbStatus
            // 
            this.cmbStatus.FormattingEnabled = true;
            this.cmbStatus.Items.AddRange(new object[] {
            "无",
            "有"});
            this.cmbStatus.Location = new System.Drawing.Point(204, 59);
            this.cmbStatus.Name = "cmbStatus";
            this.cmbStatus.Size = new System.Drawing.Size(93, 20);
            this.cmbStatus.TabIndex = 14;
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(166, 63);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(35, 12);
            this.label7.TabIndex = 13;
            this.label7.Text = "状态:";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(311, 63);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(59, 12);
            this.label8.TabIndex = 16;
            this.label8.Text = "快递单号:";
            // 
            // txtExpressID
            // 
            this.txtExpressID.Location = new System.Drawing.Point(370, 59);
            this.txtExpressID.Name = "txtExpressID";
            this.txtExpressID.Size = new System.Drawing.Size(93, 21);
            this.txtExpressID.TabIndex = 15;
            this.txtExpressID.Text = "KD0001";
            // 
            // txtLongitude
            // 
            this.txtLongitude.DecimalPlaces = 5;
            this.txtLongitude.Increment = new decimal(new int[] {
            1,
            0,
            0,
            196608});
            this.txtLongitude.Location = new System.Drawing.Point(63, 104);
            this.txtLongitude.Maximum = new decimal(new int[] {
            9999,
            0,
            0,
            0});
            this.txtLongitude.Minimum = new decimal(new int[] {
            1000,
            0,
            0,
            0});
            this.txtLongitude.Name = "txtLongitude";
            this.txtLongitude.Size = new System.Drawing.Size(93, 21);
            this.txtLongitude.TabIndex = 17;
            this.txtLongitude.Value = new decimal(new int[] {
            115020112,
            0,
            0,
            327680});
            // 
            // txtLatitude
            // 
            this.txtLatitude.DecimalPlaces = 5;
            this.txtLatitude.Increment = new decimal(new int[] {
            1,
            0,
            0,
            196608});
            this.txtLatitude.Location = new System.Drawing.Point(204, 104);
            this.txtLatitude.Maximum = new decimal(new int[] {
            99999,
            0,
            0,
            0});
            this.txtLatitude.Minimum = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            this.txtLatitude.Name = "txtLatitude";
            this.txtLatitude.Size = new System.Drawing.Size(93, 21);
            this.txtLatitude.TabIndex = 18;
            this.txtLatitude.Value = new decimal(new int[] {
            1123020112,
            0,
            0,
            327680});
            // 
            // listMsg
            // 
            this.listMsg.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left)));
            this.listMsg.FormattingEnabled = true;
            this.listMsg.ItemHeight = 12;
            this.listMsg.Location = new System.Drawing.Point(16, 153);
            this.listMsg.Name = "listMsg";
            this.listMsg.Size = new System.Drawing.Size(544, 292);
            this.listMsg.TabIndex = 19;
            // 
            // Main
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(579, 467);
            this.Controls.Add(this.listMsg);
            this.Controls.Add(this.txtLatitude);
            this.Controls.Add(this.txtLongitude);
            this.Controls.Add(this.label8);
            this.Controls.Add(this.txtExpressID);
            this.Controls.Add(this.cmbStatus);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.cmbReason);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.txtBoxID);
            this.Controls.Add(this.btnPing);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.txtPort);
            this.Controls.Add(this.txtServer);
            this.Controls.Add(this.btnDoor);
            this.Controls.Add(this.btnConn);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "Main";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "快递箱-模拟器";
            this.Load += new System.EventHandler(this.Main_Load);
            ((System.ComponentModel.ISupportInitialize)(this.txtPort)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtLongitude)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtLatitude)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btnConn;
        private System.Windows.Forms.Button btnDoor;
        private System.Windows.Forms.TextBox txtServer;
        private System.Windows.Forms.NumericUpDown txtPort;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Button btnPing;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox txtBoxID;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.ComboBox cmbReason;
        private System.Windows.Forms.ComboBox cmbStatus;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.TextBox txtExpressID;
        private System.Windows.Forms.NumericUpDown txtLongitude;
        private System.Windows.Forms.NumericUpDown txtLatitude;
        private System.Windows.Forms.ListBox listMsg;
    }
}

