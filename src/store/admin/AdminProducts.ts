import { proxy } from "valtio";

export type AdminProductsStore = typeof AdminProductsStore;

export const AdminProductsStore = proxy({
  subpage: "list",
  setSubpage: (subpage: "list" | "upsert") => {
    AdminProductsStore.subpage = subpage;
  },

  price: "",
  setPrice: (price: string) => {
    AdminProductsStore.price = price;
  },

  image: File,
  setImage: (image: File | null) => {
    AdminProductsStore.image = image as any;
  },

  discount: "",
  setDiscount: (discount: string) => {
    AdminProductsStore.discount = discount;
  },

  createdAt: "",
  setCreatedAt: (createdAt: string) => {
    AdminProductsStore.createdAt = createdAt;
  },

  description: "",
  setDescription: (description: string) => {
    AdminProductsStore.description = description;
  },

  title: "",
  setTitle: (title: string) => {
    AdminProductsStore.title = title;
  },
  smallDescription: "",
  setSmallDescription: (smallDescription: string) => {
    AdminProductsStore.smallDescription = smallDescription;
  },
});
