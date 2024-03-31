import { Toaster } from "sonner";
import { AdminProductsStore } from "@/store/admin/AdminProducts";
import React, { FormEvent, useState } from "react";
import { useSnapshot } from "valtio";
import { CgRename } from "react-icons/cg";
import { Input } from "@/components/ui/input";
import { FaDollarSign } from "react-icons/fa";
import { MdOutlineDiscount } from "react-icons/md";
import { MdOutlineFileUpload } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { PiSubtitles } from "react-icons/pi";
import Image from "next/image";

interface ProductsProps {}

export const ProductsUpsert: React.FC<ProductsProps> = ({}) => {
  const productStore = useSnapshot(AdminProductsStore);
  const [imageUrl, setImageUrl] = useState("");

  const buttonActions = (
    <div className="flex justify-end space-x-5">
      <Button type="submit" Icon={AiOutlineSave}>
        Save
      </Button>
    </div>
  );

  return (
    <form
      onSubmit={(e) => productStore.createProduct(e as FormEvent)}
      className="space-y-8 divide-y divide-gray-700 rounded-md bg-container p-5 text-white"
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Selected Image"
          width={100}
          height={100}
        />
      )}

      <div className="space-y-8 divide-y divide-gray-700 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg font-medium leading-6">Product</h3>
            <p className="mt-1 max-w-2xl text-sm ">
              This Information will be displayed publicly
            </p>
          </div>

          <div className="space-y-6 sm:space-y-5">
            <Input
              value={productStore.title}
              onChange={(e) => productStore.setTitle(e.target.value)}
              type="text"
              Icon={PiSubtitles}
              placeholder={"Product Title"}
              id={"title"}
              required
            />

            <Input
              value={productStore.description}
              onChange={(e) => productStore.setDescription(e.target.value)}
              type="text"
              Icon={CgRename}
              placeholder={"Product Description"}
              name={"description"}
              id={"description"}
              required
            />

            <Input
              value={productStore.smallDescription}
              onChange={(e) => productStore.setSmallDescription(e.target.value)}
              type="text"
              Icon={CgRename}
              placeholder={"Product Small Description (optional)"}
              name={"description"}
              id={"description"}
            />

            <Input
              type="number"
              value={productStore.price}
              onChange={(e) => productStore.setPrice(e.target.value)}
              Icon={FaDollarSign}
              placeholder={"Product Price"}
              name={"price"}
              id={"price"}
              required
            />

            <Input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const selectedFile = e.target.files[0];
                  const temporaryUrl = URL.createObjectURL(selectedFile);
                  setImageUrl(temporaryUrl);
                }
              }}
              Icon={MdOutlineFileUpload}
              className="text-2xl"
              placeholder={"Product File Upload"}
              name={"File Upload"}
              id={"Product File Upload"}
            />
          </div>
        </div>

        <div className="space-y-3 pt-8 sm:space-y-5 sm:pt-10">
          <div>
            <h3 className="text-lg font-medium leading-6 ">Categories</h3>
            <p className="mt-1 max-w-2xl">
              Specify Categories the product belongs to.
            </p>
          </div>
        </div>
        <div className="space-y-3 pt-8 sm:space-y-5 sm:pt-10">
          <div>
            <h3 className="text-lg font-medium leading-6 ">Attributes</h3>
            <p className="mt-1 max-w-2xl">
              Specify Attributes the product belongs to.
            </p>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <Input
              type={"text"}
              placeholder={"Product Discount (optional)"}
              value={productStore.discount}
              name={"promo code"}
              Icon={MdOutlineDiscount}
              id={"promo code"}
              onChange={(e) => productStore.setDiscount(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="pt-5">{buttonActions}</div>
    </form>
  );
};
