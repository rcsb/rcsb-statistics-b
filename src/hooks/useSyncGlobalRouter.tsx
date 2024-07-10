import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type RouteEvent = CustomEvent<string>;

const useSyncGlobalRouter = ({basename} : {basename : string }) => { // /stats-b
    const location = useLocation();
    const navigate = useNavigate();
    const newPath = '${basename}${location.pathname === "/" ? "" : location.pathname}';

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('app', {detail: newPath}));
    const appNavigated = ({ detail }: RouteEvent) => {
      if (detail === location.pathname) {
        return
      }
      navigate(detail);
    }
    window.addEventListener('shell', appNavigated as EventListener);
    return () => window.removeEventListener('shell', appNavigated as EventListener);
  }, [location.pathname]);
  

}
 export default useSyncGlobalRouter;