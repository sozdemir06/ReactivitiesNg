using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Application.Activities.Dtos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;

        }

        [HttpGet]
        public async Task<ActionResult<List<ActivityDto>>> List()
        {
           
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityDto>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit([FromBody]Edit.Command command,Guid id)
        {
            command.Id=id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command{Id=id});
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult<Unit>> Attend(Guid id)
        {
            return await _mediator.Send(new Attend.Command{ActivityId=id});
        }

       [HttpDelete("{id}/attend")]
       public async Task<ActionResult<Unit>> RemoveAttend(Guid id)
       {
           return await _mediator.Send(new Unattend.Command{ActivityId=id});
       }
    }
}