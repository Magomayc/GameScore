using GameScore.Dominio.Entidades;
using GameScore.Repositorio;


namespace GameScore.Aplicacao
{
    public class JogoAplicacao : IJogoAplicacao
    {
        private readonly IJogoRepositorio _jogoRepositorio;

        public JogoAplicacao(IJogoRepositorio jogoRepositorio)
        {
            _jogoRepositorio = jogoRepositorio;
        }

        public async Task<int> CriarAsync(Jogo jogo)
        {
            if (jogo == null)
            {
                throw new Exception("Jogo não pode ser vazio.");
            }

            ValidarInformacoesJogo(jogo);
            return await _jogoRepositorio.SalvarAsync(jogo);
        }

        public async Task AtualizarAsync(Jogo jogo)
        {
            var jogoDominio = await _jogoRepositorio.ObterAsync(jogo.ID);

            if (jogoDominio == null)
            {
                throw new Exception("Jogo não encontrado.");
            }

            ValidarInformacoesJogo(jogo);
            jogoDominio.Nome = jogo.Nome;
            jogoDominio.Descricao = jogo.Descricao;
            jogoDominio.Genero = jogo.Genero;
            
            await _jogoRepositorio.AtualizarAsync(jogoDominio);
        }

        public async Task<Jogo> ObterAsync(int jogoId)
        {
            var jogo = await _jogoRepositorio.ObterAsync(jogoId);
            if (jogo == null)
            {
                throw new Exception("Jogo não encontrado.");
            }
            return jogo;
        }

        public async Task DeletarAsync(int jogoId)
        {
            var jogo = await _jogoRepositorio.ObterAsync(jogoId);
            if (jogo == null)
            {
                throw new Exception("Jogo não encontrado.");
            }
            jogo.Ativo = false;
            await _jogoRepositorio.AtualizarAsync(jogo);
        }

        public async Task RestaurarAsync(int jogoId)
        {
            var jogo = await _jogoRepositorio.ObterJogoDesativadoAsync(jogoId);
            if (jogo == null)
            {
                throw new Exception("Jogo não encontrado.");
            }
            jogo.Ativo = true;
            await _jogoRepositorio.AtualizarAsync(jogo);
        }

        public async Task<IEnumerable<Jogo>> ListarAsync(bool ativo, string query)
        {
            return await _jogoRepositorio.ListarAsync(ativo, query ?? "");
        }

        #region Util

        private static void ValidarInformacoesJogo(Jogo jogo)
        {
            if (string.IsNullOrEmpty(jogo.Nome))
            {
                throw new Exception("Nome do jogo não pode ser vazio.");
            }
            if (string.IsNullOrEmpty(jogo.Descricao))
            {
                throw new Exception("Descrição do jogo não pode ser vazia.");
            }
            if (string.IsNullOrEmpty(jogo.Genero))
            {
                throw new Exception("Gênero do jogo não pode ser vazio.");
            }
        }

        #endregion
    }
}