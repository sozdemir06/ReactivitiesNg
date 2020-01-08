using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Concrete.Context
{
    public class DataContext:IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options):base(options)
        {
            
        }


        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserActivity>(x=>x.HasKey(ua=>new {ua.AppUserId,ua.ActivityId}));

            builder.Entity<UserActivity>()
                   .HasOne(u=>u.AppUser)
                   .WithMany(a=>a.UserActivities)
                   .HasForeignKey(fk=>fk.AppUserId);
            builder.Entity<UserActivity>()
                   .HasOne(a=>a.Activity)
                   .WithMany(u=>u.UserActivities)
                   .HasForeignKey(fk=>fk.ActivityId);  
        }
    }

    
}