import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { buildTree, matchTree } from '../helpers/buildTree';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { ICloudioAccount, ICloudioCapacity, ICloudioFile, ICloudioStorage } from '../models/cloud';
import { IDropboxUser } from '../models/dropbox';
import { IGoogleUser } from '../models/google';
import { getDropboxAbout, getDropboxFiles } from '../services/fetchDropboxData';
import { getGoogleDriveAbout, getGoogleDriveFiles } from '../services/fetchGoogleDriveData';
import { deepCopy } from '../utils/deepCopy';
import { IGlobalContext } from './GlobalContext';

export default function useGlobalContext(): IGlobalContext {
    const { i18n } = useTranslation();

    const [googleUser, setGoogleUser] = useState<IGoogleUser>(undefined);
    const [dropboxUser, setDropboxUser] = useState<IDropboxUser>(undefined);

    const [language, setLanguage] = useLocalStorage('language', 'en');

    const [googleDriveFiles, setGoogleDriveFiles] = useState<ICloudioFile[]>([]);
    const [googleDriveStorage, setGoogleDriveStorage] = useState<ICloudioCapacity>();

    const [dropboxFiles, setDropboxFiles] = useState<ICloudioFile[]>([]);
    const [dropboxStorage, setDropboxStorage] = useState<ICloudioCapacity>();

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [i18n, language])


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
        if (googleUser) {
            getGoogleDriveFiles(googleUser.accessToken).then((files) => {
                setGoogleDriveFiles(files);
            }).catch((error) => {
                console.error(error);
            });

            getGoogleDriveAbout(googleUser.accessToken).then((response) => {
                setGoogleDriveStorage(response);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [googleUser]);

    useEffect(() => {
        if (dropboxUser) {

            getDropboxFiles(dropboxUser.access_token).then((files) => {
                setDropboxFiles(files);
            }).catch((error) => {
                console.error(error);
            });

            getDropboxAbout(dropboxUser.access_token).then((response) => {
                setDropboxStorage(response);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [dropboxUser]);

    return useMemo(() => ({
        googleUser,
        setGoogleUser,
        dropboxUser,
        setDropboxUser,
        cloudFiles,
        trashedFiles,
        cloudStorage,
        language,
        setLanguage
    }), [
        googleUser,
        setGoogleUser,
        dropboxUser,
        setDropboxUser,
        cloudFiles,
        trashedFiles,
        cloudStorage,
        language,
        setLanguage
    ]);
}