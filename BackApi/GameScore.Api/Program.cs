using DataAccess.Contexto;
using DataAccess.Repositorio;
using Microsoft.EntityFrameworkCore;
using GameScore.Aplicacao;
using GameScore.Dominio;
using GameScore.Repositorio;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IUsuarioAplicacao, UsuarioAplicacao>();
builder.Services.AddScoped<IJogoAplicacao, JogoAplicacao>();
builder.Services.AddScoped<IUsuarioJogoAplicacao, UsuarioJogoAplicacao>();
builder.Services.AddScoped<IComentarioAplicacao, ComentarioAplicacao>();


builder.Services.AddScoped<IUsuarioRepositorio, UsuarioRepositorio>();
builder.Services.AddScoped<IJogoRepositorio,JogoRepositorio>();
builder.Services.AddScoped<IUsuarioJogoRepositorio, UsuarioJogoRepositorio>();
builder.Services.AddScoped<IComentarioRepositorio, ComentarioRepositorio>();


builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5173")
        .SetIsOriginAllowedToAllowWildcardSubdomains()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});



builder.Services.AddDbContext<GameScoreContexto>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();