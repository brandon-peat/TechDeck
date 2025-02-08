namespace TechDeck.Core.Files
{
    public interface IFileManager
    {
        Task UploadFile(
            string containerName,
            string fileName,
            Stream stream,
            CancellationToken cancellationToken);
    }
}
