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
        builder.Property(jogo => jogo.Imagem).HasColumnName("Imagem");
        builder.Property(usuario => usuario.Ativo).HasColumnName("Ativo");
        
        builder.Property(jogo => jogo.Imagem)
            .HasColumnName("Imagem")
            .HasMaxLength(300)
            .IsRequired(false);

        builder
            .HasMany(jogo => jogo.UsuarioJogos) 
            .WithOne(uj => uj.Jogo) 
            .HasForeignKey(uj => uj.JogoID); 
    }
}