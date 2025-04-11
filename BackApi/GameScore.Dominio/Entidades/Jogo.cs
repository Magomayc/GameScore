namespace GameScore.Dominio.Entidades;

public class Jogo
{
    public int ID { get; set; }
    public string Nome { get; set; }
    public string Genero { get; set; }
    public string Descricao { get; set; }
    public string Imagem { get; set; }
    public bool Ativo { get; set; }
    public List<UsuarioJogo> UsuarioJogos { get; set; }
    public virtual ICollection<Comentario> Comentarios { get; set; } = new List<Comentario>();
    public Jogo()
    {
        Ativo = true;
    }
}