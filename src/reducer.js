export const reducer = (state, action) => {
  let theme = null;
  let menuBtnClick = false;

  switch (action.type) {
    case "change-theme":
      theme = state.theme === "" ? "themeDark" : "";
      return { ...state, theme };
    case "click-menuBtn":
      menuBtnClick = !state.menuBtnClick;
      return { ...state, menuBtnClick };
    default:
      throw new Error(`Nie ma takiej akcji: ${action.type}`);
  }
};

export const initialState = {
  theme:
    window.localStorage.getItem("theme") ??
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "themeDark"
      : "",
  menuBtnClick: false,
};
