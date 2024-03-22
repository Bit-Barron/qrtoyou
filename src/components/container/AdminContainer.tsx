"use client";

import { useEffect, useState } from "react";
import { RxExit } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { AdminStore } from "@/store/admin/AdminStore";
import { useSnapshot } from "valtio";
import axios from "axios";
import Sidebar from "./admin/Sidebar";
import cookie from "cookie";
import { AdminTabType } from "@/types/store";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Products } from "../pages/Products/Products";
import { Categories } from "../pages/Categories/Categories";
import { QrCode } from "../pages/QrCode/QrCode";
import { OrderList } from "../pages/Order/OrderList";

interface AdminContainerProps {}

export const AdminContainer: React.FC<AdminContainerProps> = ({}) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const router = useRouter();
  const adminStore = useSnapshot(AdminStore);

  useEffect(() => {
    const fetchAdminTabs = async () => {
      try {
        const getToken = cookie.parse(document.cookie);
        const token = getToken["token"];
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REST_ENDPOINT}/api/validate-token`,
          {
            token,
          }
        );
        console.log(response);
        return response;
      } catch (error) {
        return router.push("/login");
      }
    };
    fetchAdminTabs();
  }, [router]);

  const currentTab = adminStore.adminTabs.find((tab) => tab.current);

  const menuProducts = (
    <>
      <div className="flex flex-col flex-1 mt-10">
        {adminStore.adminTabs.map(({ current, Icon, name }, idx) => (
          <div key={idx}>
            <button
              onClick={() => adminStore.setAdminTab(name as AdminTabType)}
            >
              <div className="my-4 inline-block cursor-pointer rounded-lg bg-slate-100 p-3 text-slate-600 hover:bg-gray-300">
                <Icon size={22} />
              </div>
            </button>
          </div>
        ))}
      </div>
      <div className="text-center p-3 hover:shadow-gray-800 hover:shadow-xl border-t justify-between hover:bg-gray-800 border-gray-700 flex duration-200">
        <RxExit
          className="mt-2 text-xl"
          onClick={() => {
            router.push("/auth/login");
          }}
        />
      </div>
    </>
  );

  return (
    <>
      <div className="bg-container">
        <Sidebar menu={menuProducts} />
        {currentTab?.name === "Dashboard" && <Dashboard />}
        {currentTab?.name === "Products" && <Products />}
        {currentTab?.name === "Categories" && <Categories />}
        {currentTab?.name === "Create QR-Code" && <QrCode />}
        {currentTab?.name === "Order" && <OrderList />}
      </div>
    </>
  );
};
