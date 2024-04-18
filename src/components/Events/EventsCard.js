import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Parse from "parse"; // Import Parse here

const EventsCard = ({
  objectID,
  title,
  description,
  location,
  date,
  onDelete,
  onAttend,
  onUnattend,
  createdBy,
  isManagePage,
  isAttending,
  hideAttend
}) => {
  // Format the date property
  const formattedDate = date ? new Date(date).toLocaleDateString() : "";

  // Check if the event is created by the current user
  const isMyEvent = createdBy === Parse.User.current().id;

  return (
    <Card>
      <CardContent>
        <Typography variant="h3">{title}</Typography>
        <Typography>
        <Typography variant="h5">What?</Typography> {description}
        </Typography>
        <Typography>
          <Typography variant="h5">Where?</Typography> {location}
        </Typography>
        <Typography>
          <Typography variant="h5">When?</Typography> {formattedDate}
        </Typography>
        <div>
          {onDelete && <button onClick={onDelete}>Remove Event</button>}
          {!isMyEvent && !isManagePage && !isAttending && !hideAttend &&(
            <button onClick={() => onAttend(objectID)}>Attend</button>
          )}
          {!isMyEvent && isManagePage && (
            <button onClick={() => onUnattend(objectID)}>Unattend</button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsCard;
