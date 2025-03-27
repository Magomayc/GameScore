using GameScore.Dominio.Entidades;

namespace GameScore.Repositorio;

public interface IUsuarioRepositorio
{
    public Task AtualizarAsync(Usuario usuario);

    public Task<IEnumerable<Usuario>> ListarAsync(bool ativo,  string query);

    public Task<Usuario> ObterAsync(int usuarioId);

    public Task<Usuario> ObterUsuarioDesativadoAsync(int usuarioId);

    public Task<Usuario> ObterPeloEmailAsync(string email);
    
    public Task<int> SalvarAsync(Usuario usuario);
}