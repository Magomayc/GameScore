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
            if (string.IsNullOrWhiteSpace(comentario.Texto))
                throw new ArgumentException("Comentário não pode ser vazio.");

            if (comentario.UsuarioId <= 0 || comentario.JogoId <= 0)
                throw new ArgumentException("Usuário ou Jogo inválido.");

            await _comentarioRepositorio.AdicionarAsync(comentario);
        }

        public async Task AtualizarAsync(Comentario comentario)
        {
            if (comentario.ID <= 0)
                throw new ArgumentException("Comentário inválido.");

            var comentarioExistente = await _comentarioRepositorio.ObterAsync(comentario.ID);
            if (comentarioExistente == null)
                throw new KeyNotFoundException("Comentário não encontrado.");

            if (string.IsNullOrWhiteSpace(comentario.Texto))
                throw new ArgumentException("Texto do comentário não pode ser vazio.");

            comentarioExistente.Texto = comentario.Texto;

            await _comentarioRepositorio.AtualizarAsync(comentarioExistente);
        }

        public async Task<Comentario> ObterAsync(int comentarioId)
        {
            var comentario = await _comentarioRepositorio.ObterAsync(comentarioId);
            if (comentario == null)
                throw new KeyNotFoundException("Comentário não encontrado.");

            return comentario;
        }

        public async Task RemoverAsync(int comentarioId)
        {
            var comentario = await _comentarioRepositorio.ObterAsync(comentarioId);
            if (comentario == null)
                throw new KeyNotFoundException("Comentário não encontrado.");

            var sucesso = await _comentarioRepositorio.RemoverAsync(comentarioId);
            if (!sucesso)
                throw new Exception("Erro ao remover o comentário.");
        }
    }
}
