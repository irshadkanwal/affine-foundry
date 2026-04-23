import React from "react";
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  Popover,
  PopoverContent,
  Search,
} from "@carbon/react";
import { UserAvatar, Notification, Menu } from "@carbon/react/icons";
import { Button } from "@carbon/react";
import { Link } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import SearchPrompt from "../Search";

const AppHeader = ({ toggleSidebar }) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    //console.log("Search:", searchValue);
  };

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });

  return (
    <Header aria-label="Header">
      <SkipToContent />
      <Menu onClick={toggleSidebar} style={{ marginLeft: "15px" }} size={16} />
      <HeaderName element={Link} to="/" prefix="">
        Affine Foundry
      </HeaderName>
      <HeaderGlobalBar>
        {!isAuthenticated && (
          <Button
            id="qsLoginBtn"
            color="primary"
            className="btn-margin"
            onClick={() => loginWithRedirect({})}
          >
            Log in
          </Button>
        )}
        {isAuthenticated && (
          <>
            {/* <HeaderGlobalAction
              // aria-label="Search"
              tooltipAlignment="end"
            >
              <Search size={20} />
            </HeaderGlobalAction> */}

            <Popover
              open={searchValue}
              isTabTip
              onRequestClose={() => setSearchValue("")}
              align="bottom-right"
            >
              <div
              // onClick={() => {
              //   setSearchValue("");
              // }}
              >
                <form onSubmit={handleSearchSubmit}>
                  <Search
                    id="search-navbar"
                    placeHolderText="Search"
                    size="lg"
                    value={searchValue}
                    onChange={handleSearchInputChange}
                    style={{ width: "22rem" }}
                  />
                </form>
              </div>
              <PopoverContent>
                <SearchPrompt searchValue={searchValue} />
              </PopoverContent>
            </Popover>
            <HeaderGlobalAction tooltipAlignment="end">
              <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction tooltipAlignment="end">
              <Popover
                open={open}
                isTabTip
                onRequestClose={() => setOpen(false)}
                align="bottom-right"
              >
                <div
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <UserAvatar size={20} />
                </div>
                <PopoverContent>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    block="true"
                    style={{ background: "white", color: "black" }}
                    onClick={() => logoutWithRedirect()}
                  >
                    Log Out
                  </Button>
                </PopoverContent>
              </Popover>
            </HeaderGlobalAction>
          </>
        )}
      </HeaderGlobalBar>
    </Header>
  );
};

export default AppHeader;
