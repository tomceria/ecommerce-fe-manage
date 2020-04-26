import React from "react";

import iconHome from "@iconify/icons-bx/bx-home-alt";
import iconProduct from "@iconify/icons-bx/bx-box";
import iconMedia from "@iconify/icons-bx/bx-image";
import iconCustomize from "@iconify/icons-bx/bx-palette";
import iconAdministration from "@iconify/icons-bx/bx-wrench";
import iconSearch from "@iconify/icons-bx/bx-search";

import Protected from "../Auth/hocs/Protected";
import { roleConsts as role, roles as allRoles } from "../../configs/api.config";

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
// Brands
import ViewBrands from "../Brands/pages/ViewBrands";
import NewBrand from "../Brands/pages/NewBrand";
import EditBrand from "../Brands/pages/EditBrand";

const routes = [
  {
    label: "Dashboard",
    link: "/",
    component: Home,
    icon: iconHome,
    roles: allRoles
  },
  {
    label: "Products",
    link: "/products",
    component: ViewProducts,
    icon: iconProduct,
    roles: [role.MANAGER],
    hidden: true,
    hiddenForNavBar: true,
    sub: [
      {
        label: "Add Product",
        link: "/products/add",
        component: NewProduct,
        hidden: true,
        roles: [role.MANAGER]
      },
      {
        label: "Brands",
        link: "/products/brands",
        component: ViewBrands,
        hidden: true,
        roles: [role.MANAGER]
      },
      {
        label: "Edit Product",
        link: "/products/:id",
        component: EditProduct,
        hidden: true,
        roles: [role.MANAGER]
      },
      {
        label: "New Brand",
        link: "/products/brands/add",
        component: NewBrand,
        hidden: true,
        roles: [role.MANAGER]
      },
      {
        label: "Edit Brand",
        link: "/products/brands/:id",
        component: EditBrand,
        hidden: true,
        roles: [role.MANAGER]
      }
    ]
  },
  {
    label: "Media",
    link: "/media",
    component: () => <p>Media</p>,
    icon: iconMedia,
    roles: [role.MANAGER]
  },
  {
    label: "Customize",
    link: "/customize",
    component: () => <p>Customize</p>,
    icon: iconCustomize,
    roles: [role.MANAGER],
    sub: [
      {
        label: "Banners",
        link: "/customize/banners",
        component: () => <p>Customize banners</p>,
        roles: [role.MANAGER]
      },
      {
        label: "Contact Info",
        link: "/customize/contact",
        component: () => <p>Customize contact</p>,
        roles: [role.MANAGER]
      },
      {
        label: "Social Info",
        link: "/customize/social",
        component: () => <p>Customize social</p>,
        roles: [role.MANAGER]
      }
    ]
  },
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
    label: "Search Results",
    link: "/search",
    component: () => <p>Search</p>,
    icon: iconSearch,
    hidden: true,
    roles: allRoles
  }
];

export default routes;
