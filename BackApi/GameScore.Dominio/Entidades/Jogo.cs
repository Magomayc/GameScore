namespace GameScore.Dominio.Entidades;

public class Jogo
{
    public int ID { get; set; }
    public string Nome { get; set; }
    public string Genero { get; set; }
    public string Descricao { get; set; }
    public List<UsuarioJogo> UsuarioJogos { get; set; }
}