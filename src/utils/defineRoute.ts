import type { HTTPMethod } from "../types/h3.ts";
import type { EventHandler, EventHandlerResponse } from "../types/handler.ts";
import type { InferOutput, StandardSchemaV1 } from "./internal/standard-schema.ts";

/**
 * Route tanımlama yardımcı fonksiyonu (input/output tipli)
 */
export function defineRoute<
  M extends HTTPMethod, 
  P extends string,
  Input extends StandardSchemaV1 = StandardSchemaV1,
  Output extends StandardSchemaV1 = StandardSchemaV1,
  RouterParams extends StandardSchemaV1 = StandardSchemaV1,
  QueryParams extends StandardSchemaV1 = StandardSchemaV1,
  Res extends EventHandlerResponse<InferOutput<Output>> = EventHandlerResponse<InferOutput<Output>>,
>(
  def: {
    method: M;
    routerParams?: RouterParams;
    queryParams?: QueryParams;
    route: P;
    input?: Input;
    output?: Output;
    handler: EventHandler<Input, Output, RouterParams, QueryParams, Res>;
  }
): {
  method: M;
  routerParams?: RouterParams;
  queryParams?: QueryParams;
  route: P;
  input?: Input;
  output?: Output;
  handler: EventHandler<Input, Output, RouterParams, QueryParams, Res>;
} {
  return def;
}

