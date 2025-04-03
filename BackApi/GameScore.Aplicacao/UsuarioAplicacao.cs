using GameScore.Dominio;
using GameScore.Dominio.Entidades;
using GameScore.Dominio.Enumeradores;
using GameScore.Repositorio;

namespace GameScore.Aplicacao
{

    public class UsuarioAplicacao : IUsuarioAplicacao
    {

        private readonly IUsuarioRepositorio _usuarioRepositorio;
        public UsuarioAplicacao(IUsuarioRepositorio usuarioRepositorio)
        {
            _usuarioRepositorio = usuarioRepositorio;
        }

        public async Task<int> CriarAsync(Usuario usuario){

            if(usuario == null ){
                throw new Exception("Usuário não pode ser vazio.");
            }

            ValidarInfomacoesUsuario(usuario);

            if(string.IsNullOrEmpty(usuario.Senha)){
                throw new Exception("Senha não pode ser vazia.");
            }

            return await _usuarioRepositorio.SalvarAsync(usuario);
        }


        public async Task AtualizarAsync(Usuario usuario)
        {

            var usuarioDominio = await _usuarioRepositorio.ObterAsync(usuario.ID);

            if (usuarioDominio == null)
            {
                throw new Exception("Usuário não encontrado.");
            }
            ValidarInfomacoesUsuario(usuario);

            usuarioDominio.Nome = usuario.Nome;
            usuarioDominio.Email = usuario.Email;
            usuarioDominio.TipoUsuarioId = usuario.TipoUsuarioId;

            await _usuarioRepositorio.AtualizarAsync(usuarioDominio);

        }

        public async Task AtualizarSenhaAsync(Usuario usuario, string senhaAntiga)
        {
            var usuarioDominio = await _usuarioRepositorio.ObterAsync(usuario.ID);

            if (usuarioDominio == null)
            {
                throw new Exception("Usuário não encontrado.");
            }

            if(usuarioDominio.Senha != senhaAntiga){
                throw new Exception("Senha Antiga é inválida.");
            }

            if (string.IsNullOrEmpty(usuario.Senha) ){
                throw new Exception("Senha não pode ser vazia");

            }

            usuarioDominio.Senha = usuario.Senha;            

            await _usuarioRepositorio.AtualizarAsync(usuarioDominio);
        }

        public async Task<Usuario> ObterAsync (int usuarioId){
            var usuarioDominio = await _usuarioRepositorio.ObterAsync(usuarioId);

            if(usuarioDominio == null){
                throw new Exception("Usuario não encontrado");
            }

            return usuarioDominio;
        }

        public async Task<Usuario> ObterPorEmailAsync (string email){
            var usuarioDominio = await _usuarioRepositorio.ObterPeloEmailAsync(email);

            if(usuarioDominio == null){
                throw new Exception("Usuario não encontrado");
            }

            return usuarioDominio;
        }

        public async Task DeletarAsync ( int usuarioId){
            var usuarioDominio = await _usuarioRepositorio.ObterAsync(usuarioId);

            if(usuarioDominio == null){
                throw new Exception("Usuário não encontrado");
            }
            usuarioDominio.Deletar();

            await _usuarioRepositorio.AtualizarAsync(usuarioDominio);
        }

        public async Task RestaurarAsync(int usuarioId){
            var usuarioDominio = await _usuarioRepositorio.ObterUsuarioDesativadoAsync(usuarioId);

            if(usuarioDominio == null){
                throw new Exception("Usuário não encontrado");
            }

            usuarioDominio.Restaurar();

            await _usuarioRepositorio.AtualizarAsync(usuarioDominio);
        }

        public async Task<IEnumerable<Usuario>> ListarAsync(bool ativo, string query){
            if (query == null){
                query ="";
            }
            return await _usuarioRepositorio.ListarAsync(ativo, query);
        }

        public IEnumerable<object> ListarTiposUsuario(){

            var nomesEnum = Enum.GetNames(typeof(TipoUsuarios));
            var valoresEnum = (int[]) Enum.GetValues(typeof(TipoUsuarios));

            List<object> objetosTipoUsuarioEnum= new List<object>();

            for (int i = 0; i < valoresEnum.Length  ; i++)
            {
                objetosTipoUsuarioEnum.Add( new {
                    id = valoresEnum[i] ,
                    nome = nomesEnum[i]
                });
            }

            return objetosTipoUsuarioEnum;
        }

        #region Util

        private static void ValidarInfomacoesUsuario(Usuario usuario)
        {
            if (string.IsNullOrEmpty(usuario.Nome))
            {
                throw new Exception("Nome não pode ser vazio.");
            }

            if (string.IsNullOrEmpty(usuario.Email))
            {
                throw new Exception("E-mail não pode ser vazio.");
            }
            var valoresEnum = (int[]) Enum.GetValues(typeof(TipoUsuarios));

            if (!valoresEnum.Contains(usuario.TipoUsuarioId)){
                throw new Exception("Tipo Usuário não existe");
            }
        }

        #endregion
    }


}