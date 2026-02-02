import { CustomTabPanel, a11yProps } from "../../../components/NavTabs";
import { Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

import PreselectionComponent from "./parts/PreselectionComponent";
import DistributeComponent from "./parts/DistributeComponent";
import RestaurantComponent from "./parts/RestaurantComponent";
import HackathonCompenent from "./parts/HackathonCompenent";
import SpacesComponent from "./parts/SpacesComponent";
import LevelComponent from "./parts/LevelComponent";

export default function SettingsView() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="md:p-9 flex montserrat">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            scrollButtons={true}
            variant="scrollable"
            allowScrollButtonsMobile
          >
            <Tab label="Hackaton" {...a11yProps(0)} />
            <Tab label="Niveaux" {...a11yProps(1)} />
            <Tab label="Salle" {...a11yProps(2)} />
            <Tab label="Repartition" {...a11yProps(3)} />
            <Tab label="Preselection" {...a11yProps(4)} />
            <Tab label="Restauration" {...a11yProps(5)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="montserrat">
            <HackathonCompenent />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="montserrat">
            <LevelComponent />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className="montserrat">
            <SpacesComponent />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <div className="montserrat">
            <DistributeComponent />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <div className="montserrat">
            <PreselectionComponent />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <div className="montserrat">
            <RestaurantComponent />
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
