import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type RouteEvent = CustomEvent<string>;

const useSyncGlobalRouter = ({ basename }: { basename: string }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Combine basename and current pathname to form the new path
  const newPath = `${basename}${location.pathname === '/' ? '' : location.pathname}`;

  useEffect(() => {
    // Dispatch a custom event named 'app' with the new path as detail
    window.dispatchEvent(new CustomEvent('app', { detail: newPath }));

    // Define a function to handle 'shell' events and navigate accordingly
    const shellNavigated = (e: RouteEvent) => {
      if (e.detail === location.pathname) {
        return;
      }
      navigate(e.detail);
    };

    // Add an event listener for the 'shell' event
    window.addEventListener('shell', shellNavigated as EventListener);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('shell', shellNavigated as EventListener);
    };
  }, [location, basename, navigate]);

  return null;
};

export default useSyncGlobalRouter;
