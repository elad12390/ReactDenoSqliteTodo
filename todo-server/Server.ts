import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import { TodoDB } from './DB/todo/todo.ts';
import { addRoutes } from './routes/index.route.ts';

// create oak router
const router = new Router();

// add all routes to router dynamically
await addRoutes(router);

// create oak app
const app = new Application();
app.use(oakCors({
    origin: "*"
}))
app.use(router.routes());
app.use(router.allowedMethods());
// start app
await app.listen({ port: 8000 });
