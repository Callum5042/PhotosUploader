using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace PhotosUploader.ViewModels.Photos
{
    public class AbstractPhoto
    {
        public string Key { get; set; }

        public IFormFile File { get; set; }

        public bool IsPrimary { get; set; }

        public int Size { get; set; }
    }

    public class CreatePhotoModel
    {
        public IEnumerable<AbstractPhoto> Photos { get; set; }

        public string Test { get; set; }
    }
}