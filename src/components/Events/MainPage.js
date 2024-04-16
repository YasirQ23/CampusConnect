// MainPage.js
import React, { useState } from "react";
import NavBar from "./NavBar";
import EventsPage from "./EventsPage";
import CreatePage from "./EventCreatePage";
import ManagePage from "./EventManagePage";

function MainPage() {
  const [currentPage, setCurrentPage] = useState("Events");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <NavBar onPageChange={handlePageChange} />
      {currentPage === "Events" && <EventsPage />}
      {currentPage === "Create" && <CreatePage />}
      {currentPage === "Manage" && <ManagePage />}
    </div>
  );
}

export default MainPage;
