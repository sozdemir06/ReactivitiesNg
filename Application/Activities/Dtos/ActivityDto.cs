using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Application.Activities.Dtos
{
    public class ActivityDto
    {
         public Guid Id { get; set; }
        public string Title { get; set; }
        public string  Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }

        [JsonPropertyName("attandees")]
        public ICollection<AttandeeDto> UserActivities { get; set; }
    }
}