// serviceQueries.ts
import { gql } from '@apollo/client';

// Query para obter serviços
export const GET_SERVICES = gql`
  query GetServices {
    getServices {
      id
      name
      description
    }
  }
`;

// Mutation para criar um serviço
export const CREATE_SERVICE = gql`
  mutation CreateService($name: String!, $description: String!) {
    createService(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

// Mutation para atualizar um serviço
export const UPDATE_SERVICE = gql`
  mutation UpdateService($id: ID!, $name: String!, $description: String!) {
    updateService(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

// Mutation para deletar um serviço
export const DELETE_SERVICE = gql`
  mutation DeleteService($id: ID!) {
    deleteService(id: $id)
  }
`;
