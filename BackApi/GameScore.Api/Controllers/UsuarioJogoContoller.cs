using Microsoft.AspNetCore.Mvc;
using GameScore.Dominio.Entidades;
using GameScore.Dominio;
using GameScore.Api.Models.Requisicao;
using GameScore.Api.Models.Resposta;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using GameScore.Aplicacao;

namespace GameScore.Api
{
    [ApiController]
    [Route("[Controller]")]
    public class UsuarioJogoController : ControllerBase
    {
        private readonly IUsuarioJogoAplicacao _usuarioJogoAplicacao;

        public UsuarioJogoController(IUsuarioJogoAplicacao usuarioJogoAplicacao)
        {
            _usuarioJogoAplicacao = usuarioJogoAplicacao;
        }

        [HttpPost]
        [Route("Associar")]
        public async Task<IActionResult> AssociarAsync([FromBody] UsuarioJogoCriar requisicao)
        {
            try
            {
                var usuarioJogo = new UsuarioJogo
                {
                    UsuarioID = requisicao.UsuarioId,
                    JogoID = requisicao.JogoId
                };

                await _usuarioJogoAplicacao.SalvarAsync(usuarioJogo);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> ListarAsync()
        {
            try
            {
                var listaUsuarioJogo = await _usuarioJogoAplicacao.ListarAsync();
                var resposta = new List<UsuarioJogoResposta>();

                foreach (var item in listaUsuarioJogo)
                {
                    resposta.Add(new UsuarioJogoResposta
                    {
                        UsuarioId = item.UsuarioID,
                        JogoId = item.JogoID,
                        UsuarioNome = item.Usuario?.Nome,
                        JogoNome = item.Jogo?.Nome
                    });
                }

                return Ok(resposta);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("Remover/{usuarioId}/{jogoId}")]
        public async Task<IActionResult> RemoverAsync([FromRoute] int usuarioId, [FromRoute] int jogoId)
        {
            try
            {
                await _usuarioJogoAplicacao.RemoverAsync(usuarioId, jogoId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
