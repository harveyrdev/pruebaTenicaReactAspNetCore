import { Container, Typography } from "@mui/material";
import "./App.css";
import EventForm from "./components/EventForm";
import { useEffect, useState } from "react";
import EventList from "./components/EventList";
import { useEventStore } from "./store/store";
import { Event } from "./models/Event";

const App = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event | undefined>(undefined);
  const handleSave = () => {
    setIsEditing(false);
    setEventToEdit(undefined);
  };

  const handleEdit = (event: Event) => {
    setEventToEdit(event);
    setIsEditing(true);
  };
  const fetchEvents = useEventStore((state) => state.fetchEvents);
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
  return (
    <main>
      <Container maxWidth="sm">
        <Typography variant="h3" component="h2" fontWeight="700">
          Eventos deportivos y culturales
        </Typography>
      </Container>{" "}
      <Container maxWidth="md">
        {isEditing && (
          <EventForm eventToEdit={eventToEdit} onSave={handleSave} />
        )}

        <EventList onEdit={handleEdit} />
      </Container>
    </main>
  );
};

export default App;
