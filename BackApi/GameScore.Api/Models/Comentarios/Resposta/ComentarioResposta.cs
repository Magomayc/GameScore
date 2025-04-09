using System;

namespace GameScore.Api.Models.Resposta
{
    public class ComentarioResposta
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; } 
        public string UsuarioNome { get; set; }
        public string Texto { get; set; }
        public DateTime DataCriacao { get; set; }
    }
}