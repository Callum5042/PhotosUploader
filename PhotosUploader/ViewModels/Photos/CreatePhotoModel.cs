using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace PhotosUploader.ViewModels.Photos
{
    public class CreatePhotoModel
    {
        public IFormFileCollection Files { get; set; }
    }
}