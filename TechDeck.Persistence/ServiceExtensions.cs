using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TechDeck.Core.Files;
using TechDeck.Core.People;
using TechDeck.Persistence.Files;
using TechDeck.Persistence.Repositories;

namespace TechDeck.Persistence
{
    public static class ServiceExtensions
    {
        public static void AddPersistenceLayer(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>((services, options) =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DatabaseConnection"));
            });

            services.AddTransient<IPersonRepository, PersonRepository>();
            services.AddTransient<IPostRepository, PostRepository>();
            services.AddTransient<ILikeRepository, LikeRepository>();
            services.AddTransient<IReplyRepository, ReplyRepository>();

            services.AddTransient<IFileManager, FileManager>();
        }
    }
}
