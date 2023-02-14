using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheEncoreAgenda.Data;
using TheEncoreAgenda.Models;
using TheEncoreAgenda.Utils;

namespace TheEncoreAgenda.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AudiosController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private AzureBlob _azureBlob;

        public AudiosController(ApplicationDbContext context)
        {
            _context = context;
            _azureBlob = new AzureBlob();
        }

        // GET: api/Audios
        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(typeof(List<Audio>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<Audio>>> GetAudios()
        {
            if (_context.Audios == null)
            {
                return NotFound();
            }

            string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Need to Adjust For More Efficient Query
            List<Audio> audios = await _context.Audios
                                        .Include(x => x.User)
                                        .OrderByDescending(x => x.NumberOfLikes)
                                        .ToListAsync();
            return Ok(audios);

        }

        // GET: api/Audios/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(Audio), (StatusCodes.Status200OK))]
        public async Task<ActionResult<Audio>> GetAudio(int id)
        {
          if (_context.Audios == null)
          {
              return NotFound();
          }
            var audio = await _context.Audios.FindAsync(id);

            if (audio == null)
            {
                return NotFound();
            }

            List<Comment> comments = await _context.Comments.Where(x => x.AudioId == audio.AudioId).Include(x => x.User).ToListAsync();

            audio.Comments = comments;

            return Ok(audio);
        }

        // PUT: api/Audios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> PutAudio(int id, Audio audio)
        {
            if (id != audio.AudioId)
            {
                return BadRequest();
            }

            _context.Entry(audio).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AudioExists(id))
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

        // POST: api/Audios/Upvote
        [HttpPost("Audio/Upvote")]
        public async Task<IActionResult> Upvote(int audioId)
        {
            string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            Audio? audio = await _context.Audios.FindAsync(audioId);

            if (audio == null) return BadRequest();

            Vote? find = await _context.Votes.FirstOrDefaultAsync(x => x.AudioId == audioId && x.UserId == userId);

            if (find == null)
            {
                Vote vote = new Vote();
                vote.UserId = userId;
                vote.AudioId = audioId;
                vote.VoteType = 1;

                _context.Add(vote);
                audio.NumberOfLikes++;
            }
            else
            {
                switch (find.VoteType)
                {
                    case 1:
                        find.VoteType = 0;
                        audio.NumberOfLikes--;
                        break;
                    case 0:
                        find.VoteType = 1;
                        audio.NumberOfLikes++;
                        break;

                    default:
                        break;
                }
                _context.Update(find);
            }


            _context.Update(audio);

            await _context.SaveChangesAsync();

            return Ok(audio.NumberOfLikes);

        }

        // POST: api/Audios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(typeof(Audio), (StatusCodes.Status201Created))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Audio>> PostAudio([FromBody] Audio audio, IFormFile? upload)
        {
          if (_context.Audios == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Audios'  is null.");
          }

            if (upload == null) return BadRequest();

            string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            audio.UserId = userId;

            // Upload File Here
            string? fileURL = await _azureBlob.Upload(upload);

            if (fileURL == null) return Problem("Azure Blob Storage is not storing the Files");

            audio.AudioPath = fileURL;

            _context.Audios.Add(audio);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAudio", new { id = audio.AudioId }, audio);
        }

        // DELETE: api/Audios/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteAudio(int id)
        {
            if (_context.Audios == null)
            {
                return NotFound();
            }
            var audio = await _context.Audios.FindAsync(id);
            if (audio == null)
            {
                return NotFound();
            }

            _context.Audios.Remove(audio);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AudioExists(int id)
        {
            return (_context.Audios?.Any(e => e.AudioId == id)).GetValueOrDefault();
        }
    }
}
