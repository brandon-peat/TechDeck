using Microsoft.IdentityModel.Tokens;
using System.Text;
using TechDeck.Core;
using TechDeck.Identity;
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
builder.Services.AddSwaggerGen();

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

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(allowAnyOrigin);

app.MapControllers();

app.Run();
