import { Event } from "../models/Event";

const API_URL = "http://localhost:5036/api/Event";

export const loadEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/Lista`);
    const data = await response.json();


    if (data && data.mensaje === "ok" && data.response) {
      return data.response;
    } else {
      throw new Error("Error al cargar eventos: Respuesta inesperada del servidor");
    }
  } catch (error) {
    console.error("Error al cargar eventos:", error);
    return [];
  }
};


export const getEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch(`${API_URL}/Lista`);
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    return [];
  }
};

export const getEventById = async (id: string): Promise<Event | undefined> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Evento no encontrado");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener evento por ID:", error);
    return undefined;
  }
};

export const createEvent = async (newEvent: Event): Promise<void> => {
  try {
    await fetch(`${API_URL}/Guardar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
  } catch (error) {
    console.error("Error al crear evento:", error);
  }
};

export const updateEvent = async (updatedEvent: Event): Promise<void> => {
  try {
    await fetch(`${API_URL}/Editar/${updatedEvent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    });
  } catch (error) {
    console.error("Error al actualizar evento:", error);
  }
};

export const deleteEvent = async (id: string): Promise<void> => {
  try {
    await fetch(`${API_URL}/Eliminar/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error al eliminar evento:", error);
  }
};
