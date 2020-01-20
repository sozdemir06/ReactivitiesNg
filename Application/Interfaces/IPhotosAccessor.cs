using System.Threading.Tasks;
using Application.Photos.Dto;
using Domain;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IPhotosAccessor
    {
         Task<UserPhoto> AddPhoto(IFormFile file);
         Task<bool> DeletePhoto(string fileName);
    }
}