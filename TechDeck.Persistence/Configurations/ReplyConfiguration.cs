using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TechDeck.Core.People;

namespace TechDeck.Persistence.Configurations
{
    public class ReplyConfiguration : IEntityTypeConfiguration<Reply>
    {
        public void Configure(EntityTypeBuilder<Reply> builder)
        {
            builder.ToTable("Reply", "Person");
            builder.HasKey(reply => reply.Id);
        }
    }
}
