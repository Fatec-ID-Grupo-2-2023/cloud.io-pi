import { Box, IconButton, Typography } from '@mui/material';
import { getRedirectResult } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import GithubIcon from '../../assets/github.svg';
import GoogleIcon from '../../assets/google.svg';
import LogoIcon from '../../assets/logo.svg';
import { auth } from '../../auth/firebase';
import { GlobalContext } from '../../contexts/GlobalContext';
import { githubLogin, googleLogin, linkAccounts } from './service';
import './style.scss';

export default function Login() {
	const { t } = useTranslation();
	const history = useHistory();

	const { googleSignIn, user } = useContext(GlobalContext);

	useEffect(() => {
		getRedirectResult(auth).then((result) => {
			if (result && result.providerId === 'google.com') {
				googleSignIn(result);
			}
		}).catch((err) => {
			if (err.code === 'auth/account-exists-with-different-credential') {
				//TODO: Create a message to the user

				linkAccounts(err);
			} else {
				console.error(err);
			}
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
						onClick={() => googleLogin()}
					>
						<img src={GoogleIcon} alt="google" />
					</IconButton>
					<IconButton
						className='login-icon-button'
						onClick={githubLogin}
					>
						<img src={GithubIcon} alt="github" />
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
}
