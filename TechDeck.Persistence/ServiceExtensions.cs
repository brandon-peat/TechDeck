using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TechDeck.Core.People;
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
        }
    }
}
