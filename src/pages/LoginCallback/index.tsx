import queryString from 'query-string';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen';
import { GlobalContext } from '../../contexts/GlobalContext';

export default function LoginCallback() {
    const { dropboxSignIn } = useContext(GlobalContext);

    const history = useHistory();

    const dropboxCredentials = queryString.parse(history.location.hash);

    if (dropboxCredentials && dropboxCredentials.access_token && dropboxCredentials.account_id && dropboxCredentials.token_type && dropboxCredentials.expires_in && dropboxCredentials.scope) {
        if (typeof dropboxCredentials.access_token !== 'string') {
            throw new Error('Invalid access token');
        }

        if (typeof dropboxCredentials.account_id !== 'string') {
            throw new Error('Invalid account id');
        }

        if (typeof dropboxCredentials.token_type !== 'string') {
            throw new Error('Invalid token type');
        }

        if (typeof dropboxCredentials.scope !== 'string') {
            throw new Error('Invalid scope');
        }

        if (typeof dropboxCredentials.expires_in !== 'string') {
            throw new Error('Invalid scope');
        }

        dropboxSignIn({
            access_token: dropboxCredentials.access_token,
            account_id: dropboxCredentials.account_id,
            token_type: dropboxCredentials.token_type,
            expires_in: Number(dropboxCredentials.expires_in),
            scope: dropboxCredentials.scope
        });
    }

    return (<LoadingScreen />)
}