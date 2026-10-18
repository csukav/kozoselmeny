import "dotenv/config";
import { defineConfig as composer } from "@prisma/composer/config";
import { nextjsBuild } from "@prisma/composer/nextjs/control";
import {
  prismaCloud,
  prismaState,
} from "@prisma/composer-prisma-cloud/control";
import { definePrismaConfig } from "prisma/config";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL must be set to load the Prisma config.");
}

export default definePrismaConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
  composer: composer({
    extensions: [prismaCloud(), nextjsBuild()],
    state: prismaState(),
  }),
});
