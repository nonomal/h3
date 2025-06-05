import { H3, defineEventHandler, defineRoute } from "h3";
import { z } from "zod";

export const book = defineRoute({
  method: "GET",
  path: "/api/books",
  pathParams: z.object({
    id: z.string(),
  }),
  input: z.object({ 
    title: z.string(),
  }),
  output: z.object({
    message: z.string(),
    name: z.string(),
  }),
  handler: defineEventHandler((event) => {
    return { message: "live", name: '' };
  })
});

// Route'ları array olarak tanımla
const routes = [
  defineRoute({
    method: "GET",
    path: "/hello/:name",
    handler: defineEventHandler((event) => {
      return { message: "Hello", name: event.context.params?.name as string };
    })
  }),
  defineRoute({
    method: "POST",
    path: "/hello/:name",
    handler: defineEventHandler((event) => {
      return { message: "Posted", name: event.context.params?.name as string };
    })
  }),
  defineRoute({
    method: "POST",
    path: "/post",
    handler: defineEventHandler(async (event) => {
      const body = await event.req.json();
      return { ok: true, body };
    })
  })
] as const;

const app = new H3();

app.addRoute(book);

// Çoklu route ekleme:
for (const route of routes) {
  app.addRoute(route);
}

// Route'ları ve app'i dışa aktar
export { routes };
export default app;
