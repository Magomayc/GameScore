using GameScore.Dominio.Entidades;

namespace GameScore.Dominio
{
    public interface IUsuarioAplicacao
    {
        
        public Task<int> CriarAsync(Usuario usuario);

        public Task AtualizarAsync(Usuario usuario);

        public Task AtualizarSenhaAsync(Usuario usuario, string senhaAntiga);

        public Task<Usuario> ObterAsync (int usuarioId);

        public Task<Usuario> ObterPorEmailAsync (string email);

        public Task DeletarAsync ( int usuarioId);

        public Task RestaurarAsync(int usuarioId);
        
        public Task<IEnumerable<Usuario>> ListarAsync(bool ativo, string query);

        public IEnumerable<object> ListarTiposUsuario();

    }
}