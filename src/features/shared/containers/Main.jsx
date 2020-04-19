import React from "react";
import { Switch, Route } from "react-router-dom";

import iconHome from "@iconify/icons-bx/bx-home-alt";
import iconProduct from "@iconify/icons-bx/bx-box";
import iconMedia from "@iconify/icons-bx/bx-image";
import iconCustomize from "@iconify/icons-bx/bx-palette";
import iconAdministration from "@iconify/icons-bx/bx-wrench";
import iconSearch from "@iconify/icons-bx/bx-search";

import Protected from "../../Auth/hocs/Protected";

// Dashboard
import Home from "../../Dashboard/pages/Home";
// Products
import ViewProducts from "../../Products/pages/ViewProducts";
import NewProduct from "../../Products/pages/NewProduct";
import EditProduct from "../../Products/pages/EditProduct";
// Brands
import ViewBrands from "../../Brands/pages/ViewBrands";
import NewBrand from "../../Brands/pages/NewBrand";
import EditBrand from "../../Brands/pages/EditBrand";
// Categorys
import ViewCategories from "../../Categories/pages/ViewCategories";
import NewCategory from "../../Categories/pages/NewCategory";
import EditCategory from "../../Categories/pages/EditCategory";

export const pages = [
  {
    label: "Dashboard",
    link: "/",
    component: Home,
    icon: iconHome,
    roles: ["manager", "admin"]
  },
  {
    label: "Products",
    link: "/products",
    component: ViewProducts,
    icon: iconProduct,
    roles: ["manager"],
    sub: [
      {
        label: "Add Product",
        link: "/products/add",
        component: NewProduct,
        roles: ["manager"]
      },
      {
        label: "Brands",
        link: "/products/brands",
        component: ViewBrands,
        roles: ["manager"]
      },
      {
        label: "Categories",
        link: "/products/categories",
        component: ViewCategories,
        roles: ["manager"]
      },
      {
        label: "Edit Product",
        link: "/products/:id",
        component: EditProduct,
        hidden: true,
        roles: ["manager"]
      },
      {
        label: "New Brand",
        link: "/products/brands/add",
        component: NewBrand,
        hidden: true,
        roles: ["manager"]
      },
      {
        label: "Edit Brand",
        link: "/products/brands/:id",
        component: EditBrand,
        hidden: true,
        roles: ["manager"]
      },
      {
        label: "New Category",
        link: "/products/categories/add",
        component: NewCategory,
        hidden: true,
        roles: ["manager"]
      },
      {
        label: "Edit Category",
        link: "/products/categories/:id",
        component: EditCategory,
        hidden: true,
        roles: ["manager"]
      }
    ]
  },
  {
    label: "Media",
    link: "/media",
    component: () => <p>Media</p>,
    icon: iconMedia,
    roles: ["manager"]
  },
  {
    label: "Customize",
    link: "/customize",
    component: () => <p>Customize</p>,
    icon: iconCustomize,
    roles: ["manager"],
    sub: [
      {
        label: "Banners",
        link: "/customize/banners",
        component: () => <p>Customize banners</p>,
        roles: ["manager"]
      },
      {
        label: "Contact Info",
        link: "/customize/contact",
        component: () => <p>Customize contact</p>,
        roles: ["manager"]
      },
      {
        label: "Social Info",
        link: "/customize/social",
        component: () => <p>Customize social</p>,
        roles: ["manager"]
      }
    ]
  },
  {
    label: "Administration",
    link: "/admin",
    component: () => (
      <Protected roles={["admin"]}>
        <Home />
      </Protected>
    ),
    icon: iconAdministration,
    roles: ["admin"],
    sub: [
      {
        label: "Users",
        link: "/admin/users",
        component: () => <p>Administration users</p>,
        roles: ["admin"]
      },
      {
        label: "Logs",
        link: "/admin/logs",
        component: () => <p>Administration logs</p>,
        roles: ["admin"]
      },
      {
        label: "Product Trash",
        link: "/admin/product-trash",
        component: () => <p>Administration trash</p>,
        roles: ["admin"]
      }
    ]
  },
  {
    label: "Search Results",
    link: "/search",
    component: () => <p>Search</p>,
    icon: iconSearch,
    hidden: true,
    roles: ["manager", "admin"]
  }
];

const Main = () => {
  return (
    <Protected roles={["manager", "admin"]}>
      <Switch>
        {pages.map(p => (
          <Route path={p.link} key={p.link} exact={p.link === "/"}>
            <Switch>
              <Route path={p.link} exact component={p.component} />
              {p.sub &&
                p.sub.map(subP => (
                  <Route path={subP.link} key={subP.link} exact component={subP.component} />
                ))}
            </Switch>
          </Route>
        ))}
      </Switch>
    </Protected>
  );
};

export default Main;
