import { Avatar, Box, Button, IconButton, Modal, Typography } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AccountIcon from '../../assets/Account.svg';
import LogoutIcon from '../../assets/Logout.svg';
import CloseIcon from '../../assets/close.svg';
import { GlobalContext } from '../../contexts/GlobalContext';
import LogoutButton from '../LogoutButton';
import './style.scss';

interface IProps {
    open: boolean;
    onClose: () => void;
}

export default function ProfileBox({ open, onClose }: IProps) {
    const { t } = useTranslation();
    const { googleUser } = useContext(GlobalContext);

    return (
        <Box>
            <Modal
                open={open}
                onClose={onClose}
            >
                <Box id='profile-box'>
                    <IconButton id='close-button' color='secondary' component='label' onClick={onClose}>
                        <img src={CloseIcon} alt='' />
                    </IconButton>
                    <Typography className='cloudio-title'>
                        <span className='cloud'>Cloud</span><span className='dot'>.</span><span className='io'>io</span>
                    </Typography>
                    <Box id='modal-modal-description'>
                        <Avatar
                            className='avatar'
                            src={googleUser?.profileObj.imageUrl ?? AccountIcon}
                            alt={googleUser?.profileObj.givenName ?? 'User'}
                            imgProps={{
                                referrerPolicy: 'no-referrer'
                            }}
                        />
                        <Box id='user-info'>
                            <Typography id='user-name'>{googleUser?.profileObj.name}</Typography>
                            <Typography id='user-email'>{googleUser?.profileObj.email}</Typography>
                        </Box>
                    </Box>
                    <Box id='modal-footer'>
                        <Button id='logout-button' color='secondary'>
                            <LogoutButton />
                            <img src={LogoutIcon} alt='' />
                            <Typography id='logout-text'>{t('Logout')}</Typography>
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}