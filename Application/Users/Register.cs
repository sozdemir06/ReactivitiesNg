using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence.Concrete.Context;

namespace Application.Users
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty().WithMessage("DisplayName can't be empty..");
                RuleFor(x => x.UserName).NotEmpty().WithMessage("UserName can't be empty..");
                RuleFor(x => x.Email).NotEmpty().WithMessage("Email can't be empty..");
                RuleFor(x => x.Password).Password();
            }
        }
        public class Handler : IRequestHandler<Command,User>
        {
            private readonly DataContext context;
            private readonly UserManager<AppUser> userManager;
            private readonly IJwtGenerator jwtGenerator;
            public Handler(DataContext context, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                this.jwtGenerator = jwtGenerator;
                this.userManager = userManager;
                this.context = context;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                var checkEmail=await context.Users.Where(x=>x.Email==request.Email).AnyAsync();
                if(checkEmail)
                {
                    throw new RestException(HttpStatusCode.BadRequest,new{Email="Email is alreadey taken.."});
                }
                var checkUserName=await context.Users.Where(x=>x.UserName==request.UserName).AnyAsync();
                if(checkUserName)
                {
                    throw new RestException(HttpStatusCode.BadRequest,new{Email="UserName is alreadey taken.."});
                }

                var user=new AppUser
                {
                    DisplayName=request.DisplayName,
                    UserName=request.UserName,
                    Email=request.Email
                };

                var result=await userManager.CreateAsync(user,request.Password);
                if(result.Succeeded)
                {
                    return new User
                    {
                        DisplayName=user.DisplayName,
                        Token=jwtGenerator.CreateToken(user),
                        UserName=user.UserName,
                        Image=null
                    };
                }

                throw new Exception("Problem Register..");
            }
        }
    }
}