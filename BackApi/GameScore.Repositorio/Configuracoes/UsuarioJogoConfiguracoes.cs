using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GameScore.Dominio.Entidades;

namespace DataAccess.Configuracoes;

class UsuarioJogoConfiguracoes : IEntityTypeConfiguration<UsuarioJogo>
{
    public void Configure(EntityTypeBuilder<UsuarioJogo> builder)
    {
        // Definir chave composta
        builder.HasKey(uj => new { uj.UsuarioID, uj.JogoID });

        // Configurar relacionamento com Usuario
        builder
            .HasOne(uj => uj.Usuario)
            .WithMany(u => u.UsuarioJogos)
            .HasForeignKey(uj => uj.UsuarioID);

        // Configurar relacionamento com Jogo
        builder
            .HasOne(uj => uj.Jogo)
            .WithMany(j => j.UsuarioJogos)
            .HasForeignKey(uj => uj.JogoID);

        // Opcional: Configurar nome da tabela no banco
        builder.ToTable("UsuarioJogo");
    }
}
