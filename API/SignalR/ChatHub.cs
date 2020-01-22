using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly IMediator mediator;
        public ChatHub(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            var username=Context.User?.Claims?.FirstOrDefault(x=>x.Type==ClaimTypes.NameIdentifier)?.Value;
            command.UserName=username;

            var comment=await mediator.Send(command);
            await Clients.All.SendAsync("ReceiveComment",comment); 
        }
    }
}