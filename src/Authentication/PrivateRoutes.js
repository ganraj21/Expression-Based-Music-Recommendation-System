import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { MusicContext } from '../MusicContext';
export const PrivateRoutes = () => {
  const { userId } = useContext(MusicContext);

  return userId ? <Outlet /> : <Navigate to="/" />;
};
