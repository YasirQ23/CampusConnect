// EventsManagePage.js
import React, { useEffect, useState } from "react";
import Parse from "parse";
import Card from "./EventsCard";
import { Alert } from "@mui/material";

const EventsManagePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const Events = Parse.Object.extend("Events");
      const query = new Parse.Query(Events);
      query.equalTo("createdBy", Parse.User.current());
      try {
        const results = await query.find();
        const eventsData = results.map((event) => ({
          objectId: event.id,
          title: event.get("eventTitle"),
          description: event.get("eventDesc"),
          location: event.get("eventLoc"),
          date: event.get("eventDate"),
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Error while fetching Events", error);
      }
    };

    fetchEvents();
  }, []);
  const [alertMessage, setAlertMessage] = useState("");
  const handleDeleteEvent = async (objectId) => {
    const query = new Parse.Query("Events");
    try {
      const event = await query.get(objectId);
      const response = await event.destroy();
      console.log("Deleted ParseObject", response);
      showAlert("Event Removeed!");
      // Update events list after deletion
      setEvents(events.filter((e) => e.objectId !== objectId));
    } catch (error) {
      console.error("Error while deleting ParseObject", error);
      showAlert("Error deleting event. Please try again.");
    }
  };
  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage("");
    }, 10000); // Hide alert after 3 seconds
  };

  return (
    <div>
      {alertMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {alertMessage}
        </Alert>
      )}
      {events.map((event) => (
        <Card
          key={event.objectId}
          title={event.title}
          description={event.description}
          location={event.location}
          date={event.date}
          onDelete={() => handleDeleteEvent(event.objectId)}
        />
      ))}
    </div>
  );
};

export default EventsManagePage;
