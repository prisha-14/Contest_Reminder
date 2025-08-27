import React from "react";
import "./ContestCard.css";

export const ContestCard = ({ contests }) => {
  const sortedContests = [...contests].sort(
    (a, b) => new Date(a.start_time) - new Date(b.start_time)
  );

  return (
    <div className="contest-list">
      {sortedContests.map((contest, index) => {
        const start = new Date(contest.start_time);
        const end = new Date(contest.end_time);

        const startIST = new Date(start.getTime() + 5.5 * 60 * 60 * 1000);
        const endIST = new Date(end.getTime() + 5.5 * 60 * 60 * 1000);

        const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
          contest.name
        )}&dates=${startIST
          .toISOString()
          .replace(/[-:]/g, "")
          .split(".")[0]}/${endIST
          .toISOString()
          .replace(/[-:]/g, "")
          .split(".")[0]}&details=Join+contest+at+${encodeURIComponent(
          contest.url
        )}`;

        const iconPath = `/images/${contest.site}.png`;

        return (
          <div className="contest-card" key={index}>
            <div className="card-header">
              <img
                src={iconPath}
                alt={contest.site}
                className="platform-icon"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/default.png";
                }}
              />
              <h3>{contest.name}</h3>
            </div>
            <p className="card-time">
              <strong>Start:</strong>{" "}
              {startIST.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
            </p>
            <p className="card-time">
              <strong>End:</strong>{" "}
              {endIST.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
            </p>
            <div className="button-group">
              <a href={contest.url} target="_blank" rel="noreferrer">
                <button className="visit-btn">Visit</button>
              </a>
              <a href={calendarLink} target="_blank" rel="noreferrer">
                <button className="calendar-btn">Add to Calendar</button>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
