import { GoogleAuthProvider, User, UserCredential, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { auth } from '../auth/firebase';
import { buildTree, matchTree } from '../helpers/buildTree';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { ICloudioAccount, ICloudioCapacity, ICloudioFile, ICloudioStorage } from '../models/cloud';
import { IToken } from '../models/general';
import { getDropboxAbout, getDropboxFiles } from '../services/fetchDropboxData';
import { getGoogleDriveAbout, getGoogleDriveFiles } from '../services/fetchGoogleDriveData';
import { deepCopy } from '../utils/deepCopy';
import { IGlobalContext } from './GlobalContext';

export default function useGlobalContext(): IGlobalContext {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'en');

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [i18n, language]);

    useEffect(() => {
        const _googleToken = JSON.parse(localStorage.getItem('@cloudio:googleToken') ?? '{}') as IToken;

        if (_googleToken.access_token) {
            setGoogleToken(_googleToken);
        }

        const _dropboxToken = JSON.parse(localStorage.getItem('@cloudio:dropboxToken') ?? '{}') as IToken;

        if (_dropboxToken.access_token) {
            setDropboxToken(_dropboxToken);
        }
    }, [])

    const [user, setUser] = useState<User>();

    const [googleToken, setGoogleToken] = useState<IToken>();
    const [dropboxToken, setDropboxToken] = useState<IToken>();

    async function signOut() {
        localStorage.removeItem('@cloudio:token');
        setUser(undefined);
    }

    onAuthStateChanged(auth, async (_user) => {
        if (!_user) {
            localStorage.removeItem('@cloudio:token');
        } else {
            const token = await _user.getIdToken();

            localStorage.setItem('@cloudio:token', token);
        }

        setUser(_user ?? undefined);
    });

    async function googleSignIn(credentials: UserCredential) {
        const credential = GoogleAuthProvider.credentialFromResult(credentials);

        if (credential?.accessToken) {
            const token = {
                access_token: credential.accessToken,
                account_id: credential.idToken ?? '',
                token_type: 'Bearer',
                expires_in: 3600,
                scope: 'https://www.googleapis.com/auth/drive'
            };

            localStorage.setItem('@cloudio:googleToken', JSON.stringify(token));

            setGoogleToken(token);
        }
    }

    async function dropboxSignIn(user?: IToken) {
        if (user && user.access_token && user.account_id && user.token_type && user.expires_in && user.scope) {
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

            const _dropboxToken = {
                access_token: user.access_token,
                account_id: user.account_id,
                token_type: user.token_type,
                expires_in: Number(user.expires_in),
                scope: user.scope,
            };

            localStorage.setItem('@cloudio:dropboxToken', JSON.stringify(_dropboxToken));

            setDropboxToken(_dropboxToken);
        } else {
            const clientId = import.meta.env.VITE_DROPBOX_CLIENT_ID;

            // if (token) {
            //     const clientSecret = import.meta.env.VITE_DROPBOX_CLIENT_SECRET;

            //     axios.get('https://api.dropbox.com/oauth2/token', {
            //         params: {
            //             refresh_token: token,
            //             grant_type: 'refresh_token',
            //             client_id: clientId,
            //             client_secret: clientSecret
            //         }
            //     });
            // } else {

            // const response = await axios.get('https://api.dropbox.com/oauth2/authorize', {
            //     params: {
            //         response_type: 'code',
            //         client_id: clientId,
            //         redirect_uri: window.location.origin,
            //         token_access_type: 'offline'
            //     }
            // });

            // console.log(response);

            window.open(`https://dropbox.com/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${window.location.origin}`, '_self');
        }
        // }
    }


    const [googleDriveFiles, setGoogleDriveFiles] = useState<ICloudioFile[]>([]);
    const [googleDriveStorage, setGoogleDriveStorage] = useState<ICloudioCapacity>();

    const [dropboxFiles, setDropboxFiles] = useState<ICloudioFile[]>([]);
    const [dropboxStorage, setDropboxStorage] = useState<ICloudioCapacity>();

    const cloudFiles = useMemo<ICloudioFile[]>(() => {
        const gdFiles = deepCopy(googleDriveFiles);
        const dbFiles = deepCopy(dropboxFiles);

        const files = [
            ...gdFiles,
            ...dbFiles
        ];

        const tree = buildTree(files);
        const matchedTree = matchTree(tree);

        return matchedTree;
    }, [googleDriveFiles, dropboxFiles]);

    const trashedFiles: ICloudioFile[] = [];

    // const trashedFiles = useMemo<ICloudioFile[]>(() => {
    //     const googleFiles = googleDriveFiles.filter(({ trashed }) => trashed);

    //     const files = [...googleFiles];

    //     return files;
    // }, [googleDriveFiles]);

    const cloudStorage = useMemo<ICloudioStorage>(() => {
        const accounts: ICloudioAccount[] = [];
        let usage = 0;
        let limit = 0;

        if (googleDriveStorage) {
            usage += googleDriveStorage.usage;
            limit += googleDriveStorage.limit;

            accounts.push({
                id: 'google-drive',
                name: 'Google Drive',
                usage: googleDriveStorage.usage,
                limit: googleDriveStorage.limit
            });
        }

        if (dropboxStorage) {
            usage += dropboxStorage.usage;
            limit += dropboxStorage.limit;

            accounts.push({
                id: 'dropbox',
                name: 'Dropbox',
                usage: dropboxStorage.usage,
                limit: dropboxStorage.limit
            });
        }


        return {
            usage,
            limit,
            accounts
        };
    }, [googleDriveStorage, dropboxStorage]);

    useEffect(() => {
        if (googleToken) {
            getGoogleDriveFiles(googleToken.access_token).then((files) => {
                setGoogleDriveFiles(files);
            }).catch((error) => {
                console.error(error);
            });

            getGoogleDriveAbout(googleToken.access_token).then((response) => {
                setGoogleDriveStorage(response);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [googleToken]);

    useEffect(() => {
        if (dropboxToken) {

            getDropboxFiles(dropboxToken.access_token).then((files) => {
                setDropboxFiles(files);
            }).catch((error) => {
                console.error(error);
            });

            getDropboxAbout(dropboxToken.access_token).then((response) => {
                setDropboxStorage(response);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [dropboxToken]);

    return useMemo(() => ({
        user,
        googleSignIn,
        dropboxSignIn,
        signOut,
        cloudFiles,
        trashedFiles,
        cloudStorage,
        language,
        setLanguage,
    }), [user, cloudFiles, trashedFiles, cloudStorage, language, setLanguage]);
}