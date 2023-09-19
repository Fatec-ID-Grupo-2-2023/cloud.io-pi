import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Cloud from '../../assets/cloud.svg';
import Logo from '../../assets/logo-and-name.svg';
import LogoutIcon from '../../assets/logout.svg';
import SettingsIcon from '../../assets/settings.svg';
import HomeIcon from '../../assets/home.svg';
import FolderIcon from '../../assets/folder.svg';
import ProgressBar from '../../components/ProgressBar';
import { GlobalContext } from '../../contexts/GlobalContext';
import LogoutButton from '../LogoutButton';
import './style.scss';

interface IProps {
	open: boolean;
	onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export default function Sidebar({ open, onClose }: IProps) {
	const { t } = useTranslation();
	const history = useHistory();
	const { cloudStorage: { usage, limit } } = useContext(GlobalContext);

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
			text: t('Settings'),
			img: SettingsIcon,
			onClick() { history.push('/settings') }
		},
	]
	const isDesktop = useMediaQuery('(min-width: 768px)');
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
				<ProgressBar usedCapacity={usage} totalCapacity={limit} />
			</Box>

			<List className='content-top'>
				{isDesktop ? (
					<><ListItem disablePadding>
						<ListItemButton onClick={() => history.push('/Home')}>
							<ListItemIcon>
								<img src={HomeIcon} alt='' />
							</ListItemIcon>
							<ListItemText primary={'Home'} />
						</ListItemButton>
					</ListItem><ListItem disablePadding>
							<ListItemButton onClick={() => history.push('/files')}>
								<ListItemIcon>
									<img src={FolderIcon} alt='' />
								</ListItemIcon>
								<ListItemText primary={'Files'} />
							</ListItemButton>
						</ListItem></>
				) : ('')}
			</List>
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
					<ListItemButton>
						<LogoutButton />
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
