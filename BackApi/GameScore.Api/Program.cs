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

// Adicionar aplicações.
builder.Services.AddScoped<IUsuarioAplicacao, UsuarioAplicacao>();
builder.Services.AddScoped<IJogoAplicacao, JogoAplicacao>();
builder.Services.AddScoped<IUsuarioJogoAplicacao, UsuarioJogoAplicacao>();


// Adicionar interfaces de repositório
builder.Services.AddScoped<IUsuarioRepositorio, UsuarioRepositorio>();
builder.Services.AddScoped<IJogoRepositorio,JogoRepositorio>();
builder.Services.AddScoped<IUsuarioJogoRepositorio, UsuarioJogoRepositorio>();

// Adicionar serviços


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


// Add db service

builder.Services.AddDbContext<GameScoreContexto>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
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