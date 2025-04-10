using GameScore.Dominio.Entidades;

namespace GameScore.Aplicacao
{
    public interface IComentarioAplicacao
    {
        Task<List<Comentario>> ListarPorJogoAsync(int jogoId);
        Task CriarAsync(Comentario comentario);
        Task AtualizarAsync(Comentario comentario);
        Task<Comentario> ObterAsync(int comentarioId);
        Task RemoverAsync(int comentarioId);
    }
}
