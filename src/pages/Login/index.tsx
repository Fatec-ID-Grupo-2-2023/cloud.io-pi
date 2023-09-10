import { Box, IconButton, Typography } from '@mui/material';
import { getRedirectResult } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import GoogleIcon from '../../assets/google.svg';
import LogoIcon from '../../assets/logo.svg';
import { auth } from '../../auth/firebase';
import { GlobalContext } from '../../contexts/GlobalContext';
import { googleLogin } from './service';
import './style.scss';

export default function Login() {
	const { t } = useTranslation();
	const history = useHistory();

	const { googleSignIn, user } = useContext(GlobalContext);

	useEffect(() => {
		console.log('entrou')
		getRedirectResult(auth).then((result) => {
			console.log('entrou fundinho')
			if (result) {
				console.log('entrou fundo')
				switch (result.providerId) {
					case 'google.com':
						console.log('entrou fundão')
						googleSignIn(result);
						break;
					default:
						console.error('Provider not supported');
						break;
				}
			}
		}).catch((error) => {
			console.error(error);
		});
	}, [googleSignIn])

	useEffect(() => {
		if (user) {
			history.push('/');
		}
	}, [user, history]);

	console.log('kk')

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
				<Box id="login-buttons">
					<IconButton
						className='login-icon-button'
						onClick={googleLogin}
					>
						<img src={GoogleIcon} alt="google" />
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
}
