using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GameScore.Dominio.Entidades;

namespace DataAccess.Configuracoes;

public class ComentarioConfiguracoes : IEntityTypeConfiguration<Comentario>
{
    public void Configure(EntityTypeBuilder<Comentario> builder)
    {
        builder.ToTable("Comentarios");

        builder.HasKey(c => c.ID);

        builder.Property(c => c.ID).HasColumnName("ID");
        builder.Property(c => c.UsuarioId).HasColumnName("UsuarioID").IsRequired();
        builder.Property(c => c.JogoId).HasColumnName("JogoID").IsRequired();
        builder.Property(c => c.Texto).HasColumnName("Texto").IsRequired().HasMaxLength(1000);
        builder.Property(c => c.DataCriacao).HasColumnName("DataCriacao").IsRequired();

        builder
            .HasOne(c => c.Usuario)
            .WithMany(u => u.Comentarios) 
            .HasForeignKey(c => c.UsuarioId)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasOne(c => c.Jogo)
            .WithMany(j => j.Comentarios)
            .HasForeignKey(c => c.JogoId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
