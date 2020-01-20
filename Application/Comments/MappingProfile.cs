using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Comments
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Comment,CommentDto>()
                    .ForMember(d=>d.DisplayName,o=>o.MapFrom(x=>x.Author.DisplayName))
                    .ForMember(d=>d.UserName,o=>o.MapFrom(x=>x.Author.UserName))
                    .ForMember(d=>d.Image,o=>o.MapFrom(x=>x.Author.UserPhotos.FirstOrDefault(x=>x.IsMain).ImageUrl));
                    
        }
    }
}