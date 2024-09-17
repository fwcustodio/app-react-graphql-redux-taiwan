// Defina o tipo do serviço
interface Service {
  id: string;
  name: string;
  description: string;
}

// Estado inicial com o tipo definido
const initialState: {
  services: Service[];
  loading: boolean;
  error: string | null;
} = {
  services: [],
  loading: false,
  error: null,
};

// Redefinindo o reducer
export const serviceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "GET_SERVICES_SUCCESS":
      return {
        ...state,
        services: action.payload,
        loading: false,
        error: null,
      };
    case "CREATE_SERVICE_SUCCESS":
      return {
        ...state,
        services: [...state.services, action.payload],
        loading: false,
        error: null,
      };
    case "UPDATE_SERVICE_SUCCESS":
      return {
        ...state,
        services: state.services.map((service) =>
          service.id === action.payload.id ? action.payload : service
        ),
        loading: false,
        error: null,
      };
    case "DELETE_SERVICE_SUCCESS":
      return {
        ...state,
        services: state.services.filter(
          (service) => service.id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case "GET_SERVICES_FAILURE":
    case "CREATE_SERVICE_FAILURE":
    case "UPDATE_SERVICE_FAILURE":
    case "DELETE_SERVICE_FAILURE":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
