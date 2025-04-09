using Microsoft.EntityFrameworkCore;
using GameScore.Dominio.Entidades;
using DataAccess.Configuracoes;


namespace DataAccess.Contexto;

public class GameScoreContexto : DbContext
{
    private readonly DbContextOptions _options;
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Jogo> Jogos { get; set; }
    public DbSet<UsuarioJogo> UsuarioJogos { get; set; }
    public DbSet<Comentario> Comentarios { get; set; }

    public GameScoreContexto()
    {

    }

    public GameScoreContexto(DbContextOptions options) : base(options)
    {
        _options = options;
    }

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.EnableSensitiveDataLogging();

    if (_options == null)
        optionsBuilder.UseSqlServer("Server=Magomayc\\SQLEXPRESS;Database=GameScoreDB;Trusted_Connection=True;TrustServerCertificate=True;");
 
}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UsuarioConfiguracoes());
        modelBuilder.ApplyConfiguration(new JogoConfiguracoes());
        modelBuilder.ApplyConfiguration(new UsuarioJogoConfiguracoes());
        modelBuilder.ApplyConfiguration(new ComentarioConfiguracoes());    
    }

}