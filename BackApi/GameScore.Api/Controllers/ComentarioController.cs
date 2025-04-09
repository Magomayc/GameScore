using Microsoft.AspNetCore.Mvc;
using GameScore.Dominio.Entidades;
using GameScore.Aplicacao;
using GameScore.Api.Models.Requisicao;
using GameScore.Api.Models.Resposta;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace GameScore.Api
{
    [ApiController]
    [Route("[controller]")]
    public class ComentarioController : ControllerBase
    {
        private readonly IComentarioAplicacao _comentarioAplicacao;

        public ComentarioController(IComentarioAplicacao comentarioAplicacao)
        {
            _comentarioAplicacao = comentarioAplicacao;
        }

        [HttpPost]
        [Route("Criar")]
        public async Task<IActionResult> CriarAsync([FromBody] ComentarioCriar requisicao)
        {
            try
            {
                var comentario = new Comentario
                {
                    UsuarioId = requisicao.UsuarioId,
                    JogoId = requisicao.JogoId,
                    Texto = requisicao.Texto
                };

                await _comentarioAplicacao.CriarAsync(comentario);
                return Ok("Comentário criado com sucesso.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("ListarPorJogo/{jogoId}")]
        public async Task<IActionResult> ListarPorJogoAsync([FromRoute] int jogoId)
        {
            try
            {
                var comentarios = await _comentarioAplicacao.ListarPorJogoAsync(jogoId);

                var resposta = new List<ComentarioResposta>();
                foreach (var comentario in comentarios)
                {
                    resposta.Add(new ComentarioResposta
                    {
                        Id = comentario.ID,
                        UsuarioId = comentario.UsuarioId,
                        UsuarioNome = comentario.Usuario.Nome,
                        Texto = comentario.Texto,
                        DataCriacao = comentario.DataCriacao
                    });
                }

                return Ok(resposta);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
