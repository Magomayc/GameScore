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
    [Route("[Controller]")]
    public class ComentarioController : ControllerBase
    {
        private readonly IComentarioAplicacao _comentarioAplicacao;

        public ComentarioController(IComentarioAplicacao comentarioAplicacao)
        {
            _comentarioAplicacao = comentarioAplicacao;
        }

        [HttpPost("Criar")]
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

        [HttpGet("ListarPorJogo/{jogoId}")]
        public async Task<IActionResult> ListarPorJogoAsync(int jogoId)
        {
            try
            {
                var comentarios = await _comentarioAplicacao.ListarPorJogoAsync(jogoId);

                var resposta = comentarios.ConvertAll(c => new ComentarioResposta
                {
                    Id = c.ID,
                    UsuarioId = c.UsuarioId,
                    UsuarioNome = c.Usuario?.Nome,
                    Texto = c.Texto,
                    DataCriacao = c.DataCriacao
                });

                return Ok(resposta);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Obter")]
        public async Task<IActionResult> ObterAsync(int id)
        {
            try
            {
                var comentario = await _comentarioAplicacao.ObterAsync(id);

                var resposta = new ComentarioResposta
                {
                    Id = comentario.ID,
                    UsuarioId = comentario.UsuarioId,
                    UsuarioNome = comentario.Usuario?.Nome,
                    Texto = comentario.Texto,
                    DataCriacao = comentario.DataCriacao
                };

                return Ok(resposta);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPut("Atualizar/{Id}")]
        public async Task<IActionResult> AtualizarAsync(int id, [FromBody] ComentarioAtualizar requisicao)
        {
            try
            {
                var comentario = new Comentario
                {
                    ID = id,
                    Texto = requisicao.Texto
                };

                await _comentarioAplicacao.AtualizarAsync(comentario);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("Remover/{Id}")]
        public async Task<IActionResult> RemoverAsync(int id)
        {
            try
            {
                await _comentarioAplicacao.RemoverAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
