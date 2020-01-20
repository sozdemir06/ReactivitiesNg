using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Photos.Dto;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence.Concrete.Context;

namespace Application.Photos
{
    public class CreatePhoto
    {
        public class Command : IRequest<PhotoForReturnDto>
        {
            public IFormFile File { get; set; }
        }


        public class Handler : IRequestHandler<Command, PhotoForReturnDto>
        {
            private readonly DataContext dataContext;
            private readonly IUserAccessor userAccessor;
            private readonly IMapper mapper;
            private readonly IPhotosAccessor photosAccessor;
            public Handler(DataContext dataContext, IUserAccessor userAccessor, IMapper mapper, IPhotosAccessor photosAccessor)
            {
                this.photosAccessor = photosAccessor;
                this.mapper = mapper;
                this.userAccessor = userAccessor;
                this.dataContext = dataContext;

            }

            public async Task<PhotoForReturnDto> Handle(Command request, CancellationToken cancellationToken)
            {
                
                var currentUser = await dataContext.Users.Include(u=>u.UserPhotos).
                                            SingleOrDefaultAsync(u => u.UserName == userAccessor.GetCurrentUsername());
                if (currentUser == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { UserPhoto = "UnAuthorized" });
                }

                var uploadPhoto =await photosAccessor.AddPhoto(request.File);
                    uploadPhoto.AppUserId=currentUser.Id;
                
                if(!currentUser.UserPhotos.Any(u=>u.IsMain))
                {
                    uploadPhoto.IsMain=true;
                }
              
                dataContext.UserPhotos.Add(uploadPhoto);
                var success = await dataContext.SaveChangesAsync() > 0;

                if (success)
                {
                    var photoForReturn = mapper.Map<UserPhoto, PhotoForReturnDto>(uploadPhoto);
                    return photoForReturn;
                }

                throw new Exception("Problem uplaod photo");
            }
        }
    }
}