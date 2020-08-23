using System;

namespace PhotosUploader.Models
{
    public class Person
    {
        public Person(string firstName)
        {
            if (string.IsNullOrEmpty(firstName))
            {
                throw new ArgumentException($"'{nameof(firstName)}' cannot be null or empty", nameof(firstName));
            }

            FirstName = firstName;
        }

        public int Id { get; protected set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime? DateOfBirth { get; set; }
    }
}