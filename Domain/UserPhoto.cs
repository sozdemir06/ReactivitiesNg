using System;

namespace Domain
{
    public class UserPhoto
    {
        public Guid Id { get; set; }
        public string ImageFullPath { get; set; }
        public string ImageUrl { get; set; }
        public DateTime Created { get; set; }
        public bool IsMain { get; set; }
        public AppUser AppUser { get; set; }
        public string AppUserId { get; set; }


        public UserPhoto()
        {
            Created=DateTime.Now;
        }

    }
}