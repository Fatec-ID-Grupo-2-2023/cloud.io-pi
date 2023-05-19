import { Box, Typography } from '@mui/material';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LogoIcon from '../../assets/logo.svg';
import LoginButton from '../../components/LoginButton';
import './style.scss';

export default function Login() {
	const { t } = useTranslation();

	const clientId = '840694087672-q5jr4irk22t3ompetcsu4n9m0ods8ack.apps.googleusercontent.com'
	const apiKey = 'AIzaSyApWKH5LH8FD5Y7DP4_5COYy46v96PAJIE'
	const scope = 'https://www.googleapis.com/auth/drive'

	useEffect(() => {
		function start() {
			gapi.client.init({
				apiKey,
				clientId,
				scope
			})
		}
		gapi.load('client:auth2', start)
	}, []);

	return (
		<Box id='login'>
			<Box id='head'>
				<img
					id='logo'
					src={LogoIcon}
					alt='cloud.io'
				/>
			</Box>
			<Box id='body'>
				<Box id='login-title'>
					<Typography id='title' className='cloudio-title'>
						<span className='cloud'>Cloud</span><span className='dot'>.</span><span className='io'>io</span>
					</Typography>
					<Typography id='subtitle'>
						{t('CloudioLoginSubtitle')}
					</Typography>
				</Box>
				<LoginButton id='login-button' text={t('LoginWithGoogle')} />
			</Box>
		</Box>
	);
}
