import { Button, Typography } from '@mui/material';
import { useContext } from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import './styles.scss';

interface IProps {
    id?: string;
    text?: string | null;
}

export default function LoginButton({ id, text }: IProps) {
    const history = useHistory();
    const { setGoogleUser } = useContext(GlobalContext);

    function onSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
        if ('accessToken' in response) {
            history.push('/')
            setGoogleUser(response)
        } else {
            console.error('Login failed');
        }
    }

    const clientId = import.meta.env.VITE_GOOGLE_DRIVE_CLIENT_ID;

    return (
        <GoogleLogin
            clientId={clientId}
            render={renderProps => (
                <Button
                    id={id}
                    className='google-login-button'
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                >
                    <img src='src\assets\google.svg' />
                    <Typography className='google-login-button-text'>
                        {text}
                    </Typography>
                </Button>
            )}
            buttonText='Login'
            onSuccess={onSuccess}
            onFailure={() => console.log('kk')}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    )

}
