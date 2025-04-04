namespace GameScore.Api.Models.Resposta
{
    public class JogoResposta
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Genero { get; set; }
        public string Descricao { get; set; }
        public bool Ativo { get; set; }
    }
}