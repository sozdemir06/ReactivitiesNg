using System;
using System.Threading.Tasks;
using Application.Photos;
using Application.Photos.Dto;
using Application.Users;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator mediator;
        public UserController(IMediator mediator)
        {
            this.mediator = mediator;
        }



        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return await mediator.Send(query);
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command)
        {
            return await mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<User>> GetCurrentUser()
        {
            return  await mediator.Send(new CurrentUser.Query());
        }

        [HttpPost("uploadphoto")]
        public async Task<ActionResult<PhotoForReturnDto>> AddPhoto([FromForm]IFormFile file)
        {
            return await mediator.Send(new CreatePhoto.Command{File=file});
        }

        [HttpDelete("{photoId}")]
        public async Task<ActionResult<Unit>> DeletePhoto(Guid id)
        {
            return await mediator.Send(new Delete.Command{PhotoId=id});
        }

    }
}