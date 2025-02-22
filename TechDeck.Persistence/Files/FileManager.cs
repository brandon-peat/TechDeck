using Azure.Storage.Blobs;
using TechDeck.Core.Files;

namespace TechDeck.Persistence.Files
{
    internal class FileManager(BlobServiceClient client) : IFileManager
    {
        public async Task UploadFile(
            string containerName,
            string fileName,
            Stream stream,
            CancellationToken cancellationToken)
        {
            var container = client.GetBlobContainerClient(containerName);

            await container.CreateIfNotExistsAsync(cancellationToken: cancellationToken);

            var blobClient = container.GetBlobClient(fileName);

            await blobClient.UploadAsync(stream, overwrite: true, cancellationToken: cancellationToken);
        }
    }
}
