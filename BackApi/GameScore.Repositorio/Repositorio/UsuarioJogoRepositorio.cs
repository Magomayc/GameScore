using DataAccess.Contexto;
using Microsoft.EntityFrameworkCore;
using GameScore.Dominio.Entidades;
using GameScore.Repositorio;
using System.Data;

namespace DataAccess.Repositorio
{
    public class UsuarioJogoRepositorio : BaseRepositorio, IUsuarioJogoRepositorio
    {
        public UsuarioJogoRepositorio(GameScoreContexto contexto) : base(contexto)
        {
        }
        public async Task<IEnumerable<UsuarioJogo>> ListarAsync()
        {
            return await _contexto.UsuarioJogos
                .Include(uj => uj.Usuario)
                .Include(uj => uj.Jogo)
                .ToListAsync();
        }

        public async Task<UsuarioJogo> ObterAsync(int usuarioId, int jogoId)
        {
            return await _contexto.UsuarioJogos
                .Include(uj => uj.Usuario)
                .Include(uj => uj.Jogo)
                .FirstOrDefaultAsync(uj => uj.UsuarioID == usuarioId && uj.JogoID == jogoId);
        }

        public async Task<int> SalvarAsync(UsuarioJogo usuarioJogo)
        {
            await _contexto.UsuarioJogos.AddAsync(usuarioJogo);
            await _contexto.SaveChangesAsync();
            return usuarioJogo.UsuarioID;
        }

        public async Task AtualizarAsync(UsuarioJogo usuarioJogo)
        {
            _contexto.UsuarioJogos.Update(usuarioJogo);
            await _contexto.SaveChangesAsync();
        }

        public async Task RemoverAsync(int usuarioId, int jogoId)
        {
            var usuarioJogo = await ObterAsync(usuarioId, jogoId);
            if (usuarioJogo != null)
            {
                _contexto.UsuarioJogos.Remove(usuarioJogo);
                await _contexto.SaveChangesAsync();
            }
        }
    }
}