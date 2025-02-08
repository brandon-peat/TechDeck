using Microsoft.Extensions.Azure;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using System.Text;
using TechDeck.Api.Transformers;
using TechDeck.Core;
using TechDeck.Identity;
using TechDeck.Identity.Models;
using TechDeck.Persistence;

var builder = WebApplication.CreateBuilder(args);

var allowAnyOrigin = "_allowAnyOrigin";

var jwtSettings = new JwtSettings(
    builder.Configuration["JwtToken:key"]!,
    builder.Configuration["JwtToken:issuer"]!,
    builder.Configuration["JwtToken:audience"]!,
    Convert.ToInt32(builder.Configuration["JwtToken:minutestoexpiration"]!));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi("v1", options => { options.AddDocumentTransformer<BearerSecuritySchemeTransformer>(); });

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: allowAnyOrigin,
        policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddCoreLayer();
builder.Services.AddPersistenceLayer(builder.Configuration);
builder.Services.AddIdentityLayer();

builder.Services.AddHttpContextAccessor();

builder.Services.AddSingleton(jwtSettings);
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = "JwtBearer";
        options.DefaultChallengeScheme = "JwtBearer";
    })
    .AddJwtBearer("JwtBearer", options =>
    {
        options.TokenValidationParameters = new()
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key)),
            ValidateIssuer = true,
            ValidIssuer = jwtSettings.Issuer,

            ValidateAudience = true,
            ValidAudience = jwtSettings.Audience,

            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromMinutes(jwtSettings.MinutesToExpiration)
        };
    });

builder.Services.AddAzureClients(clientBuilder =>
{
    clientBuilder.AddBlobServiceClient(builder.Configuration["StorageConnectionString:blobServiceUri"]!).WithName("Default");
    clientBuilder.AddQueueServiceClient(builder.Configuration["StorageConnectionString:queueServiceUri"]!).WithName("StorageConnectionString");
    clientBuilder.AddTableServiceClient(builder.Configuration["StorageConnectionString:tableServiceUri"]!).WithName("StorageConnectionString");
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
        options.WithHttpBearerAuthentication(bearer => bearer.Token = "your-bearer-token"));
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(allowAnyOrigin);

app.MapControllers();

app.Run();
