using Microsoft.EntityFrameworkCore;
using GameScore.Dominio.Entidades;


namespace DataAccess.Contexto;

public class GameScoreContexto : DbContext
{
    private readonly DbContextOptions _options;
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Jogo> Jogos { get; set; }

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
            optionsBuilder.UseSqlite(@"Filename=./gamescore.sqlite;");
        //"Server=DESKTOP-58UEHOH\\SQLEXPRESS;database=;Trusted_Connection=True;TrustServerCertificated=True"
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UsuarioConfiguracoes());
        modelBuilder.ApplyConfiguration(new JogoConfiguracoes());
        
    }

}