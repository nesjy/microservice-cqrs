import { CreateOrderCommandHandler } from "./create-order.command-handler";
import { DeleteOrderCommandHandler } from "./delete-order.command-handler";


export const OrderCommandHandlers = [
  CreateOrderCommandHandler,
  DeleteOrderCommandHandler,
];
