import { Button, Typography } from '@mui/material';
import { useContext } from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import './styles.scss';

const clientId = '840694087672-q5jr4irk22t3ompetcsu4n9m0ods8ack.apps.googleusercontent.com'

interface IProps {
    id?: string;
    text?: string | null;
}

export default function LoginButton({ id, text }: IProps) {
    const history = useHistory();
    const { setUser } = useContext(GlobalContext);

    function onSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
        if ('accessToken' in response) {
            history.push('/')
            setUser(response)
        } else {
            console.error('Login failed');
        }
    }

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
