using Microsoft.EntityFrameworkCore;
using System.Reflection;
using TechDeck.Core.People;

namespace TechDeck.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public required DbSet<Person> People { get; set; }
        public required DbSet<Post> Post { get; set; }
        public required DbSet<Like> Like { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
