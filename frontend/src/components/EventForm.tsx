import {

  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { useEventStore } from "../store/store";
import { Event } from "../models/Event";


interface EventFormProps {
  eventToEdit?: Event;
  onSave: () => void;
}
const EventForm: React.FC<EventFormProps> = ({ eventToEdit, onSave }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  const [event, setEvent] = useState<Event>(eventToEdit ||{
    id: "",
    nombre: "",
    fechaEvento: "",
    lugarEvento: "",
    descripcion: "",
    precio: 0,
  });

 

  const addEvent = useEventStore((state) => state.addEvent);
  const editEvent = useEventStore((state) => state.editEvent);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (eventToEdit) {
      await editEvent(event);
    } else {
      await addEvent(event);
    }

    onSave();
    handleClose();
    setEvent({
      id: "",
      nombre: "",
      fechaEvento: "",
      lugarEvento: "",
      descripcion: "",
      precio: 0,
    });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Crear evento
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        PaperProps={{
          component: "form",
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleSubmit(event);
          },
        }}
      >
        <DialogContent>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                placeholder="Código de evento"
                type="text"
                name="id"
                value={event.id}
                onChange={handleChange}
                autoFocus
                required
                margin="dense"
                variant="standard"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                placeholder="Nombre de evento"
                type="text"
                name="nombre"
                value={event.nombre}
                onChange={handleChange}
                required
                margin="dense"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder="Fecha de evento"
                type="date"
                name="fechaEvento"
                value={event.fechaEvento}
                onChange={handleChange}
                required
                margin="dense"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder="Lugar del evento"
                type="text"
                name="lugarEvento"
                value={event.lugarEvento}
                onChange={handleChange}
                required
                margin="dense"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder="Descripcion del evento"
                type="text"
                name="descripcion"
                value={event.descripcion}
                onChange={handleChange}
                required
                margin="dense"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder="Precio del evento"
                type="number"
                name="precio"
                value={event.precio}
                onChange={handleChange}
                required
                margin="dense"
                variant="standard"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventForm;
