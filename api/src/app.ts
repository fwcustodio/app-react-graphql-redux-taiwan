import express from "express";
import userRoutes from "./routes/users";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { connectDB } from "./db";
import { Service } from "./models/service";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.options("*", cors()); // Responde a todas as requisições OPTIONS

connectDB();

// Esquema GraphQL
const schema = buildSchema(`
    type Service {
      id: ID!
      name: String!
      description: String!
    }
  
    type Query {
      getServices: [Service]
    }
  
    type Mutation {
      createService(name: String!, description: String!): Service
      updateService(id: ID!, name: String!, description: String!): Service
      deleteService(id: ID!): String
    }
  `);

// Resolvers
const root = {
  getServices: async () => {
    return await Service.find();
  },
  createService: async ({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) => {
    const newService = new Service({ name, description });
    return await newService.save();
  },
  updateService: async ({
    id,
    name,
    description,
  }: {
    id: string;
    name: string;
    description: string;
  }) => {
    return await Service.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
  },
  deleteService: async ({ id }: { id: string }) => {
    await Service.findByIdAndDelete(id);
    return `Service with ID: ${id} deleted.`;
  },
};

// Configuração GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Ativa a interface GraphiQL para testar consultas
  })
);

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
