using System;

namespace Application.Activities.Dtos
{
    public class AttandeeDto
    {
     
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public bool IsHost { get; set; }
    }
}