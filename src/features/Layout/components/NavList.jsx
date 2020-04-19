import React from "react";

import { pages } from "../../shared/containers/Main";
import NavItem from "./NavItem";
import NavBarItem from "./Mobile/NavBarItem";
import NavSubItem from "./NavSubItem";

const NavList = ({ forNavBar, forSideDrawer }) => {
  return pages.map(item => (
    <React.Fragment key={item.link}>
      {forNavBar && !item.hiddenForNavBar && (
        <NavBarItem
          // Items
          label={item.label}
          link={item.link}
          component={item.component}
          icon={item.icon}
          roles={item.roles}
          sub={item.sub}
          // Other props
          exact={item.link === "/"}
        />
      )}
      {!forNavBar && !item.hidden && (
        <NavItem
          // Items
          label={item.label}
          link={item.link}
          component={item.component}
          icon={item.icon}
          roles={item.roles}
          sub={item.sub}
          // Other props
          exact={item.link === "/"}
          forSideDrawer={forSideDrawer}
        >
          {item.sub &&
            item.sub.map(
              subItem =>
                !subItem.hidden && (
                  <NavSubItem
                    // Items
                    label={subItem.label}
                    link={subItem.link}
                    component={subItem.component}
                    roles={subItem.roles}
                    // Other props
                    key={subItem.link}
                    forSideDrawer={forSideDrawer}
                  />
                )
            )}
        </NavItem>
      )}
    </React.Fragment>
  ));
};

export default NavList;
