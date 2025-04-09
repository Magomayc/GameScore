using DataAccess.Contexto;
using Microsoft.EntityFrameworkCore;
using GameScore.Dominio.Entidades;
using GameScore.Repositorio;

namespace DataAccess.Repositorio
{
    public class ComentarioRepositorio : BaseRepositorio, IComentarioRepositorio
    {
        public ComentarioRepositorio(GameScoreContexto contexto) : base(contexto) { }

        public async Task<List<Comentario>> ListarPorJogoAsync(int jogoId)
        {
            return await _contexto.Comentarios
                .Include(c => c.Usuario) 
                .Where(c => c.JogoId == jogoId && c.Jogo.Ativo && c.Usuario.Ativo) 
                .OrderByDescending(c => c.DataCriacao) 
                .ToListAsync();
        }

        public async Task<Comentario> AdicionarAsync(Comentario comentario)
        {
            comentario.DataCriacao = DateTime.UtcNow; 
            _contexto.Comentarios.Add(comentario); 
            await _contexto.SaveChangesAsync();
            return comentario;
        }
        public async Task<Comentario> AtualizarAsync(Comentario comentario)
        {
            var comentarioExistente = await _contexto.Comentarios
                .FirstOrDefaultAsync(c => c.ID == comentario.ID); 

            if (comentarioExistente != null)
            {
                comentarioExistente.Texto = comentario.Texto; 
                await _contexto.SaveChangesAsync();
                return comentarioExistente;
            }

            return null; 
        }
        public async Task<Comentario> SalvarAsync(Comentario comentario)
        {
            if (comentario.ID == 0) 
            {
                return await AdicionarAsync(comentario);
            }
            else
            {
                return await AtualizarAsync(comentario); 
            }
        }
        public async Task<Comentario> ObterAsync(int comentarioId)
        {
            return await _contexto.Comentarios
                .Include(c => c.Usuario) 
                .FirstOrDefaultAsync(c => c.ID == comentarioId); 
        }
    }
}
