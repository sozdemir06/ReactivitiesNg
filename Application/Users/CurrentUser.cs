using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly IUserAccessor userAccessor;
            private readonly IJwtGenerator jwtGeneretor;
            private readonly UserManager<AppUser> userManager;
            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGeneretor, IUserAccessor userAccessor)
            {
                this.userManager = userManager;
                this.jwtGeneretor = jwtGeneretor;
                this.userAccessor = userAccessor;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user=await userManager.FindByNameAsync(userAccessor.GetCurrentUsername());

                return new User
                {
                    DisplayName=user.DisplayName,
                    UserName=user.UserName,
                    Token=jwtGeneretor.CreateToken(user),
                    Image=null
                };
            }
        }
    }
}