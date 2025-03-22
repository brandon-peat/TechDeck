using MediatR;
using TechDeck.Core.Files;

namespace TechDeck.Core.People
{
    public record GetProfilePictureQuery(int UserId) : IRequest<ProfilePictureResult>;

    public record ProfilePictureResult(bool Exists, Stream? Content);

    public class GetProfilePictureQueryHandler(IFileManager fileManager) 
        : IRequestHandler<GetProfilePictureQuery, ProfilePictureResult>
    {
        public async Task<ProfilePictureResult> Handle(GetProfilePictureQuery request, CancellationToken cancellationToken)
        {
            var fileName = request.UserId.ToString();
            if (await fileManager.CheckExists("profile-pictures", fileName, cancellationToken))
            {
                var content = await fileManager.DownloadFile("profile-pictures", fileName, cancellationToken);
                return new ProfilePictureResult(true, content);
            }
            
            return new ProfilePictureResult(false, null);
        }
    }
} 