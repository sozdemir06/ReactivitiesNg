using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Persistence.Concrete.Context;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Application.Activities
{
    public class Attend
    {
        public class Command : IRequest
        {
            public Guid ActivityId { get; set; }
        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.ActivityId);

                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "Could not found activity" });
                }

                var user = await context.Users.SingleOrDefaultAsync(u => u.UserName == userAccessor.GetCurrentUsername());
                var attandee = await context.UserActivities.SingleOrDefaultAsync(x => x.ActivityId == activity.Id && x.AppUserId == user.Id);
                if (attandee != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { activity = "You already attend this activity" });
                }

                attandee = new UserActivity
                {
                    Activity=activity,
                    AppUser=user,
                    isHost=false,
                    DateJoined=DateTime.Now
                };

                context.UserActivities.Add(attandee);
                var success=await  context.SaveChangesAsync()>0;
                if(success)
                {
                    return Unit.Value;
                }

                throw new Exception("Problem new save attandee");
            }
        }
    }
}