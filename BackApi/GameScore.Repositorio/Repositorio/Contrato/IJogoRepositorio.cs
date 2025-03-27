using GameScore.Dominio.Entidades;

namespace GameScore.Repositorio;

public interface IJogoRepositorio
{
    public Task AtualizarAsync(Jogo jogo);

    public Task<IEnumerable<Jogo>> ListarAsync(bool ativo,  string query);

    public Task<Jogo> ObterAsync(int jogoId);

    public Task<Jogo> ObterJogoDesativadoAsync(int jogoId);
    
    public Task<int> SalvarAsync(Jogo jogo);
}