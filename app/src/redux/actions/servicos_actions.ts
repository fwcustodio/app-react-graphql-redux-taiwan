import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../apollo_client";
import {
  CREATE_SERVICE,
  GET_SERVICES,
  UPDATE_SERVICE,
  DELETE_SERVICE,
} from "../../graphql/servicos_queries";

// Criar um novo serviço
export const createService = createAsyncThunk(
  "services/createService",
  async (
    { name, description }: { name: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await client.mutate({
        mutation: CREATE_SERVICE,
        variables: { name, description },
      });
      return response.data.createService;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Obter todos os serviços
export const getServices = createAsyncThunk(
  "services/getServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.query({
        query: GET_SERVICES,
      });
      return response.data.services;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Atualizar um serviço existente
export const updateService = createAsyncThunk(
  "services/updateService",
  async (
    {
      id,
      name,
      description,
    }: { id: string; name: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await client.mutate({
        mutation: UPDATE_SERVICE,
        variables: { id, name, description },
      });
      return response.data.updateService;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Excluir um serviço
export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await client.mutate({
        mutation: DELETE_SERVICE,
        variables: { id },
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
