export type TShopItem = {
  id: number;
  description: string;
  image: string;
  price: number;
  title: string;
};

export interface IShopItems {
  shopItems: TShopItem[] | undefined;
}

export interface IShopItem {
  shopItem: TShopItem;
  removeShopItem: (shopItem: TShopItem) => void;
}
