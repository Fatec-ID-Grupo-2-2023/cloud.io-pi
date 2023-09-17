import { Box, IconButton, Typography } from '@mui/material';
import { getRedirectResult } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import FacebookIcon from '../../assets/facebook.svg';
import GithubIcon from '../../assets/github.svg';
import GoogleIcon from '../../assets/google.svg';
import LogoIcon from '../../assets/logo.svg';
import TwitterIcon from '../../assets/twitter.svg';
import { auth } from '../../auth/firebase';
import { GlobalContext } from '../../contexts/GlobalContext';
import { facebookLogin, githubLogin, googleLogin, linkAccounts, twitterLogin } from './service';
import './style.scss';

export default function Login() {
	const { googleSignIn, user } = useContext(GlobalContext);

	const { t } = useTranslation();
	const history = useHistory();

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
						<img src={GoogleIcon} alt="Google" />
					</IconButton>
					<IconButton
						className='login-icon-button'
						onClick={githubLogin}
					>
						<img src={GithubIcon} alt="Github" />
					</IconButton>
					<IconButton
						className='login-icon-button'
						onClick={facebookLogin}
					>
						<img src={FacebookIcon} alt="Facebook" />
					</IconButton>
					<IconButton
						className='login-icon-button'
						onClick={twitterLogin}
					>
						<img src={TwitterIcon} alt="Twitter" />
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
}
