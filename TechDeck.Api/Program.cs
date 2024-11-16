using TechDeck.Core;
using TechDeck.Persistence;

var builder = WebApplication.CreateBuilder(args);

var allowAnyOrigin = "_allowAnyOrigin";

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: allowAnyOrigin,
        policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddCoreLayer();
builder.Services.AddPersistenceLayer(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(allowAnyOrigin);

app.MapControllers();

app.Run();
