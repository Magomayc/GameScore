using GameScore.Dominio.Entidades;

namespace GameScore.Repositorio
{
    public interface IComentarioRepositorio
    {
        Task<Comentario> AdicionarAsync(Comentario comentario); 
        Task<List<Comentario>> ListarPorJogoAsync(int jogoId); 
        Task<Comentario> SalvarAsync(Comentario comentario); 
        Task<Comentario> AtualizarAsync(Comentario comentario); 
        Task<Comentario> ObterAsync(int comentarioId); 
        Task<bool> RemoverAsync(int comentarioId); 
    }
}