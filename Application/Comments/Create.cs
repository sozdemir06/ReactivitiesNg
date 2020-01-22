using System;
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

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<CommentDto>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<CommentDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity=await context.Activities.
                                    Include(x=>x.Comments).SingleOrDefaultAsync(x=>x.Id==request.ActivityId);
                if(activity==null)
                {
                    throw new RestException(HttpStatusCode.BadRequest,new{activity="Activity not found"});
                }

                var user=await context.Users.SingleOrDefaultAsync(x=>x.UserName==request.UserName);

                var comment=new Comment
                {
                   Author=user,
                   Activity=activity,
                   Body=request.Body,
                   CreatedAt=DateTime.Now

                };

                

                activity.Comments.Add(comment);
                var success=await context.SaveChangesAsync()>0;
                if(success)
                {
                    return mapper.Map<Comment,CommentDto>(comment);
                }

                throw new Exception("Comment Adding Problem..");

            }
        }
    }
}