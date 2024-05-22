import create from "zustand";
import { Event } from "../models/Event";
import {
  loadEvents,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../services/eventServices";

interface EventState {
  events: Event[];
  
  fetchEvents: () => Promise<void>;
  addEvent: (event: Event) => Promise<void>;
  editEvent: (event: Event) => Promise<void>;
  removeEvent: (id: string) => Promise<void>;
  
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  fetchEvents: async () => {
    const events = await getEvents();
    set({ events });
  },
  addEvent: async (newEvent: Event) => {
    await createEvent(newEvent); 
    await loadEvents(); 
    const events = await getEvents();
    set({ events });
  },
  editEvent: async (updatedEvent: Event) => {
    await updateEvent(updatedEvent); 
    await loadEvents(); 
    const events = await getEvents();
    set({ events });
  },
  removeEvent: async (id: string) => {
    await deleteEvent(id); 
    await loadEvents(); 
    const events = await getEvents();
    set({ events });
  },
}));
