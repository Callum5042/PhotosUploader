using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace PhotosUploader.ViewModels.Photos
{
    public class AbstractPhoto
    {
        public IFormFile File { get; set; }

        public bool IsPrimary { get; set; }

        public int Size { get; set; }
    }

    public class CreatePhotoModel
    {
        public IFormFileCollection Files { get; set; }

        public IEnumerable<AbstractPhoto> Photos { get; set; }
    }
}