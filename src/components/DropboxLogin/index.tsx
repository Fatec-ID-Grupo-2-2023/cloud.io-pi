import queryString from 'query-string';
import { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { GlobalContext } from '../../contexts/GlobalContext';



export default function DropboxLogin() {
    const history = useHistory();
    const { setDropboxUser } = useContext(GlobalContext);

    const user = queryString.parse(history.location.hash);

    if (user.access_token && user.account_id && user.token_type && user.expires_in && user.scope) {
        if (typeof user.access_token !== 'string') {
            throw new Error('Invalid access token');
        }

        if (typeof user.account_id !== 'string') {
            throw new Error('Invalid account id');
        }

        if (typeof user.token_type !== 'string') {
            throw new Error('Invalid token type');
        }

        if (typeof user.scope !== 'string') {
            throw new Error('Invalid scope');
        }

        setDropboxUser({
            access_token: user.access_token,
            account_id: user.account_id,
            token_type: user.token_type,
            expires_in: Number(user.expires_in),
            scope: user.scope,
        })
    }

    history.push('/');

    return null;
}