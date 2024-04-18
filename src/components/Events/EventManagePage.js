import React, { useEffect, useState } from "react";
import Parse from "parse";
import Card from "./EventsCard";
import { Alert } from "@mui/material";

const EventsManagePage = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchMyEvents = async () => {
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
        setMyEvents(eventsData);
      } catch (error) {
        console.error("Error while fetching My Events", error);
      }
    };

    fetchMyEvents();
  }, []);

  useEffect(() => {
    const fetchAttendingEvents = async () => {
      const currentUser = Parse.User.current();
      if (!currentUser) return;

      const query = new Parse.Query("Events");
      query.containedIn("attendingUsers", [currentUser.id]);

      try {
        const results = await query.find();
        const eventsData = results.map((event) => ({
          objectId: event.id,
          title: event.get("eventTitle"),
          description: event.get("eventDesc"),
          location: event.get("eventLoc"),
          date: event.get("eventDate"),
        }));
        setAttendingEvents(eventsData);
      } catch (error) {
        console.error("Error fetching attending events:", error);
      }
    };

    fetchAttendingEvents();
  }, []);

  const handleDeleteEvent = async (objectId) => {
    const query = new Parse.Query("Events");
    try {
      const event = await query.get(objectId);
      const response = await event.destroy();
      console.log("Deleted ParseObject", response);
      showAlert("Event Removed!");
      // Update myEvents list after deletion
      setMyEvents(myEvents.filter((e) => e.objectId !== objectId));
    } catch (error) {
      console.error("Error while deleting ParseObject", error);
      showAlert("Error deleting event. Please try again.");
    }
  };

  const handleUnattendEvent = async (objectId) => {
    // Remove the current user from the list of attending users for the event
    const eventQuery = new Parse.Query("Events");
    try {
      const event = await eventQuery.get(objectId);
      const currentUser = Parse.User.current();
      if (!currentUser) {
        console.error("No current user found");
        return;
      }

      event.remove("attendingUsers", currentUser.id);
      event.increment("numUsersAttending", -1);
      await event.save();

      // Update attendingEvents list after unattending
      setAttendingEvents(
        attendingEvents.filter((event) => event.objectId !== objectId)
      );
    } catch (error) {
      console.error("Error unattending event:", error);
      showAlert("Error unattending event. Please try again.");
    }
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage("");
    }, 10000); // Hide alert after 10 seconds
  };

  return (
    <div>
      {alertMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {alertMessage}
        </Alert>
      )}
      <h1>My Events</h1>
      {myEvents.map((event) => (
        <Card
          key={event.objectId}
          title={event.title}
          description={event.description}
          location={event.location}
          date={event.date}
          onDelete={() => handleDeleteEvent(event.objectId)}
          hideAttend={true}
        />
      ))}
      <h1>Attending Events</h1>
      {attendingEvents.map((event) => (
        <Card
          key={event.objectId}
          title={event.title}
          description={event.description}
          location={event.location}
          date={event.date}
          createdBy={event.createdBy}
          isManagePage={true}
          onUnattend={() => handleUnattendEvent(event.objectId)}
        />
      ))}
    </div>
  );
};

export default EventsManagePage;
