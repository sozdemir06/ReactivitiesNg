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
        public DbSet<UserPhoto> UserPhotos { get; set; }

        public DbSet<Comment> Comments { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserActivity>()
                   .HasOne(u=>u.AppUser)
                   .WithMany(a=>a.UserActivities)
                   .HasForeignKey(fk=>fk.AppUserId);
            builder.Entity<UserActivity>()
                   .HasOne(a=>a.Activity)
                   .WithMany(u=>u.UserActivities)
                   .HasForeignKey(fk=>fk.ActivityId); 

            builder.Entity<UserPhoto>()
                    .HasOne(x=>x.AppUser)
                    .WithMany(x=>x.UserPhotos)
                    .HasForeignKey(f=>f.AppUserId);
            builder.Entity<Comment>()
                    .HasOne(u=>u.Author)
                    .WithMany(u=>u.Comments)
                    .HasForeignKey(f=>f.UserId);
            builder.Entity<Comment>()
                    .HasOne(u=>u.Activity)
                    .WithMany(u=>u.Comments)
                    .HasForeignKey(f=>f.ActivityId);

        }
    }

    
}