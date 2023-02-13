using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace TheEncoreAgenda.Utils
{
    public class AzureBlob
    {
        private readonly string _connectionString = "DefaultEndpointsProtocol=https;AccountName=encorestorage;AccountKey=A+uN8BgAQ3MXPtQr9vLLbQ8MNm+Z06l1Dlz2uSfeIOGvU9wtu1eFmiO+NzrY6fjctwFkljshb8rw+ASt3FParg==;EndpointSuffix=core.windows.net";
        private readonly string _containerName = "audiocontainer";
        private readonly BlobServiceClient _blobService;
        BlobContainerClient _blobContainer;

        public AzureBlob()
        {
            _blobService = new BlobServiceClient(_connectionString);
        }

        public async Task<string?> Upload(IFormFile file)
        {
            if(file.Length > 0)
            {
                string fileName = Path.GetFileName(file.FileName);
                string fileType = Path.GetExtension(fileName);
                string newFileName = String.Concat(Convert.ToString(Guid.NewGuid()), fileType);

                _blobContainer = _blobService.GetBlobContainerClient(_containerName);
                await _blobContainer.CreateIfNotExistsAsync();
                _blobContainer.SetAccessPolicy(PublicAccessType.BlobContainer);

                BlobClient blobClient = _blobContainer.GetBlobClient(newFileName);

                try
                {
                    using Stream stream = file.OpenReadStream();
                    await blobClient.UploadAsync(stream);

                    string fileURL = blobClient.Uri.AbsoluteUri;

                    return fileURL;
                } 
                catch(Exception e)
                {
                    Console.WriteLine(e.Message);
                    return null;
                }

            }
            return null;
        }
    }
}
