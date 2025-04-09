namespace GameScore.Api.Models.Requisicao
{
    public class ComentarioCriar
    {
        public int UsuarioId { get; set; }

        public int JogoId { get; set; }

        public string Texto { get; set; }
    }
}