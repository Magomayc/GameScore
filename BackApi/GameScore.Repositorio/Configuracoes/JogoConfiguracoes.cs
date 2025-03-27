using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GameScore.Dominio.Entidades;

namespace DataAccess.Configuracoes;

class JogoConfiguracoes : IEntityTypeConfiguration<Jogo>
{
    public void Configure(EntityTypeBuilder<Jogo> builder)
    {
        builder.HasKey(jogo => jogo.ID);

        builder.Property(jogo => jogo.ID).HasColumnName("ID");
        builder.Property(jogo => jogo.Nome).HasColumnName("Nome").IsRequired();
        builder.Property(jogo => jogo.Genero).HasColumnName("Genero").IsRequired();
        builder.Property(jogo => jogo.Descricao).HasColumnName("Descricao").IsRequired();
        builder.Property(usuario => usuario.Ativo).HasColumnName("Ativo");

        builder
            .HasMany(jogo => jogo.UsuarioJogos) // Jogo tem muitos UsuarioJogo
            .WithOne(uj => uj.Jogo) // UsuarioJogo tem um Jogo
            .HasForeignKey(uj => uj.JogoID); // Chave estrangeira de UsuarioJogo
    }
}