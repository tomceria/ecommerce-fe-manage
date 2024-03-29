import React from "react";
import { Switch, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { roles } from "../../../configs/api.config";
import Protected from "../../Auth/hocs/Protected";
import routes from "../routes";

const Main = () => {
  const { t } = useTranslation();

  return (
    <Protected roles={roles}>
      <Switch>
        {routes(t).map(p => (
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
