import React from "react";
import UserContext from "../../UserContext";

const LogOutButton = () => (
  <UserContext.Consumer>
    {({ logout }) => (
      <button className="button is-link is-rounded is-small" onClick={logout}>
        LOG OUT
      </button>
    )}
  </UserContext.Consumer>
);

export default LogOutButton;