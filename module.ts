import { module } from "@prisma/composer";
import { compute } from "@prisma/composer-prisma-cloud";
import nextjs from "@prisma/composer/nextjs";

const web = compute({
  name: "web",
  deps: {},
  build: nextjs({
    module: import.meta.url,
    appDir: ".",
  }),
});

export default module("kozoselmeny", ({ provision }) => {
  provision(web, {
    id: "web",
    deps: {},
  });
});
