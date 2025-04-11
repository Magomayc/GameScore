using DataAccess.Contexto;
using Microsoft.EntityFrameworkCore;
using GameScore.Dominio.Entidades;
using GameScore.Repositorio;

namespace DataAccess.Repositorio 

{
    public class UsuarioRepositorio : BaseRepositorio, IUsuarioRepositorio 
    {
        public UsuarioRepositorio(GameScoreContexto contexto): base(contexto){

        }

        public async Task AtualizarAsync(Usuario usuario)
        {
            _contexto.Usuarios.Update(usuario);
            await _contexto.SaveChangesAsync();
        }

        public async Task<IEnumerable<Usuario>> ListarAsync(bool ativo, string query)
        {
            query = query?.Trim() ?? "";

            return await _contexto.Usuarios
                .Where(u => u.Ativo == ativo && EF.Functions.Like(u.Nome, $"%{query}%"))
                .OrderBy(u => u.Nome)
                .ToListAsync();
        }

        public async Task<Usuario> ObterAsync(int usuarioId)
        {
            return await _contexto.Usuarios.Where(u=>u.ID == usuarioId)
                                     .Where(u=> u.Ativo)
                                     .FirstOrDefaultAsync();
        }

        public async Task<Usuario> ObterUsuarioDesativadoAsync(int usuarioId)
        {
            return await _contexto.Usuarios.Where(u=>u.ID == usuarioId)
                                     .Where(u=> !u.Ativo)
                                     .FirstOrDefaultAsync();
        }

        public async Task<Usuario> ObterPeloEmailAsync(string email)
        {
            return await _contexto.Usuarios.Where(u => u.Email == email)
                                     .Where(u=> u.Ativo)
                                     .FirstOrDefaultAsync();
        }

        public async Task<int> SalvarAsync(Usuario usuario)
        {
            await _contexto.Usuarios.AddAsync(usuario);
            await _contexto.SaveChangesAsync();
            return usuario.ID;
        }
        public async Task<Usuario> ObterPorEmailAsync(string email)
        {
            return await _contexto.Usuarios
            .FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}