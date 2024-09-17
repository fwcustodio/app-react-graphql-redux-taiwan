// authActions.ts
import { gql } from "@apollo/client";
import { client } from "../../apollo_client";

// Definir o GraphQL Query para login
const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      const response = await client.query({
        query: LOGIN_QUERY,
        variables: { email, password },
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.login });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", error });
    }
  };
