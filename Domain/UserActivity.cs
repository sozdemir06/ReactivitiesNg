using System;

namespace Domain
{
    public class UserActivity
    {
        public Guid Id { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid ActivityId { get; set; }
        public Activity Activity { get; set; }
        public DateTime DateJoined { get; set; }
        public bool isHost { get; set; }
    }
}