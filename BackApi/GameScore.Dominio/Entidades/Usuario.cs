namespace GameScore.Dominio.Entidades;

public class Usuario
{
    public int ID { get; set; }
    public string Nome { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; }
    public int TipoUsuarioId { get; set; }
    public string Imagem { get; set; }
    public bool Ativo { get; set; } 
    public List<UsuarioJogo> UsuarioJogos { get; set; }
    public virtual ICollection<Comentario> Comentarios { get; set; } = new List<Comentario>();

    public Usuario()
    {
        Ativo = true;
    }

    public void Deletar()
    {
        Ativo = false;
    }

    public void Restaurar()
    {
        Ativo = true;
    }
}