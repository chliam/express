﻿//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace Data
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class expressEntities : DbContext
    {
        public expressEntities()
            : base("name=expressEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<company> companies { get; set; }
        public virtual DbSet<express> expresses { get; set; }
        public virtual DbSet<gps> gpses { get; set; }
        public virtual DbSet<logistic> logistics { get; set; }
        public virtual DbSet<logisticsdetail> logisticsdetails { get; set; }
        public virtual DbSet<scinfo> scinfoes { get; set; }
        public virtual DbSet<userinfo> userinfoes { get; set; }
        public virtual DbSet<varcode> varcodes { get; set; }
        public virtual DbSet<socketlog> socketlogs { get; set; }
        public virtual DbSet<feedback> feedbacks { get; set; }
        public virtual DbSet<userpic> userpics { get; set; }
    }
}
