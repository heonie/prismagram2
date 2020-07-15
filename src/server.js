import "./env";
import { GraphQLServer, PubSub } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import { uploadMiddleware, uploadController } from "./upload";
import { PrismaClient } from "@prisma/client";

const PORT = process.env.PORT || 4000;

const prisma = new PrismaClient();
const pubsub = new PubSub();

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated, prisma, pubsub })
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleware, uploadController);

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
