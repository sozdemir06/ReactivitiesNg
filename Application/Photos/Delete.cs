using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Concrete.Context;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string UserId { get; set; }
            public Guid PhotoId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly IPhotosAccessor photosAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor, IPhotosAccessor photosAccessor)
            {
                this.photosAccessor = photosAccessor;
                this.userAccessor = userAccessor;
                this.context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user=await context.Users.Include(p=>p.UserPhotos).SingleOrDefaultAsync(x=>x.UserName==userAccessor.GetCurrentUsername());
                if(user==null)
                {
                    throw new RestException(HttpStatusCode.BadRequest,new{user="User Not found"});
                }

                var photo=user.UserPhotos.FirstOrDefault(x=>x.Id==request.PhotoId);
                if(photo==null)
                {
                    throw new RestException(HttpStatusCode.BadRequest,new{Photos="Photo not found.!!!"});
                }

                var deletePhoto=await photosAccessor.DeletePhoto(photo.ImageUrl);
                if(!deletePhoto)
                {
                    throw new RestException(HttpStatusCode.BadRequest,new{DeletePhotoPhysical="Photo cant delete from Path..."});
                }

                context.UserPhotos.Remove(photo);
                var success=await context.SaveChangesAsync()>0; 
                if(success)
                {
                    return Unit.Value;
                }

                throw new Exception("Delete Photo Problems..");    
            }
        }
    }
}