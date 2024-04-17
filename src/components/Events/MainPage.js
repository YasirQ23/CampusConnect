// MainPage.js
import React, { useState } from "react";
import NavBar from "./NavBar";
import EventsPage from "./EventsPage";
import CreatePage from "./EventCreatePage";
import ManagePage from "./EventManagePage";
import "./styles.css";

function MainPage() {
  const [currentPage, setCurrentPage] = useState("Events");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div class="page">
      <div class="page-container">
        <NavBar onPageChange={handlePageChange} />
        {currentPage === "Events" && <EventsPage />}
        {currentPage === "Create" && <CreatePage />}
        {currentPage === "Manage" && <ManagePage />}
      </div>
    </div>
  );
}

export default MainPage;
