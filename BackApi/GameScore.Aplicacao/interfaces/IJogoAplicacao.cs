using GameScore.Dominio.Entidades;

namespace GameScore.Aplicacao
{
    public interface IJogoAplicacao
    {
        
        public Task<int> CriarAsync(Jogo jogo);
        
        public Task AtualizarAsync(Jogo jogo);

        public Task<Jogo> ObterAsync (int jogoId);

        public Task DeletarAsync (int jogoId);

        public Task RestaurarAsync(int jogoId);
        
        public Task<IEnumerable<Jogo>> ListarAsync(bool ativo, string query);

    }
}