import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { ContestCard } from "./ContestCard";

export const Home = ({ contests }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  let selectedContests = contests;
  const data = JSON.parse(localStorage.getItem("host_sites"));
  if (data !== null) {
    const enabledHosts = data
      .filter((site) => site.status)
      .map((site) => site.host);
    selectedContests = contests.filter((c) =>
      enabledHosts.includes(c.site)
    );
  }

  const in24Hours = selectedContests.filter((contest) => {
    const diff = new Date(contest.start_time) - new Date();
    return diff <= 24 * 60 * 60 * 1000 && diff > 0;
  });

  const upcoming = selectedContests.filter(
    (contest) => new Date(contest.start_time) > new Date()
  );

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        textColor="white"
        indicatorColor="secondary"
        className="tab-value"
      >
        <Tab label="All" />
        <Tab label="In 24 Hours" />
        <Tab label="Upcoming" />
      </Tabs>
      {selectedTab === 0 && <ContestCard contests={selectedContests} />}
      {selectedTab === 1 && <ContestCard contests={in24Hours} />}
      {selectedTab === 2 && <ContestCard contests={upcoming} />}
    </>
  );
};
