using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheEncoreAgenda.Data;
using TheEncoreAgenda.Models;
using TheEncoreAgenda.DTO;

namespace TheEncoreAgenda.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CommentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Comments
        [HttpGet]
        [ProducesResponseType(typeof(List<Comment>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
          if (_context.Comments == null)
          {
              return NotFound();
          }
            return await _context.Comments.ToListAsync();
        }

        // GET: api/Comments/audio/{id}
        [HttpGet("audio/{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(List<CommentDTO>), (StatusCodes.Status200OK))]

        public async Task<ActionResult<IEnumerable<CommentDTO>>> GetCommentsByAudioId(int id)
        {
            if (_context.Comments == null)
            {
                return NotFound();
            }

            return await _context.Comments
                                 .Select(x => new CommentDTO
                                 {
                                     CommentId = x.CommentId,
                                     AudioId = x.AudioId,
                                     Message = x.Message,
                                     UserName = x.User.Email,
                                 })
                                 .Where(x => x.AudioId == id)
                                 .ToListAsync();
        }

        // GET: api/Comments/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(CommentDTO), (StatusCodes.Status200OK))]

        public async Task<ActionResult<CommentDTO>> GetComment(int id)
        {
          if (_context.Comments == null)
          {
              return NotFound();
          }
            CommentDTO? comment = await _context.Comments
                                        .Where(x => x.CommentId == id)
                                        .Select(x => new CommentDTO
                                        {
                                            CommentId = x.CommentId,
                                            AudioId = x.AudioId,
                                            Message = x.Message,
                                            UserName = x.User.Email,
                                        })
                                        .SingleOrDefaultAsync();


			if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        // PUT: api/Comments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> PutComment(int id, Comment comment)
        {
            if (id != comment.CommentId)
            {
                return BadRequest();
            }

            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Comments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        [ProducesResponseType(typeof(CalendarEvent), (StatusCodes.Status201Created))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Comment>> PostComment([FromBody] Comment comment)
        {
          if (_context.Comments == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Comments'  is null.");
          }

            if (comment.AudioId < 1 || comment.Message == String.Empty) return BadRequest(comment.Message + " nothing here");

            string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            comment.UserId = userId;

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComment", new { id = comment.CommentId }, comment);
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteComment(int id)
        {
            if (_context.Comments == null)
            {
                return NotFound();
            }
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommentExists(int id)
        {
            return (_context.Comments?.Any(e => e.CommentId == id)).GetValueOrDefault();
        }
    }
}
