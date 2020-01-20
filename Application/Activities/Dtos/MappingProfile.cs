using System.Linq;
using Application.Photos.Dto;
using AutoMapper;
using Domain;


namespace Application.Activities.Dtos
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity,ActivityDto>();
            CreateMap<UserActivity,AttandeeDto>()
                    .ForMember(d=>d.UserName,o=>o.MapFrom(x=>x.AppUser.UserName))
                    .ForMember(d=>d.DisplayName,o=>o.MapFrom(x=>x.AppUser.DisplayName));

           CreateMap<UserPhoto,PhotoForReturnDto>();
           CreateMap<AppUser,Application.Profiles.Profile>()
                    .ForMember(d=>d.Image,o=>o.MapFrom(x=>x.UserPhotos.FirstOrDefault(x=>x.IsMain).ImageUrl));
        }
    }
}