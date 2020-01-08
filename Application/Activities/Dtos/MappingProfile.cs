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
        }
    }
}