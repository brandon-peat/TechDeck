namespace TechDeck.Core.Files
{
    public interface IFileManager
    {
        Task<bool> CheckExists(
            string containerName,
            string fileName,
            CancellationToken cancellationToken);

        Task<Stream> DownloadFile(
            string containerName,
            string fileName,
            CancellationToken cancellationToken);

        Task UploadFile(
            string containerName,
            string fileName,
            Stream stream,
            CancellationToken cancellationToken);
    }
}
