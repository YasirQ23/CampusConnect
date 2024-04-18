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
          objectId: object.id,
          eventTitle: object.get("eventTitle"),
          eventDesc: object.get("eventDesc"),
          eventLoc: object.get("eventLoc"),
          eventDate: new Date(object.get("eventDate")).toLocaleString(),
          createdBy: object.get("createdBy"),
          isAttending: object.get("attendingUsers")
            ? object.get("attendingUsers").includes(Parse.User.current().id)
            : false,
        }));
        setEvents(events);
      } catch (error) {
        console.error("Error while fetching Events", error);
      }
    };

    fetchEvents();
  }, []);

  const handleAttendEvent = async (objectId) => {
    const currentUser = Parse.User.current();
    if (!currentUser) {
      console.error("User not logged in");
      return;
    }

    const Events = Parse.Object.extend("Events");
    const query = new Parse.Query(Events);
    try {
      const event = await query.get(objectId);
      const attendingUsers = event.get("attendingUsers") || [];
      if (!attendingUsers.includes(currentUser.id)) {
        // Add the current user to the list of attending users
        attendingUsers.push(currentUser.id);
        event.set("attendingUsers", attendingUsers);
        // Update the number of attending users
        event.set("numUsersAttending", attendingUsers.length);
        await event.save();
        console.log("User attending event:", event.id);
        // Update the isAttending value in state
        setEvents((prevEvents) =>
          prevEvents.map((e) =>
            e.objectId === event.id ? { ...e, isAttending: true } : e
          )
        );
      } else {
        console.log("User already attending event:", event.id);
      }
    } catch (error) {
      console.error("Error attending event:", error);
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      !event.isAttending && event.createdBy.id !== Parse.User.current().id
  );

  return (
    <div>
      <h1>Campus Events</h1>
      {filteredEvents.map((event, i) => (
        <Card
          key={i}
          objectId={event.objectId} // Corrected here
          title={event.eventTitle}
          description={event.eventDesc}
          location={event.eventLoc}
          date={event.eventDate}
          isMyEvent={event.createdBy === Parse.User.current().id}
          isAttending={event.isAttending}
          onAttend={() => handleAttendEvent(event.objectId)}
        />
      ))}
    </div>
  );
};

export default EventsPage;
