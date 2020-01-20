using System;
using System.Drawing;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using LazZiya.ImageResize;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;


namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotosAccessor
    {
        private readonly IHostEnvironment host;
        public PhotoAccessor(IHostEnvironment host)
        {
            this.host = host;
        }

        public async Task<UserPhoto> AddPhoto(IFormFile file)
        {
            if (file.Length > 0)
            {
                var uploadsFolderPath = Path.Combine(host.ContentRootPath, "wwwroot/uploads");
                if (!Directory.Exists(uploadsFolderPath))
                {
                    Directory.CreateDirectory(uploadsFolderPath);
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(uploadsFolderPath, fileName);

                using (var stream = file.OpenReadStream())
                {
                   var uploadedImage=Image.FromStream(stream);
                   var imageWidth=uploadedImage.Width<800?uploadedImage.Width:800;
                  
                   var img=ImageResize.ScaleByWidth(uploadedImage,imageWidth);
                   img.SaveAs(filePath);

                   await stream.DisposeAsync();
                }

                var UserPhoto = new UserPhoto
                {

                    ImageFullPath = filePath,
                    ImageUrl = fileName
                };

                return UserPhoto;

            }

            throw new RestException(HttpStatusCode.BadRequest, new { UserPhoto = "Please select an image file" });
        }

        public Task<bool> DeletePhoto(string fileName)
        {
              var checkDelete=true;
              var uploadsFolderPath = Path.Combine(host.ContentRootPath, "wwwroot/uploads");
               var fullPath=Path.Combine(uploadsFolderPath,fileName);
              if(!File.Exists(fullPath))
              { 
                 checkDelete=false;
                  throw new RestException(HttpStatusCode.BadRequest,new{PhotoDelete="Can'find photo.."});
              }
             File.Delete(fullPath);
             return Task.FromResult(checkDelete);
        }
    }
}