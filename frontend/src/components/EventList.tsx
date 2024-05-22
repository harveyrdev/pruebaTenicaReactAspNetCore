

import {
    Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEventStore } from "../store/store";
import {Event} from '../models/Event'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface EventListProps {
  onEdit: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ onEdit }) => {
  const events = useEventStore((state) => state.events);
 const removeEvent =useEventStore((state)=>state.removeEvent)

  const handleDelete = async (id: string) => {
    await removeEvent(id);
  };


  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Código de evento</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Lugar</TableCell>
            
            <TableCell align="right">Aciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell component="th" scope="row">
                {event.id }
              </TableCell>
              <TableCell align="right">{event.nombre}</TableCell>
              <TableCell align="right">{event.fechaEvento}</TableCell>
              <TableCell align="right">{event.lugarEvento}</TableCell>
             
              <TableCell align="right">
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(event.id)}>
                  
                </Button>
                <Button variant="outlined" color="warning" startIcon={<EditIcon />} onClick={() => onEdit(event)}>
                  
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventList;
