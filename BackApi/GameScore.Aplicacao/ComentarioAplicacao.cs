using GameScore.Dominio.Entidades;
using GameScore.Repositorio;

namespace GameScore.Aplicacao
{
    public class ComentarioAplicacao : IComentarioAplicacao
    {
        private readonly IComentarioRepositorio _comentarioRepositorio;

        public ComentarioAplicacao(IComentarioRepositorio comentarioRepositorio)
        {
            _comentarioRepositorio = comentarioRepositorio;
        }

        public async Task<List<Comentario>> ListarPorJogoAsync(int jogoId)
        {
            return await _comentarioRepositorio.ListarPorJogoAsync(jogoId);
        }

        public async Task CriarAsync(Comentario comentario)
        {
            if (string.IsNullOrEmpty(comentario.Texto))
            {
                throw new ArgumentException("Comentário não pode ser vazio.");
            }

            await _comentarioRepositorio.AdicionarAsync(comentario);
        }

        public async Task AtualizarAsync(Comentario comentario)
        {
            if (comentario.ID <= 0)
            {
                throw new ArgumentException("Comentário inválido.");
            }

            var comentarioExistente = await _comentarioRepositorio.ObterAsync(comentario.ID);
            if (comentarioExistente == null)
            {
                throw new KeyNotFoundException("Comentário não encontrado.");
            }

            comentarioExistente.Texto = comentario.Texto;

            await _comentarioRepositorio.AtualizarAsync(comentarioExistente);
        }
        public async Task<Comentario> ObterAsync(int comentarioId)
        {
            var comentario = await _comentarioRepositorio.ObterAsync(comentarioId);
            if (comentario == null)
            {
                throw new KeyNotFoundException("Comentário não encontrado.");
            }
            return comentario;
        }
    }
}
