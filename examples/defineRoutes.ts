import { H3, defineEventHandler, defineRoute, readBody, readValidatedBody } from "h3";
import { z } from "zod";

export const book = defineRoute({
  method: "GET",
  route: "/api/books",
  routerParams: z.object({
    id: z.string(),
  }),
  queryParams: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
  input: z.object({ 
    title: z.string(),
  }),
  output: z.object({
    message: z.string(),
    name: z.string(),
  }),
  handler: async (event)=> {
    const data = await readBody(event);
    const data2 = await readValidatedBody(event)

    return {
      message: "Book list",
      name: ''
    }
  }
});

const app = new H3();

app.addRoute(book);

export default app;
