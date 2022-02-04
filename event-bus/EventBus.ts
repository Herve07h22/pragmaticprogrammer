export type newUserEvent = {
  type: "new user registered";
  email: string;
};

export type productAddedToCart = {
  type: "product added to cart";
  productId: number;
  registeredUserId?: number;
  sessionId: number;
};

export type Event = newUserEvent | productAddedToCart;

// TypeScript' magic
type CheckEvt<Evt, type> = Evt extends { type: type } ? Evt : never;
export type EventNames = Event["type"];

export type Handler<EventName extends EventNames> = (
  event: CheckEvt<Event, EventName>
) => Promise<void>;

export interface EventBus {
  subscribe<EventName extends EventNames>(
    eventName: EventName,
    handler: Handler<EventName>
  ): Promise<void>;
  emit<EventName extends EventNames>(
    event: CheckEvt<Event, EventName>
  ): Promise<void>;
}

export class EventBusBasic implements EventBus {
  handlers: Map<string, Set<Function>> = new Map();

  async subscribe<EventName extends EventNames>(
    eventName: EventName,
    handler: Handler<EventName>
  ) {
    const handlers = this.handlers.get(eventName);
    if (handlers) {
      handlers.add(handler);
    } else {
      this.handlers.set(eventName, new Set([handler]));
    }
  }

  async emit(event: Event) {
    const handlers = this.handlers.get(event.type);
    if (handlers) {
      for (const handler of Array.from(handlers.values())) {
        await handler(event);
      }
    } else {
      throw new Error(`The event <${event.type}> is not handled`);
    }
  }
}

// Now use it:
const bus = new EventBusBasic();

const productAddedToCartHandler: Handler<"product added to cart"> = (
  evt: productAddedToCart // Check consistency between the name of the event and its type
) => {
  return Promise.resolve();
};

bus.subscribe("product added to cart", productAddedToCartHandler); // Type-checked !
bus.emit({
  type: "new user registered",
  email: "john@doe.corp", // type-checked
});
