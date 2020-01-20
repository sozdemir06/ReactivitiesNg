using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser:IdentityUser
    {
        public string DisplayName { get; set; }
        public ICollection<UserActivity> UserActivities { get; set; }
        public ICollection<UserPhoto> UserPhotos { get; set; }
        public ICollection<Comment> Comments { get; set; }

    }
}