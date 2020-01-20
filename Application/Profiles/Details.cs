using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Concrete.Context;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Profile>
        {
            public string UserName { get; set; }
        }
        public class Handler : IRequestHandler<Query, Profile>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Profile> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users.Include(u => u.UserPhotos).SingleOrDefaultAsync(x => x.UserName == request.UserName);
                if (user == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Users = "Profile Not Found" });
                }

                var profile=mapper.Map<AppUser,Application.Profiles.Profile>(user);

                return profile;

            }
        }
    }
}