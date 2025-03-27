using GameScore.Dominio.Entidades;


namespace GameScore.Repositorio
{
    public interface IUsuarioJogoRepositorio
    {
        public Task<IEnumerable<UsuarioJogo>> ListarAsync();

        public Task<UsuarioJogo> ObterAsync(int usuarioId, int jogoId);

        public Task<int> SalvarAsync(UsuarioJogo usuarioJogo);

        public Task AtualizarAsync(UsuarioJogo usuarioJogo);
        
        public Task RemoverAsync(int usuarioId, int jogoId);
    }
}