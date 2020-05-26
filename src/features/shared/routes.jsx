import React from "react";

import iconHome from "@iconify/icons-bx/bx-home-alt";
// Manager
import iconProduct from "@iconify/icons-bx/bx-carousel";
import iconInventory from "@iconify/icons-bx/bx-box";
// Merchandiser
import iconOrder from "@iconify/icons-bx/bx-notepad";
// Customer Support
// Admin
import iconAdministration from "@iconify/icons-bx/bx-wrench";
// Others
import iconSearch from "@iconify/icons-bx/bx-search";
import iconShopInfo from "@iconify/icons-bx/bx-info-circle";

import Protected from "../Auth/hocs/Protected";
import { roleConsts as role, roles as allRoles } from "../../configs/api.config";

import TestPage from "../Test/pages/TestPage";
// Dashboard
import Home from "../Dashboard/pages/Home";
import AdminHome from "../Dashboard/pages/AdminHome";
// AccountStaff
import ViewAccountStaffs from "../AccountStaff/pages/ViewAccountStaffs";
import NewAccountStaff from "../AccountStaff/pages/NewAccountStaff";
// AccountUsers
import ViewAccountUsers from "../AccountUsers/pages/ViewAccountUsers";
// Products
import ViewProducts from "../Products/pages/ViewProducts";
import NewProduct from "../Products/pages/NewProduct";
import EditProduct from "../Products/pages/EditProduct";
// Scale
import ViewScales from "../Scales/pages/ViewScales";
import NewScale from "../Scales/pages/NewScale";
import EditScale from "../Scales/pages/EditScale";
// Types
import ViewTypes from "../Types/pages/ViewTypes";
import NewType from "../Types/pages/NewType";
import EditType from "../Types/pages/EditType";
// Brands
import ViewBrands from "../Brands/pages/ViewBrands";
import NewBrand from "../Brands/pages/NewBrand";
import EditBrand from "../Brands/pages/EditBrand";
// Attributes
import ViewAttributes from "../Attributes/pages/ViewAttributes";
import NewAttribute from "../Attributes/pages/NewAttribute";
import EditAttribute from "../Attributes/pages/EditAttribute";
// Inventory
import ViewInventoryItems from "../Inventory/pages/ViewInventoryItems";
import NewInventoryItem from "../Inventory/pages/NewInventoryItem";
import EditInventoryItem from "../Inventory/pages/EditInventoryItem";
// Shop
import EditShop from "../Shop/pages/EditShop";
// Orders
import ViewOrders from "../Orders/pages/ViewOrders";
import InspectOrder from "../Orders/pages/InspectOrder";
import NewOrder from "../Orders/pages/NewOrder";
import VerifyOrder from "../Orders/pages/VerifyOrder";

const routes = [
  {
    label: "Dashboard",
    link: "/",
    component: Home,
    icon: iconHome,
    roles: allRoles
  },
  // MANAGER
  {
    label: "Products",
    link: "/products",
    component: () => (
      <Protected roles={[role.MANAGER]}>
        <ViewProducts />
      </Protected>
    ),
    icon: iconProduct,
    roles: [role.MANAGER],
    sub: [
      {
        label: "Add Product",
        link: "/products/add",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <NewProduct />
          </Protected>
        ),
        hidden: true,
        roles: [role.MANAGER]
      },
      // scale
      {
        label: "Scales",
        link: "/products/scales",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <ViewScales />
          </Protected>
        ),
        roles: [role.MANAGER]
      },
      {
        label: "Add Scale",
        link: "/products/scales/add",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <NewScale />
          </Protected>
        ),
        hidden: true,
        roles: [role.MANAGER]
      },
      {
        label: "Edit Scale",
        link: "/products/scales/:id",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <EditScale />
          </Protected>
        ),
        hidden: true,
        roles: [role.MANAGER]
      },
      // Type
      {
        label: "Types",
        link: "/products/types",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <ViewTypes />
          </Protected>
        ),
        roles: [role.MANAGER]
      },
      {
        label: "Add Type",
        link: "/products/types/add",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <NewType />
          </Protected>
        ),
        hidden: true,
        roles: [role.MANAGER]
      },
      {
        label: "Edit Type",
        link: "/products/types/:id",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <EditType />
          </Protected>
        ),
        hidden: true,
        roles: [role.MANAGER]
      },
      // Brand
      {
        label: "Brands",
        link: "/products/brands",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <ViewBrands />
          </Protected>
        ),
        roles: [role.MANAGER]
      },
      {
        label: "New Brand",
        link: "/products/brands/add",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <NewBrand />
          </Protected>
        ),
        hidden: true,
        roles: [role.MANAGER]
      },
      {
        label: "Edit Brand",
        link: "/products/brands/:id",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <EditBrand />
          </Protected>
        ),
        hidden: true,
        roles: [role.MANAGER]
      },
      {
        label: "Attributes",
        link: "/products/attributes",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <ViewAttributes />
          </Protected>
        ),
        roles: [role.MANAGER]
      },
      {
        label: "New Attribute",
        link: "/products/attributes/add",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <NewAttribute />
          </Protected>
        ),
        hidden: true,
        roles: [role.MANAGER]
      },
      {
        label: "Edit Attribute",
        link: "/products/attributes/:id",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <EditAttribute />
          </Protected>
        ),
        hidden: true,
        roles: [role.MANAGER]
      },
      {
        label: "Edit Product",
        link: "/products/:id",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <EditProduct />
          </Protected>
        ),
        hidden: true,
        roles: [role.MANAGER]
      }
    ]
  },
  {
    label: "Inventory",
    link: "/inventory",
    component: () => (
      <Protected roles={[role.MANAGER]}>
        <ViewInventoryItems />
      </Protected>
    ),
    icon: iconInventory,
    roles: [role.MANAGER],
    sub: [
      {
        label: "Import",
        link: "/inventory/add",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <NewInventoryItem />
          </Protected>
        ),
        roles: [role.MANAGER]
      },
      {
        label: "Edit Imported Item",
        link: "/inventory/:id",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <EditInventoryItem />
          </Protected>
        ),
        hidden: true,
        roles: [role.MANAGER]
      }
    ]
  },
  // Shop
  {
    label: "Shop",
    link: "/shop",
    component: () => (
      <Protected roles={[role.MANAGER]}>
        <EditShop />
      </Protected>
    ),
    icon: iconShopInfo,
    roles: [role.MANAGER]
  },
  // Merchandiser
  {
    label: "Orders",
    link: "/orders",
    component: () => (
      <Protected roles={[role.MERCHANDISER]}>
        <ViewOrders />
      </Protected>
    ),
    icon: iconOrder,
    roles: [role.MERCHANDISER],
    sub: [
      {
        label: "Verify Order",
        link: "/orders/:id/verify",
        component: () => (
          <Protected roles={[role.MERCHANDISER]}>
            <VerifyOrder />
          </Protected>
        ),
        hidden: true,
        roles: [role.MERCHANDISER]
      },
      {
        label: "New POS Order",
        link: "/orders/add",
        component: () => (
          <Protected roles={[role.MERCHANDISER]}>
            <NewOrder />
          </Protected>
        ),
        roles: [role.MERCHANDISER]
      },
      {
        label: "Inspect Order",
        link: "/orders/:id",
        component: () => (
          <Protected roles={[role.MERCHANDISER]}>
            <InspectOrder />
          </Protected>
        ),
        hidden: true,
        roles: [role.MERCHANDISER]
      }
    ]
  },
  // Customer Support
  // Admin
  {
    label: "Administration",
    link: "/admin",
    component: () => (
      <Protected roles={[role.ADMIN]}>
        <AdminHome />
      </Protected>
    ),
    icon: iconAdministration,
    roles: [role.ADMIN],
    sub: [
      {
        label: "Staff",
        link: "/admin/staffs",
        component: () => (
          <Protected roles={[role.ADMIN]}>
            <ViewAccountStaffs />
          </Protected>
        ),
        roles: [role.ADMIN]
      },
      {
        label: "Add Staff",
        link: "/admin/staffs/add",
        component: () => (
          <Protected roles={[role.ADMIN]}>
            <NewAccountStaff />
          </Protected>
        ),
        hidden: true,
        roles: [role.ADMIN]
      },
      {
        label: "Users",
        link: "/admin/users",
        component: () => (
          <Protected roles={[role.ADMIN]}>
            <ViewAccountUsers />
          </Protected>
        ),
        roles: [role.ADMIN]
      },
      {
        label: "Add User",
        link: "/admin/users/add",
        component: () => (
          <Protected roles={[role.ADMIN]}>
            <p>AddUser</p>
          </Protected>
        ),
        hidden: true,
        roles: [role.ADMIN]
      }
    ]
  },
  {
    label: "TEST AREA",
    link: "/test",
    component: TestPage,
    icon: iconAdministration,
    hidden: true,
    hiddenForNavBar: true,
    roles: allRoles
  },
  {
    label: "Search Results",
    link: "/search",
    component: () => <p>Search</p>,
    icon: iconSearch,
    hidden: true,
    roles: allRoles
  }
];

export default routes;
