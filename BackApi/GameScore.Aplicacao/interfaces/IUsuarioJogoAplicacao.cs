using GameScore.Dominio.Entidades;

namespace GameScore.Aplicacao
{
    public interface IUsuarioJogoAplicacao
    {
        Task<int> CriarAsync(UsuarioJogo usuarioJogo);

        Task AtualizarAsync(UsuarioJogo usuarioJogo);

        Task<UsuarioJogo> ObterAsync(int usuarioId, int jogoId);

        Task RemoverAsync(int usuarioId, int jogoId);
        
        Task<IEnumerable<UsuarioJogo>> ListarAsync();
    }
}