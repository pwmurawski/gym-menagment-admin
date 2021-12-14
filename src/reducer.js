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
  theme: "",
  menuBtnClick: false,
};
