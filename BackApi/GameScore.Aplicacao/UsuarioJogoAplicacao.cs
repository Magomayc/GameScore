using GameScore.Dominio.Entidades;
using GameScore.Repositorio;

namespace GameScore.Aplicacao
{
    public class UsuarioJogoAplicacao : IUsuarioJogoAplicacao
    {
        private readonly IUsuarioJogoRepositorio _usuarioJogoRepositorio;

        public UsuarioJogoAplicacao(IUsuarioJogoRepositorio usuarioJogoRepositorio)
        {
            _usuarioJogoRepositorio = usuarioJogoRepositorio;
        }

        public async Task<int> CriarAsync(UsuarioJogo usuarioJogo)
        {
            if (usuarioJogo == null)
            {
                throw new Exception("UsuárioJogo não pode ser nulo.");
            }

            return await _usuarioJogoRepositorio.SalvarAsync(usuarioJogo);
        }

        public async Task AtualizarAsync(UsuarioJogo usuarioJogo)
        {
            var usuarioJogoDominio = await _usuarioJogoRepositorio.ObterAsync(usuarioJogo.UsuarioID, usuarioJogo.JogoID);

            if (usuarioJogoDominio == null)
            {
                throw new Exception("Relação Usuário-Jogo não encontrada.");
            }

            await _usuarioJogoRepositorio.AtualizarAsync(usuarioJogo);
        }

        public async Task<UsuarioJogo> ObterAsync(int usuarioId, int jogoId)
        {
            var usuarioJogo = await _usuarioJogoRepositorio.ObterAsync(usuarioId, jogoId);
            if (usuarioJogo == null)
            {
                throw new Exception("Relação Usuário-Jogo não encontrada.");
            }
            return usuarioJogo;
        }

        public async Task RemoverAsync(int usuarioId, int jogoId)
        {
            var usuarioJogo = await _usuarioJogoRepositorio.ObterAsync(usuarioId, jogoId);
            if (usuarioJogo == null)
            {
                throw new Exception("Relação Usuário-Jogo não encontrada.");
            }
            await _usuarioJogoRepositorio.RemoverAsync(usuarioId, jogoId);
        }

        public async Task<IEnumerable<UsuarioJogo>> ListarAsync()
        {
            return await _usuarioJogoRepositorio.ListarAsync();
        }
    }
}