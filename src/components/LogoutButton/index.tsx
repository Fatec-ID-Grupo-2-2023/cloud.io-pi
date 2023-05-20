import { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { GlobalContext } from '../../contexts/GlobalContext';
import './style.scss';

export default function LogoutButton() {
    const { setGoogleUser } = useContext(GlobalContext);

    const clientId = import.meta.env.VITE_GOOGLE_DRIVE_CLIENT_ID;

    return (
        <GoogleLogout
            className='logout-button'
            clientId={clientId}
            buttonText={'Logout'}
            onLogoutSuccess={() => setGoogleUser(undefined)}
        />
    )

}