using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GameScore.Dominio.Entidades;

namespace DataAccess.Configuracoes;

class UsuarioConfiguracoes : IEntityTypeConfiguration<Usuario>
{
    public void Configure(EntityTypeBuilder<Usuario> builder)
    {
        builder.HasKey(usuario => usuario.ID);

        builder.Property(usuario => usuario.ID).HasColumnName("ID");
        builder.Property(usuario => usuario.Nome).HasColumnName("Nome").IsRequired();
        builder.Property(usuario => usuario.Email).HasColumnName("Email").IsRequired();
        builder.Property(usuario => usuario.Senha).HasColumnName("Senha").IsRequired();
        builder.Property(usuario => usuario.TipoUsuarioId).HasColumnName("TipoUsuarioId").IsRequired();
        builder.Property(usuario => usuario.Ativo).HasColumnName("Ativo");
    }
}