interface ItemPrice {
  currency: string;
  amount: number;
  decimals?: number;
}

interface Item {
  id: string;
  title: string;
  price: ItemPrice;
  picture: string;
  condition: string;
  free_shipping: boolean;
  state?: string;
  city?: string;
}

interface ItemsResponse {
  items: Item[];
  categories: string[];
}

const empty_item = {
  id: "",
  title: "",
  price: {
    currency: "",
    amount: 0,
  },
  picture: "",
  condition: "",
  free_shipping: false,
};

export { empty_item };
export type { ItemsResponse, Item, ItemPrice };
