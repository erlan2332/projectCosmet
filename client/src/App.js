import React from "react";
import AppointmentScheduler from "./components/info/info";
import ButtonComponent from "./components/carousel_button/buttons";
import Section from "./components/section1/section1";
import CustomCard from "./components/custom_card/custom_card";
import SocialMedia from "./components/social_media/social_media";
import EndPage from "./components/end_page/end_page";

const App = () => {
  return (
    <div>
        <Section />
        <CustomCard />
        <AppointmentScheduler />
        <ButtonComponent />
        <SocialMedia />
        <EndPage />
    </div>
  )
}

export default App