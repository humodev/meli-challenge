import { Item } from "../Listado/types";

interface DetailsItem extends Item {
  sold_quantity?: number;
  description?: string;
}

interface DetailsResponse {
  item: DetailsItem;
}

enum Condicion {
  new = "Nuevo",
  used = "Usado",
  reconditioned = "Reacondicionado",
}

export { Condicion };
export type { DetailsItem, DetailsResponse };
