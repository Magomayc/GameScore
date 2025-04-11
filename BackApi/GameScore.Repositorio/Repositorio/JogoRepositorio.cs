using DataAccess.Contexto;
using Microsoft.EntityFrameworkCore;
using GameScore.Dominio.Entidades;
using GameScore.Repositorio;

namespace DataAccess.Repositorio 

{
    public class JogoRepositorio : BaseRepositorio, IJogoRepositorio 
    {
        public JogoRepositorio(GameScoreContexto contexto): base(contexto){

        }

        public async Task AtualizarAsync(Jogo jogo)
        {
            _contexto.Jogos.Update(jogo);
            await _contexto.SaveChangesAsync();
        }

        public async Task<IEnumerable<Jogo>> ListarAsync(bool ativo, string query)
        {
            query = query?.Trim() ?? "";

            return await _contexto.Jogos
                .Where(j => j.Ativo == ativo && j.Nome.Contains(query))
                .ToListAsync();
        }

        public async Task<Jogo> ObterAsync(int jogoId)
        {
            return await _contexto.Jogos.Where(j=>j.ID == jogoId)
                                     .Where(u=> u.Ativo)
                                     .FirstOrDefaultAsync();
        }

        public async Task<Jogo> ObterJogoDesativadoAsync(int jogoId)
        {
            return await _contexto.Jogos.Where(u=>u.ID == jogoId)
                                     .Where(u=> !u.Ativo)
                                     .FirstOrDefaultAsync();
        }

        public async Task<int> SalvarAsync(Jogo jogo)
        {
            await _contexto.Jogos.AddAsync(jogo);
            await _contexto.SaveChangesAsync();
            return jogo.ID;
        }
    }
}