using Microsoft.AspNetCore.Mvc;
using GameScore.Dominio.Entidades;
using GameScore.Dominio;
using GameScore.Api.Models.Requisicao;
using GameScore.Api.Models.Resposta;
using System.Threading.Tasks;
using System;
using GameScore.Aplicacao;

namespace GameScore.Api
{
    [ApiController]
    [Route("[Controller]")]
    public class JogoController : ControllerBase
    {
        private readonly IJogoAplicacao _jogoAplicacao;

        public JogoController(IJogoAplicacao jogoAplicacao)
        {
            _jogoAplicacao = jogoAplicacao;
        }

        [HttpGet]
        [Route("Obter/{jogoId}")]
        public async Task<IActionResult> ObterAsync([FromRoute] int jogoId)
        {
            try
            {
                var jogo = await _jogoAplicacao.ObterAsync(jogoId);
                var jogoResposta = new JogoResposta
                {
                    Id = jogo.ID,
                    Nome = jogo.Nome,
                    Genero = jogo.Genero,
                    Descricao = jogo.Descricao,
                    Ativo = jogo.Ativo
                };

                return Ok(jogoResposta);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("Criar")]
        public async Task<IActionResult> CriarAsync([FromBody] JogoCriar requisicao)
        {
            try
            {
                var jogo = new Jogo
                {
                    Nome = requisicao.Nome,
                    Genero = requisicao.Genero,
                    Descricao = requisicao.Descricao
                };

                var id = await _jogoAplicacao.CriarAsync(jogo);
                return Ok(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("Atualizar")]
        public async Task<IActionResult> AtualizarAsync([FromBody] JogoAtualizar requisicao)
        {
            try
            {
                var jogo = new Jogo
                {
                    ID = requisicao.Id,
                    Nome = requisicao.Nome,
                    Genero = requisicao.Genero,
                    Descricao = requisicao.Descricao
                };

                await _jogoAplicacao.AtualizarAsync(jogo);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("Deletar/{jogoId}")]
        public async Task<IActionResult> DeletarAsync([FromRoute] int jogoId)
        {
            try
            {
                await _jogoAplicacao.DeletarAsync(jogoId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("Restaurar/{jogoId}")]
        public async Task<IActionResult> RestaurarAsync([FromRoute] int jogoId)
        {
            try
            {
                await _jogoAplicacao.RestaurarAsync(jogoId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> ListarAsync([FromQuery] bool ativo, [FromQuery] string query = "")
        {
            try
            {
                var jogos = await _jogoAplicacao.ListarAsync(ativo, query);
                return Ok(jogos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}