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
    public class CalendarEventsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CalendarEventsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CalendarEvents
        [HttpGet]
        [ProducesResponseType(typeof(List<CalendarEvent>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<CalendarEvent>>> GetCalendarEvents()
        {
          if (_context.CalendarEvents == null)
          {
              return NotFound();
          }
            return Ok(await _context.CalendarEvents.ToListAsync());
        }

        [HttpGet("EventName/{id}")]
        public async Task<ActionResult<CalendarEvent>> GetEventNameById(int id)
        {
            if (id < 1) return BadRequest();

            if(_context.CalendarEvents == null)
            {
                return NotFound();
            }

            CalendarEvent calendarEvent = await _context.CalendarEvents.FindAsync(id);

            if(calendarEvent == null)
            {
                return NotFound();
            }

            return Ok(calendarEvent.Title);
        }

        // GET: api/CalendarEvents/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(CalendarEvent), (StatusCodes.Status200OK))]
        public async Task<ActionResult<CalendarEvent>> GetCalendarEvent(int id)
        {
            if (id < 1) return BadRequest();

          if (_context.CalendarEvents == null)
          {
              return NotFound();
          }
            var calendarEvent = await _context.CalendarEvents.FindAsync(id);

            if (calendarEvent == null)
            {
                return NotFound();
            }

            return Ok(calendarEvent);
        }

        // PUT: api/CalendarEvents/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> PutCalendarEvent(int id, CalendarEvent calendarEvent)
        {
            if (id != calendarEvent.Id)
            {
                return BadRequest();
            }

            _context.Entry(calendarEvent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CalendarEventExists(id))
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

        // POST: api/CalendarEvents
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(typeof(CalendarEvent), (StatusCodes.Status201Created))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<ActionResult<CalendarEvent>> PostCalendarEvent(CalendarEvent calendarEvent)
        {
          if (_context.CalendarEvents == null)
          {
              return Problem("Entity set 'ApplicationDbContext.CalendarEvents'  is null.");
          }
            _context.CalendarEvents.Add(calendarEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCalendarEvent", new { id = calendarEvent.Id }, calendarEvent);
        }

        // DELETE: api/CalendarEvents/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteCalendarEvent(int id)
        {
            if (_context.CalendarEvents == null)
            {
                return NotFound();
            }
            var calendarEvent = await _context.CalendarEvents.FindAsync(id);
            if (calendarEvent == null)
            {
                return NotFound();
            }

            _context.CalendarEvents.Remove(calendarEvent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CalendarEventExists(int id)
        {
            return (_context.CalendarEvents?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
