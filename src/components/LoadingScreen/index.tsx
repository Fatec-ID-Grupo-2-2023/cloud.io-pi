import { Box, CircularProgress } from '@mui/material';
import LogoIcon from '../../assets/logo.svg';
import './styles.scss';

export default function LoadingScreen() {
    return (
        <Box className='loading-screen-container'>
            <img
                className='logo'
                src={LogoIcon}
                alt='cloud.io'
            />

            <CircularProgress
                color="primary"
                className='progress-spinner'
            />
        </Box>
    );
}