import type { HTTPMethod } from "../types/h3.ts";
import type { EventHandler, EventHandlerRequest, EventHandlerResponse } from "../types/handler.ts";
import type { InferOutput, StandardSchemaV1 } from "./internal/standard-schema.ts";

/**
 * Route tanımlama yardımcı fonksiyonu (input/output tipli)
 */
export function defineRoute<
  M extends HTTPMethod, 
  P extends string,
  PathParams extends StandardSchemaV1 = StandardSchemaV1,
  Input extends StandardSchemaV1 = StandardSchemaV1,
  Output extends StandardSchemaV1 = StandardSchemaV1,
  Req extends EventHandlerRequest = EventHandlerRequest,
  Res extends EventHandlerResponse<InferOutput<Output>> = EventHandlerResponse<InferOutput<Output>>,
>(
  def: {
    method: M;
    pathParams?: PathParams;
    path: P;
    input?: Input;
    output?: Output;
    handler: EventHandler<Input, Output, Req, Res>; // input tipi EventHandlerRequest ile birleşti
  }
): {
  method: M;
  pathParams?: PathParams;
  path: P;
  input?: Input;
  output?: Output;
  handler: EventHandler<Input, Output, Req, Res>; // input tipi EventHandlerRequest ile birleşti
} {
  return def;
}

