import React, { useState } from "react";
import Parse from "parse";
import { Alert } from "@mui/material";

const EventsCreatePage = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventLoc, setEventLoc] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleCreateEvent = async () => {
    const myNewObject = new Parse.Object("Events");
    myNewObject.set("eventTitle", eventTitle);
    myNewObject.set("eventDesc", eventDesc);
    myNewObject.set("eventLoc", eventLoc);
    myNewObject.set("eventDate", new Date(eventDate));
    myNewObject.set("createdBy", Parse.User.current());

    try {
      const result = await myNewObject.save();
      console.log("Event created", result);
      showAlert("Event created successfully!");
      // Reset form fields after successful creation
      setEventTitle("");
      setEventDesc("");
      setEventLoc("");
      setEventDate("");
    } catch (error) {
      console.error("Error while creating Event: ", error);
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
      <h1>Create Event</h1>
      {alertMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {alertMessage}
        </Alert>
      )}
      <input
        type="text"
        placeholder="Title"
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={eventDesc}
        onChange={(e) => setEventDesc(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={eventLoc}
        onChange={(e) => setEventLoc(e.target.value)}
      />
      <input
        type="datetime-local"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />
      <button onClick={handleCreateEvent}>Create Event</button>
    </div>
  );
};

export default EventsCreatePage;
