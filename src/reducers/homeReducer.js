export const homeReducer = (state, action) => {
  let newCustomersArray;

  switch (action.type) {
    case "addCustomersArray":
      newCustomersArray = [...state.customersArray, ...action.customers];

      return {
        ...state,
        customersArray: newCustomersArray,
      };

    case "addBeginCustomerNotLastPage":
      state.customersArray.pop();
      newCustomersArray = [action.customer, ...state.customersArray];

      return {
        ...state,
        customersArray: newCustomersArray,
      };

    case "addBeginCustomer":
      newCustomersArray = [action.customer, ...state.customersArray];

      return {
        ...state,
        customersArray: newCustomersArray,
      };

    case "editCustomer":
      newCustomersArray = state.customersArray.map((el) =>
        el.id === action.id ? { id: action.id, ...action.newCustomerData } : el
      );

      return { ...state, customersArray: newCustomersArray };

    case "deleteCustomer":
      newCustomersArray = state.customersArray.filter(
        ({ id }) => id !== action.id
      );

      return { ...state, customersArray: newCustomersArray };

    case "setCustomersArray":
      return { ...state, customersArray: action.customers };

    case "setDiscountsArray":
      return { ...state, discountsArray: action.discounts };

    case "setTicketsArray":
      return { ...state, ticketsArray: action.tickets };

    default:
      throw new Error(`Nie ma takiej akcji: ${action.type}`);
  }
};

export const initialState = {
  customersArray: [],
  discountsArray: [],
  ticketsArray: [],
};
