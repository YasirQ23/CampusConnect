import React, { useState } from "react";
import Parse from "parse";
import { Alert } from "@mui/material";

const locations = [
  "The Modesto A. Maidique Campus (MMC)",
  "The Biscayne Bay Campus (BBC)",
  "FIU at I-75",
  "The FIU Downtown on Brickell",
];

const EventsCreatePage = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventLoc, setEventLoc] = useState(locations[0]);
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
      setEventLoc(locations[0]);
      setEventDate("");
    } catch (error) {
      console.error("Error while creating Event: ", error);
    }
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage("");
    }, 10000);
  };

  return (
    <div>
      <h1>Create Event</h1>
      {alertMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {alertMessage}
        </Alert>
      )}
      <h3>Title</h3>
      <input
        type="text"
        placeholder="Title"
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
      />
      <h3>Description</h3>
      <input
        type="text"
        placeholder="Description"
        value={eventDesc}
        onChange={(e) => setEventDesc(e.target.value)}
      />
      <h3>Date & Time</h3>
      <input
        type="datetime-local"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />
       <div>
      <h3>Location</h3>
      <select value={eventLoc} onChange={(e) => setEventLoc(e.target.value)}>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
      </div>
      <div>
        <button onClick={handleCreateEvent}>Create Event</button>
      </div>
    </div>
  );
};

export default EventsCreatePage;
