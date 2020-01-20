using System;

namespace Application.Photos.Dto
{
    public class PhotoForReturnDto
    {
        public Guid Id { get; set; }
        public string ImageFullPath { get; set; }
        public string ImageUrl { get; set; }
        public bool IsMain { get; set; }
    }
}