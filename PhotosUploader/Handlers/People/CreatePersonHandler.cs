using PhotosUploader.Infrastructure;
using PhotosUploader.Models;
using PhotosUploader.Models.DataAccess;
using PhotosUploader.ViewModels.People;
using System;
using System.Threading.Tasks;

namespace PhotosUploader.Handlers.People
{
    [Inject]
    public class CreatePersonHandler
    {
        private readonly PhotosUploaderContext _context;

        public CreatePersonHandler(PhotosUploaderContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task Handle(CreatePersonModel model)
        {
            var person = new Person(model.FirstName)
            {
                LastName = model.LastName,
                DateOfBirth = model.DateOfBirth
            };

            _context.People.Add(person);
            await _context.SaveChangesAsync();
        }
    }
}
