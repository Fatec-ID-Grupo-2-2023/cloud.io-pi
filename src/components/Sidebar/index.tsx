import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Cloud from '../../assets/cloud.svg';
import LicenseIcon from '../../assets/license.svg';
import Logo from '../../assets/logo-and-name.svg';
import LogoutIcon from '../../assets/logout.svg';
import SettingsIcon from '../../assets/settings.svg';
import ProgressBar from '../../components/ProgressBar';
import { GlobalContext } from '../../contexts/GlobalContext';
import './style.scss';

interface IProps {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export default function Sidebar({ open, onClose }: IProps) {
    const { t } = useTranslation();
    const history = useHistory();
    const { cloudStorage, signOut } = useContext(GlobalContext);

    const items = [
        // {
        //     text: t('Recents'),
        //     img: RecentIcon,
        //     onClick() { console.log('Recent') }
        // },
        // {
        //     text: t('Trash'),
        //     img: TrashIcon,
        //     onClick() { history.push('/trash') }
        // },
        {
            text: t('PrivacyPolicy'),
            img: LicenseIcon,
            onClick() { window.open('https://fatecspgov-my.sharepoint.com/:w:/g/personal/gianluca_micheli_fatec_sp_gov_br/EQX3GpC-MBZJj4Bju27kzPQBIentXa50UId4NyCt1dWnGg?e=5ob94Z', '_blank') }
        },
        {
            text: t('TermsOfUse'),
            img: LicenseIcon,
            onClick() { window.open('https://fatecspgov-my.sharepoint.com/:w:/g/personal/gianluca_micheli_fatec_sp_gov_br/EXv-m1CNBIZMl-NqtG5t-Z0ByiFp9_4H7PJhJQRUPH20ag?e=nJIg5y', '_blank') }
        },
        {
            text: t('Settings'),
            img: SettingsIcon,
            onClick() { history.push('/settings') }
        },
    ]

    return (
        <Drawer id='sidebar' anchor={'left'} open={open} onClose={onClose}>
            <Box className='header'>
                <img src={Logo} alt='' />
            </Box>
            <Box className='storage'>
                <Box className='item'>
                    <img src={Cloud} alt='' />
                    <Typography variant='body1'>{t('Storage')}</Typography>
                </Box>
                {cloudStorage ? (
                    <ProgressBar usedCapacity={cloudStorage.usage} totalCapacity={cloudStorage.limit} />
                ) : null}
            </Box>
            <List className='content'>
                {items.map(({ text, img, onClick }, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={onClick}>
                            <ListItemIcon>
                                <img src={img} alt={text} />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton onClick={signOut}>
                        <ListItemIcon>
                            <img src={LogoutIcon} alt='' />
                        </ListItemIcon>
                        <ListItemText primary={'Logout'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}