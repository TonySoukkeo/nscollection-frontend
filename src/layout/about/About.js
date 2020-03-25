import React from "react";
import { Helmet } from 'react-helmet';

// Components
import Intro from "../../components/about/Intro";
import SearchDetails from "../../components/about/SearchDetails";
import CollectionDetails from "../../components/about/CollectionDetails";
import IconLegendDetails from "../../components/about/IconLegendDetails";
import NotificationsDetails from "../../components/about/NotificationsDetails";
import ContactDetails from "../../components/about/ContactDetails";
import SubNavigation from "../../components/navigation/SubNavigation";

const About = ({ history }) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>NS Collection | About</title>
        <meta name="description" content="Nintendo switch cirtual game library. Get notified when games goes on sale." />
      </Helmet>
      <SubNavigation title="About" history={history} />
      <section className="about">
        <Intro />
        <SearchDetails />
        <IconLegendDetails />
        <CollectionDetails />
        <NotificationsDetails />
        <ContactDetails />
      </section>
    </React.Fragment>
  );
};

export default About;
