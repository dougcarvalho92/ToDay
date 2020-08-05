import React from "react";
import { Route, useHistory } from "react-router-dom";

import Header from "./../Header";
import GlobalStyle from "../../assets/styles/global";

const DefaultLayout = ({ component: Component, rootpage, ...rest }) => {
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <div className="DefaultLayout">
          {rootpage ? "" : <Header />}
          <Component {...matchProps} />
          <GlobalStyle />
        </div>
      )}
    />
  );
};

export default DefaultLayout;
