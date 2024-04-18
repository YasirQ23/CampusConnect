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
          eventDate: object.get("eventDate"),
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

  return (
    <div>
      {events.map((event, i) => (
        <Card
          key={i}
          objectID={event.objectID}
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
