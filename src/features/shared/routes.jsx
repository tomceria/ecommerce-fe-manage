import React from "react";

import iconHome from "@iconify/icons-bx/bx-home-alt";
// Manager
import iconProduct from "@iconify/icons-bx/bx-carousel";
import iconInventory from "@iconify/icons-bx/bx-box";
import iconPromotion from "@iconify/icons-bx/bx-purchase-tag-alt";
import iconShopInfo from "@iconify/icons-bx/bx-info-circle";
import iconReport from "@iconify/icons-bx/bx-bar-chart-alt-2";
// Merchandiser
import iconOrder from "@iconify/icons-bx/bx-notepad";
// Customer Support
import iconSupport from "@iconify/icons-bx/bx-support";
// Admin
import iconAdministration from "@iconify/icons-bx/bx-wrench";
// Others
import iconSearch from "@iconify/icons-bx/bx-search";

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
// Maker
import ViewMakers from "../Makers/pages/ViewMakers";
import NewMaker from "../Makers/pages/NewMaker";
import EditMaker from "../Makers/pages/EditMaker";
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
// Reports
import ReportDashboard from "../Reports/pages/ReportDashboard";
// Orders
import ViewOrders from "../Orders/pages/ViewOrders";
import InspectOrder from "../Orders/pages/InspectOrder";
import VerifyOrder from "../Orders/pages/VerifyOrder";
// Promotions
import ViewPromotions from "../Promotions/pages/ViewPromotions";
import NewPromotion from "../Promotions/pages/NewPromotion";
import EditPromotion from "../Promotions/pages/EditPromotion";
// SupportTickets
import ViewSupportTickets from "../SupportTickets/pages/ViewSupportTickets";
import EditSupportTicket from "../SupportTickets/pages/EditSupportTicket";

const i18nId = "UI.PAGES";

const routes = t => [
  {
    label: t(`${i18nId}.DASHBOARD.HOME`),
    link: "/",
    component: Home,
    icon: iconHome,
    roles: allRoles
  },
  // MANAGER
  {
    label: t(`${i18nId}.PRODUCTS.HOME`),
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
        label: t(`${i18nId}.PRODUCTS.ADD`),
        link: "/products/add",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <NewProduct />
          </Protected>
        ),
        hidden: true,
        roles: [role.MANAGER]
      },
      // Scale
      {
        label: t(`${i18nId}.PRODUCTS.SCALES.HOME`),
        link: "/products/scales",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <ViewScales />
          </Protected>
        ),
        roles: [role.MANAGER]
      },
      {
        label: t(`${i18nId}.PRODUCTS.SCALES.ADD`),
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
        label: t(`${i18nId}.PRODUCTS.SCALES.EDIT`),
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
        label: t(`${i18nId}.PRODUCTS.TYPES.HOME`),
        link: "/products/types",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <ViewTypes />
          </Protected>
        ),
        roles: [role.MANAGER]
      },
      {
        label: t(`${i18nId}.PRODUCTS.TYPES.ADD`),
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
        label: t(`${i18nId}.PRODUCTS.TYPES.EDIT`),
        link: "/products/types/:id",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <EditType />
          </Protected>
        ),
        hidden: true,
        roles: [role.MANAGER]
      },
      // Maker
      {
        label: t(`${i18nId}.PRODUCTS.MAKERS.HOME`),
        link: "/products/makers",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <ViewMakers />
          </Protected>
        ),
        roles: [role.MANAGER]
      },
      {
        label: t(`${i18nId}.PRODUCTS.MAKERS.ADD`),
        link: "/products/makers/add",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <NewMaker />
          </Protected>
        ),
        hidden: true,
        roles: [role.MANAGER]
      },
      {
        label: t(`${i18nId}.PRODUCTS.MAKERS.EDIT`),
        link: "/products/makers/:id",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <EditMaker />
          </Protected>
        ),
        hidden: true,
        roles: [role.MANAGER]
      },
      {
        label: t(`${i18nId}.PRODUCTS.BRANDS.HOME`),
        link: "/products/brands",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <ViewBrands />
          </Protected>
        ),
        roles: [role.MANAGER]
      },
      // Brand
      {
        label: t(`${i18nId}.PRODUCTS.BRANDS.ADD`),
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
        label: t(`${i18nId}.PRODUCTS.BRANDS.EDIT`),
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
        label: t(`${i18nId}.PRODUCTS.ATTRIBUTES.HOME`),
        link: "/products/attributes",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <ViewAttributes />
          </Protected>
        ),
        roles: [role.MANAGER]
      },
      {
        label: t(`${i18nId}.PRODUCTS.ATTRIBUTES.ADD`),
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
        label: t(`${i18nId}.PRODUCTS.ATTRIBUTES.EDIT`),
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
        label: t(`${i18nId}.PRODUCTS.EDIT`),
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
    label: t(`${i18nId}.INVENTORY.HOME`),
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
        label: t(`${i18nId}.INVENTORY.ADD`),
        link: "/inventory/add",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <NewInventoryItem />
          </Protected>
        ),
        roles: [role.MANAGER]
      },
      {
        label: t(`${i18nId}.INVENTORY.EDIT`),
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
  // Promotion
  {
    label: t(`${i18nId}.PROMOTIONS.HOME`),
    link: "/promotions",
    component: () => (
      <Protected roles={[role.MANAGER]}>
        <ViewPromotions />
      </Protected>
    ),
    icon: iconPromotion,
    roles: [role.MANAGER],
    sub: [
      {
        label: t(`${i18nId}.PROMOTIONS.ADD`),
        link: "/promotions/add",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <NewPromotion />
          </Protected>
        ),
        roles: [role.MANAGER]
      },
      {
        label: t(`${i18nId}.PROMOTIONS.EDIT`),
        link: "/promotions/:id",
        component: () => (
          <Protected roles={[role.MANAGER]}>
            <EditPromotion />
          </Protected>
        ),
        hidden: true,
        roles: [role.MANAGER]
      }
    ]
  },
  // Shop
  {
    label: t(`${i18nId}.SHOP.HOME`),
    link: "/shop",
    component: () => (
      <Protected roles={[role.MANAGER]}>
        <EditShop />
      </Protected>
    ),
    icon: iconShopInfo,
    roles: [role.MANAGER]
  },
  // Shop
  {
    label: t(`${i18nId}.REPORTS.HOME`),
    link: "/reports",
    component: () => (
      <Protected roles={[role.MANAGER]}>
        <ReportDashboard />
      </Protected>
    ),
    icon: iconReport,
    roles: [role.MANAGER]
  },
  /* MERCHANDISER */
  {
    label: t(`${i18nId}.ORDERS.HOME`),
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
        label: t(`${i18nId}.ORDERS.VERIFY`),
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
        label: t(`${i18nId}.ORDERS.INSPECT`),
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
  /* CUSTOMER SUPPORT */
  {
    label: t(`${i18nId}.SUPPORT.HOME`),
    link: "/support",
    component: () => (
      <Protected roles={[role.SUPPORT]}>
        <ViewSupportTickets />
      </Protected>
    ),
    icon: iconSupport,
    roles: [role.SUPPORT],
    sub: [
      {
        label: t(`${i18nId}.SUPPORT.EDIT`),
        link: "/support/:id",
        component: () => (
          <Protected roles={[role.SUPPORT]}>
            <EditSupportTicket />
          </Protected>
        ),
        hidden: true,
        roles: [role.SUPPORT]
      }
    ]
  },
  /* ADMIN */
  {
    label: t(`${i18nId}.ADMIN.HOME`),
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
        label: t(`${i18nId}.ADMIN.STAFF.HOME`),
        link: "/admin/staffs",
        component: () => (
          <Protected roles={[role.ADMIN]}>
            <ViewAccountStaffs />
          </Protected>
        ),
        roles: [role.ADMIN]
      },
      {
        label: t(`${i18nId}.ADMIN.STAFF.ADD`),
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
        label: t(`${i18nId}.ADMIN.USERS.HOME`),
        link: "/admin/users",
        component: () => (
          <Protected roles={[role.ADMIN]}>
            <ViewAccountUsers />
          </Protected>
        ),
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
    label: t(`${i18nId}.SEARCH.HOME`),
    link: "/search",
    component: () => <p>Search</p>,
    icon: iconSearch,
    hidden: true,
    roles: allRoles
  }
];

export default routes;
