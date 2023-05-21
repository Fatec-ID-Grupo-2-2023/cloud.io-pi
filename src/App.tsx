import { Box } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type IProps = {
  children: ReactNode;
}

export default function App({ children }: IProps) {
  const { pathname } = useLocation();

  // useEffect(() => {
  //   const siteId = import.meta.env.VITE_HOTJAR_SITE_ID;
  //   const hotjarVersion = 6;

  //   Hotjar.init(siteId, hotjarVersion);
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box id='App'>
      {children}
    </Box>
  )
}