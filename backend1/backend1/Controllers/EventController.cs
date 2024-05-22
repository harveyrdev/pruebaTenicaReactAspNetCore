using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend1.Models;
using Microsoft.AspNetCore.Cors;

namespace backend1.Controllers
{
    [EnableCors("ReglasCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {

        public readonly EventosDBContext dbContext;
        public EventController(EventosDBContext dbContext)
        {
            this.dbContext = dbContext;
        }


        [HttpGet]
        [Route("Lista")]
        public IActionResult Lista()
        {
            List<Evento> lista = new List<Evento>();

            try
            {
                lista = dbContext.Eventos.ToList();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = lista });
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, response = lista });

            }
        }

        [HttpGet]
        [Route("Obtener/{Id}")]
        public IActionResult Obtener(string Id)
        {
            Evento oEvento = null;

            try
            {
                oEvento = dbContext.Eventos.FirstOrDefault(e => e.Id == Id);

                if (oEvento == null)
                {
                    return NotFound("Evento no encontrado");
                }

                return Ok(new { mensaje = "OK", response = oEvento });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }


        [HttpPost]
        [Route("Guardar")]
        public IActionResult Guardar([FromBody] Evento objeto)
        {
            try
            {
                dbContext.Eventos.Add(objeto);
                dbContext.SaveChanges();

                return Ok(new { mensaje = "OK" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }

        [HttpPut]
        [Route("Editar")]
        public IActionResult Editar([FromBody] Evento objeto)
        {
            try
            {
                var oEvento = dbContext.Eventos.Find(objeto.Id);

                if (oEvento == null)
                {
                    return BadRequest("Evento no encontrado");
                }

                oEvento.Nombre = objeto.Nombre ?? oEvento.Nombre;
                oEvento.FechaEvento = objeto.FechaEvento;
                oEvento.LugarEvento = objeto.LugarEvento ?? oEvento.LugarEvento;
                oEvento.Descripcion = objeto.Descripcion ?? oEvento.Descripcion;
                oEvento.Precio = objeto.Precio;

                dbContext.Eventos.Update(oEvento);
                dbContext.SaveChanges();

                return Ok(new { mensaje = "OK" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }

        [HttpDelete]
        [Route("Eliminar/{id}")]
        public IActionResult Eliminar(string id)
        {
            try
            {
                var oEvento = dbContext.Eventos.Find(id);

                if (oEvento == null)
                {
                    return BadRequest("Evento no encontrado");
                }

                dbContext.Eventos.Remove(oEvento);
                dbContext.SaveChanges();

                return Ok(new { mensaje = "OK" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }





    }
}
