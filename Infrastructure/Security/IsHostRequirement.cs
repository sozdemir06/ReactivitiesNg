using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence.Concrete.Context;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {

    }

    public class IsHostAuthorizationHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly DataContext _context;
        public IsHostAuthorizationHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _context = context;
            this.httpContextAccessor = httpContextAccessor;
        }

        protected override  Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
              var currentUser=httpContextAccessor.HttpContext.User?.Claims?.SingleOrDefault(x=>x.Type==ClaimTypes.NameIdentifier)?.Value;
              var activityId=Guid.Parse(httpContextAccessor.HttpContext.Request.RouteValues.SingleOrDefault(x=>x.Key=="id").Value.ToString());

              var activity=_context.Activities.FindAsync(activityId).Result;

              var host=activity.UserActivities.FirstOrDefault(x=>x.isHost);

              if(host?.AppUser?.UserName==currentUser)
              {
                  context.Succeed(requirement);
              }

              return Task.CompletedTask;

        }
    }
}