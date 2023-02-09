using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheEncoreAgenda.Data;
using TheEncoreAgenda.Models;

namespace TheEncoreAgenda.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AudiosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AudiosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Audios
        [HttpGet]
        [ProducesResponseType(typeof(List<Audio>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<Audio>>> GetAudios()
        {
          if (_context.Audios == null)
          {
              return NotFound();
          }
            return Ok(await _context.Audios.ToListAsync());
        }

        // GET: api/Audios/5
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

        // POST: api/Audios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(typeof(Audio), (StatusCodes.Status201Created))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Audio>> PostAudio(Audio audio)
        {
          if (_context.Audios == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Audios'  is null.");
          }
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
