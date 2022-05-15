export const homeReducer = (state, action) => {
  let newCustomersArray;

  switch (action.type) {
    case "addCustomersArray":
      return {
        ...state,
        customersArray: state.customersArray.push(...action.customers),
      };

    case "addBeginCustomerNotLastPage":
      state.customersArray.pop();

      return {
        ...state,
        customersArray: state.customersArray.unshift(action.customer),
      };

    case "addBeginCustomer":
      return {
        ...state,
        customersArray: state.customersArray.unshift(action.customer),
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

    case "setDiscountsArray":
      return { ...state, discountArray: action.discountArray };

    case "setTicketsArray":
      return { ...state, ticketsArray: action.ticketsArray };

    default:
      throw new Error(`Nie ma takiej akcji: ${action.type}`);
  }
};

export const initialState = {
  customersArray: [],
  discountsArray: [],
  ticketsArray: [],
};
