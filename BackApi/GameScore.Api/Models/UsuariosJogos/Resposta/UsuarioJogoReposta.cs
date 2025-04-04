namespace GameScore.Api.Models.Resposta
{
    public class UsuarioJogoResposta
    {
        public int UsuarioId { get; set; }
        public int JogoId { get; set; }
        public string UsuarioNome { get; set; }
        public string JogoNome { get; set; }
    }
}