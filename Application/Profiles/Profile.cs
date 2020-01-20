using System.Collections.Generic;
using System.Text.Json.Serialization;
using Application.Photos.Dto;

namespace Application.Profiles
{
    public class Profile
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public string Image { get; set; }

        [JsonPropertyName("photos")]
        public ICollection<PhotoForReturnDto> UserPhotos { get; set; }
    }
}