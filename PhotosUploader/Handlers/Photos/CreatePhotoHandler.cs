using PhotosUploader.Infrastructure;
using PhotosUploader.Models.DataAccess;
using PhotosUploader.ViewModels.Photos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotosUploader.Handlers.Photos
{
    [Inject]
    public class CreatePhotoHandler
    {
        private readonly PhotosUploaderContext _context;

        public CreatePhotoHandler(PhotosUploaderContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task Handle(CreatePhotoModel model)
        {
            throw new NotImplementedException();


            await _context.SaveChangesAsync();
        }
    }
}
