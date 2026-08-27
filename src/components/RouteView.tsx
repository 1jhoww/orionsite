import { Outlet, useLocation } from "react-router-dom";

/**
 * Route-level polish only: the new view is mounted immediately and fades in.
 * Keyed by pathname so the fade replays on navigation but not on hash changes
 * (so /#contato keeps scrolling inside the page it already is on).
 */
export function RouteView() {
  const { pathname } = useLocation();
  return (
    <div className="route-view" key={pathname}>
      <Outlet />
    </div>
  );
}
