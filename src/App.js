import React from "react";
import Navigation from "./components/navigation/Navigation";
import BottomNavigation from "./components/navigation/BottomNavigation";
import "./css/styles.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <BottomNavigation />
    </div>
  );
}

export default App;
