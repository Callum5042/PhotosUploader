using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace PhotosUploader.ViewModels.People
{
    public class CreatePersonModel
    {
        [Required(AllowEmptyStrings = false)]
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public IFormFileCollection Files { get; set; }
    }
}
