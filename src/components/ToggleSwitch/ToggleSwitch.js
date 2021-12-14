import { useRef, useContext, useState } from "react";
import styles from "./ToggleSwitch.module.css";
import modeImg from "../../assets/brightness.png";
import darkModeImg from "../../assets/night.png";
import ReducerContext from "../../context/Context";

export default function ToggleSwitch() {
  const toggleSwitchRef = useRef(null);
  const switchRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const stateGlobal = useContext(ReducerContext);

  const darkModeHandler = () => {
    if (!darkMode) {
      setDarkMode(true);
      switchRef.current.style.transform = "translateX(108%)";
      toggleSwitchRef.current.style.backgroundColor = "rgb(252, 255, 92)";
      stateGlobal.dispatch({ type: "change-theme" });
    } else {
      setDarkMode(false);
      switchRef.current.style.transform = "translateX(0%)";
      toggleSwitchRef.current.style.backgroundColor = "rgb(33, 15, 136)";
      stateGlobal.dispatch({ type: "change-theme" });
    }
  };

  return (
    <button
      ref={toggleSwitchRef}
      onClick={darkModeHandler}
      type="button"
      className={styles.toggleSwitch}
    >
      <div ref={switchRef} className={styles.toggleSwitch__switch} />
      {darkMode ? (
        <img
          className={styles.toggleSwitch__imgLight}
          src={modeImg}
          alt="mode"
        />
      ) : (
        <img
          className={styles.toggleSwitch__imgDark}
          src={darkModeImg}
          alt="mode"
        />
      )}
    </button>
  );
}
