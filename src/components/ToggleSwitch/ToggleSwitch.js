import { useContext } from "react";
import styles from "./ToggleSwitch.module.css";
import modeImg from "../../assets/brightness.png";
import darkModeImg from "../../assets/night.png";
import ReducerContext from "../../context/Context";

export default function ToggleSwitch() {
  const stateGlobal = useContext(ReducerContext);

  const darkModeHandler = () => {
    stateGlobal.dispatch({ type: "change-theme" });
  };

  return (
    <button
      onClick={darkModeHandler}
      type="button"
      className={`${styles.toggleSwitch} ${
        stateGlobal.state.theme ? styles.toggleSwitch_dark : ""
      }`}
    >
      <div
        className={`${styles.toggleSwitch__switch} ${
          stateGlobal.state.theme ? styles.toggleSwitch__switch_dark : ""
        }`}
      />
      {stateGlobal.state.theme ? (
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
