using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities.Dtos;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Concrete.Context;

namespace Application.Activities
{
    public class AttendList
    {
        public class Query : IRequest<List<AttandeeDto>>
        {
            public Guid ActivityId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<AttandeeDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<List<AttandeeDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activityAttend = await context.UserActivities
                .Include(x => x.AppUser)
                .Where(x => x.ActivityId == request.ActivityId).ToListAsync();
                if (activityAttend == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Attend = "Not found Attend for this activity.." });
                }

                var attendForReturn =mapper.Map<List<UserActivity>,List<AttandeeDto>>(activityAttend);
                return attendForReturn;

            }
        }
    }
}