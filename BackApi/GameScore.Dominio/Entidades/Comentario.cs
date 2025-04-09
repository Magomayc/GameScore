namespace GameScore.Dominio.Entidades;

public class Comentario
{
    public int ID { get; set; }
    public int UsuarioId { get; set; }
    public int JogoId { get; set; }
    public string Texto { get; set; }
    public DateTime DataCriacao { get; set; }
    public virtual Usuario Usuario { get; set; }
    public virtual Jogo Jogo { get; set; }

}