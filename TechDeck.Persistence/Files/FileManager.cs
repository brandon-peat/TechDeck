using Azure.Storage.Blobs;
using TechDeck.Core.Files;
using TechDeck.Core.People;

namespace TechDeck.Persistence.Files
{
    internal class FileManager(BlobServiceClient client) : IFileManager
    {
        public async Task<bool> CheckExists(
            string containerName,
            string fileName,
            CancellationToken cancellationToken)
        {
            var container = client.GetBlobContainerClient(containerName);

            var blobClient = container.GetBlobClient(fileName + ".jpeg");

            return await blobClient.ExistsAsync(cancellationToken: cancellationToken);
        }
        public async Task<Stream> DownloadFile(
            string containerName,
            string fileName,
            CancellationToken cancellationToken)
        {
            var container = client.GetBlobContainerClient(containerName);

            var blobClient = container.GetBlobClient(fileName + ".jpeg");

            var file = await blobClient.DownloadStreamingAsync(cancellationToken: cancellationToken);

            return file.Value.Content;
        }

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

            await blobClient.SetHttpHeadersAsync(new() { ContentType = "image/jpeg" }, cancellationToken: cancellationToken);
        }
    }
}
