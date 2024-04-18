import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Parse from "parse"; // Import Parse here

const EventsCard = ({ title, description, location, date, onDelete, onAttend, onUnattend, createdBy }) => {
  // Format the date property
  const formattedDate = date ? new Date(date).toLocaleDateString() : "";

  // Check if the event is created by the current user
  const isMyEvent = createdBy === Parse.User.current().id;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography>{description}</Typography>
        <Typography>Location: {location}</Typography>
        <Typography>Date: {formattedDate}</Typography>
        <div>
          {onDelete && <Button onClick={onDelete}>Remove Event</Button>}
          {!isMyEvent && <Button onClick={onAttend}>Attend</Button>}
          {isMyEvent && <Button onClick={onUnattend}>Unattend</Button>}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsCard;
