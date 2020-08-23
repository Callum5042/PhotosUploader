namespace PhotosUploader.Models
{
    public class Photo
    {
        public int Id { get; protected set; }

        public string Filename { get; set; }

        public byte[] Data { get; set; }

        public bool? IsPrimary { get; set; }

        public string Notes { get; set; }
    }
}
