using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Concrete.Context;

namespace Application.Activities
{
    public class List
    {
        public class ActivitiesEnvelope
        {
            public List<ActivityDto> Activities { get; set; }
            public int ActivityCount { get; set; }
        }

        public class Query : IRequest<ActivitiesEnvelope>
        {
          
            public Query(int? limit, int? offset)
            {
                this.Limit = limit;
                this.Offset = offset;

            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
        }

        public class Handler : IRequestHandler<Query, ActivitiesEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<ActivitiesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.Activities
                                    .Include(x => x.UserActivities)
                                    .ThenInclude(x => x.AppUser)
                                    .AsQueryable();
                var activities=await queryable.Skip(request.Offset??0).Take(request.Limit??3).ToListAsync();

                return new ActivitiesEnvelope
                {
                    Activities=_mapper.Map<List<Activity>, List<ActivityDto>>(activities),
                    ActivityCount=await queryable.CountAsync()
                };

            }
        }
    }
}