using System;

namespace Domain
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public AppUser Author { get; set; }
        public string UserId { get; set; }
        public Activity Activity { get; set; }
        public Guid ActivityId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}