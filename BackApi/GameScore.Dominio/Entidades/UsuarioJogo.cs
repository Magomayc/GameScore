namespace GameScore.Dominio.Entidades;

public class UsuarioJogo
{
    public int UsuarioID { get; set; }
    public Usuario Usuario { get; set; }
    public int JogoID { get; set; }
    public Jogo Jogo { get; set; }
       
}