using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace PhotosUploader.Models.DataAccess
{
    public class PersonConfiguration : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> builder)
        {
            builder.ToTable("PERSON");
            builder.HasKey(x => x.PersonId);
            builder.Property(x => x.PersonId)
                .HasColumnName("PERSON_ID");
            builder.Property(x => x.FirstName)
                .HasColumnName("FIRST_NAME");
            builder.Property(x => x.LastName)
                .HasColumnName("LAST_NAME");
            builder.Property(x => x.DateOfBirth)
                .HasColumnName("DATE_OF_BIRTH");
        }
    }
}
