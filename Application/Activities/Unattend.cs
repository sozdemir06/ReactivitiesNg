using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities.Dtos;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Concrete.Context;

namespace Application.Activities
{
    public class Unattend
    {
        public class Command : IRequest<AttandeeDto>
        {
            public Guid ActivityId { get; set; }
        }

        public class Handler : IRequestHandler<Command, AttandeeDto>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly IMapper mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                this.mapper = mapper;
                this.userAccessor = userAccessor;
                this.context = context;
            }

            public async Task<AttandeeDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.ActivityId);

                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "Could not found activity" });
                }

                var user = await context.Users.SingleOrDefaultAsync(u => u.UserName == userAccessor.GetCurrentUsername());
                var attandee = await context.UserActivities.SingleOrDefaultAsync(x => x.ActivityId == activity.Id && x.AppUserId == user.Id);
                var attedeeForReturn =mapper.Map<UserActivity,AttandeeDto>(attandee);
                if (attandee == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest,new{Attendee="Attendee not found"});
                }
                if (attandee.isHost)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { activity = "You can not remove from your activity" });
                }
                context.UserActivities.Remove(attandee);
                var success = await context.SaveChangesAsync() > 0;

                if (success)
                {
                    return  attedeeForReturn;
                }

                throw new Exception("Problem remove from attend from activity...");

            }
        }
    }
}