import React, { useEffect, useState } from "react";
import Parse from "parse";
import Card from "./EventsCard";

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const Events = Parse.Object.extend("Events");
      const query = new Parse.Query(Events);
      try {
        const results = await query.find();
        const events = results.map((object) => ({
          eventTitle: object.get("eventTitle"),
          eventDesc: object.get("eventDesc"),
          eventLoc: object.get("eventLoc"),
          eventDate: object.get("eventDate"),
        }));
        setEvents(events);
      } catch (error) {
        console.error("Error while fetching Events", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {events.map((event, i) => (
        <Card
          key={i}
          title={event.eventTitle}
          description={event.eventDesc}
          location={event.eventLoc}
          date={event.eventDate}
        />
      ))}
    </div>
  );
};

export default EventsPage;
