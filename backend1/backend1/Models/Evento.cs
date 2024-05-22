using System;
using System.Collections.Generic;

namespace backend1.Models
{
    public partial class Evento
    {
        public string Id { get; set; } = null!;
        public string Nombre { get; set; } = null!;
        public DateTime FechaEvento { get; set; }
        public string LugarEvento { get; set; } = null!;
        public string? Descripcion { get; set; }
        public decimal Precio { get; set; }
    }
}
