using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GameScore.Dominio.Entidades;

namespace DataAccess.Configuracoes;

class UsuarioJogoConfiguracoes : IEntityTypeConfiguration<UsuarioJogo>
{
    public void Configure(EntityTypeBuilder<UsuarioJogo> builder)
    {
        builder.HasKey(uj => new { uj.UsuarioID, uj.JogoID });

        builder
            .HasOne(uj => uj.Usuario)
            .WithMany(u => u.UsuarioJogos)
            .HasForeignKey(uj => uj.UsuarioID);

        builder
            .HasOne(uj => uj.Jogo)
            .WithMany(j => j.UsuarioJogos)
            .HasForeignKey(uj => uj.JogoID);

        builder.ToTable("UsuarioJogo");
    }
}
