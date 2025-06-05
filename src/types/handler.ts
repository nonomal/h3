import type { InferInput, InferOutput, StandardSchemaV1 } from "../utils/internal/standard-schema.ts";
import type { MaybePromise } from "./_utils.ts";
import type { H3Event } from "./event.ts";

//  --- event handler ---

export type EventHandler<
  Input extends StandardSchemaV1 = StandardSchemaV1,
  Output extends StandardSchemaV1 = StandardSchemaV1,
  RouterParams extends StandardSchemaV1 = StandardSchemaV1,
  QueryParams extends StandardSchemaV1 = StandardSchemaV1,
  Res extends EventHandlerResponse<InferOutput<Output>> = EventHandlerResponse<InferOutput<Output>>,
> = (event: H3Event<Input, Output, RouterParams, QueryParams>) => Res;

export type EventHandlerFetch = (
  req: Request | URL | string,
  init?: RequestInit,
) => Promise<Response>;

export interface EventHandlerObject<
  Input extends StandardSchemaV1 = StandardSchemaV1,
  Output extends StandardSchemaV1 = StandardSchemaV1,
  RouterParams extends StandardSchemaV1 = StandardSchemaV1,
  QueryParams extends StandardSchemaV1 = StandardSchemaV1,
  Res extends EventHandlerResponse<InferOutput<Output>> = EventHandlerResponse<InferOutput<Output>>,
> {
  handler: EventHandler<Input, Output, RouterParams, QueryParams, Res>;
  middleware?: Middleware[];
}

export interface EventHandlerRequest<
Input extends StandardSchemaV1 = StandardSchemaV1,
Output extends StandardSchemaV1 = StandardSchemaV1,
RouterParams extends StandardSchemaV1 = StandardSchemaV1,
QueryParams extends StandardSchemaV1 = StandardSchemaV1,
> {
  input?: Input,
  queryParams?: QueryParams;
  routerParams?: RouterParams;
  output: Output;
}

export type EventHandlerResponse<T = unknown> = T | Promise<T>;

export type EventHandlerWithFetch<
  Input extends StandardSchemaV1 = StandardSchemaV1,
  Output extends StandardSchemaV1 = StandardSchemaV1,
  RouterParams extends StandardSchemaV1 = StandardSchemaV1,
  QueryParams extends StandardSchemaV1 = StandardSchemaV1,
  Res extends EventHandlerResponse<InferOutput<Output>> = EventHandlerResponse<InferOutput<Output>>,
> = EventHandler<Input, Output, RouterParams, QueryParams, Res> & {
  fetch: EventHandlerFetch;
};

//  --- middleware ---

export type Middleware = (
  event: H3Event,
  next: () => MaybePromise<unknown | undefined>,
) => MaybePromise<unknown | undefined>;

// --- lazy event handler ---

export type LazyEventHandler = () => EventHandler | Promise<EventHandler>;

export interface DynamicEventHandler extends EventHandlerWithFetch {
  set: (handler: EventHandler) => void;
}

// --- utils ---

export type InferEventInput<
  Key extends keyof EventHandlerRequest,
  Event extends H3Event,
  T,
> =
  void extends T
    ? (
        Event extends H3Event<infer Input>
          ? Key extends "input" ? InferInput<Input>
            : never
          : never
      )
    : T;
