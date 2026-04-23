import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  HeaderContainer,
  Header,
  SkipToContent,
  HeaderMenuButton,
  Content,
  Theme,
} from "@carbon/react";
import ErrorBoundary from "../../components/ErrorBoundary";
import AppHeader from "../../components/Header";
import Pages from "../../Pages";
import SideNavBar from "../../components/SidNavBar/SideNavBar";
import { useCookies } from "react-cookie";

function UIShell({ toggleSidebar, sidebarOpen, setSidebarOpen }) {
  const [accessToken, setAccessToken] = React.useState("");
  /* eslint-disable */
  const [cookies, setCookies] = useCookies(["token"]);
  /* eslint-enable */
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const token = getAccessTokenSilently();
  const promise = Promise.resolve(token);

  React.useEffect(() => {
    if (isAuthenticated) {
      promise.then((val) => {
        setAccessToken(val);
      });
    }
    setCookies("token", accessToken);
  }, [accessToken, isAuthenticated, promise, setCookies]);

  const [active, setActive] = React.useState({
    activeItem: `/${window.location.pathname.split("/")[1] ?? ""}`,
  });
  return (
    <>
      {isAuthenticated && (
        <Theme theme="g90">
          <HeaderContainer
            render={({ isSideNavExpanded, onClickSideNavExpand }) => (
              <div>
                <Header aria-label="Affine Health Atlas">
                  <SkipToContent />
                  <HeaderMenuButton
                    aria-label="Open menu"
                    onClick={onClickSideNavExpand}
                    isActive={isSideNavExpanded}
                  />
                  <AppHeader toggleSidebar={toggleSidebar} />
                  <ErrorBoundary>
                    <SideNavBar
                      setSidebarOpen={setSidebarOpen}
                      active={active}
                      isSideNavExpanded={isSideNavExpanded}
                      onClickSideNavExpand={onClickSideNavExpand}
                      setActive={setActive}
                      sidebarOpen={sidebarOpen}
                    />
                  </ErrorBoundary>
                </Header>
              </div>
            )}
          />
        </Theme>
      )}
      <Content className={sidebarOpen ? "content" : "sidebar__close"}>
        <Pages sidebarOpen={sidebarOpen} />
      </Content>
    </>
  );
}

export default UIShell;
