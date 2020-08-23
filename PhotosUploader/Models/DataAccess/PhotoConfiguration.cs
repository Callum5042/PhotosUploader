using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace PhotosUploader.Models.DataAccess
{
    public class PhotoConfiguration : IEntityTypeConfiguration<Photo>
    {
        public void Configure(EntityTypeBuilder<Photo> builder)
        {
            builder.ToTable("PHOTOS");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id)
                .HasColumnName("PERSON_ID");
            builder.Property(x => x.Filename)
                .HasColumnName("FILENAME");
            builder.Property(x => x.Data)
                .HasColumnName("DATA");
        }
    }
}