// EventsCard.js
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const EventsCard = ({ title, description, location, date }) => {
  // Format the date property
  const formattedDate = date ? new Date(date).toLocaleDateString() : "";

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography>{description}</Typography>
        <Typography>Location: {location}</Typography>
        <Typography>Date: {formattedDate}</Typography>
      </CardContent>
    </Card>
  );
};

export default EventsCard;
