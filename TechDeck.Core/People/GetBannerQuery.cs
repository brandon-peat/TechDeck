using MediatR;
using TechDeck.Core.Files;

namespace TechDeck.Core.People
{
    public record GetBannerQuery(int UserId) : IRequest<BannerResult>;

    public record BannerResult(bool Exists, Stream? Content);

    public class GetBannerQueryHandler(IFileManager fileManager) 
        : IRequestHandler<GetBannerQuery, BannerResult>
    {
        public async Task<BannerResult> Handle(GetBannerQuery request, CancellationToken cancellationToken)
        {
            var fileName = request.UserId.ToString();
            if (await fileManager.CheckExists("banners", fileName, cancellationToken))
            {
                var content = await fileManager.DownloadFile("banners", fileName, cancellationToken);
                return new BannerResult(true, content);
            }
            
            return new BannerResult(false, null);
        }
    }
} 