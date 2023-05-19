import { Box } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type IProps = {
  children: ReactNode;
}

export default function App({ children }: IProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box id='App'>
      {children}
    </Box>
  )
}