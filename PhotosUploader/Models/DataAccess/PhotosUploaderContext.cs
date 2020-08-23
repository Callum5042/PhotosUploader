using Microsoft.EntityFrameworkCore;

namespace PhotosUploader.Models.DataAccess
{
    public class PhotosUploaderContext : DbContext
    {
        public PhotosUploaderContext(DbContextOptions options) : base(options) { }

        public virtual DbSet<Person> People { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
        }
    }
}
