import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { buildTree, matchTree } from '../helpers/buildTree';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { ICloudioCapacity, ICloudioFile, ICloudioStorage } from '../models/cloud';
import { IGoogleUser } from '../models/google';
import { getDropboxAbout, getDropboxFiles } from '../services/fetchDropboxData';
import { getGoogleDriveAbout, getGoogleDriveFiles } from '../services/fetchGoogleDriveData';
import { deepCopy } from '../utils/deepCopy';
import { IGlobalContext } from './GlobalContext';

export default function useGlobalContext(): IGlobalContext {
    const { i18n } = useTranslation();

    const [user, setUser] = useState<IGoogleUser>(undefined);

    const [language, setLanguage] = useLocalStorage('language', 'en');

    const [googleDriveFiles, setGoogleDriveFiles] = useState<ICloudioFile[]>([]);
    const [googleDriveStorage, setGoogleDriveStorage] = useState<ICloudioCapacity>({
        usage: 0,
        limit: 0
    });

    const [dropboxFiles, setDropboxFiles] = useState<ICloudioFile[]>([]);
    const [dropboxStorage, setDropboxStorage] = useState<ICloudioCapacity>({
        usage: 0,
        limit: 0
    });

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

        // console.log(files);

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
        const usage = googleDriveStorage.usage + dropboxStorage.usage;
        const limit = googleDriveStorage.limit + dropboxStorage.limit;

        return {
            usage,
            limit,
            accounts: [
                {
                    id: 'google-drive',
                    name: 'Google Drive',
                    usage: googleDriveStorage.usage,
                    limit: googleDriveStorage.limit
                },
                {
                    id: 'dropbox',
                    name: 'Dropbox',
                    usage: dropboxStorage.usage,
                    limit: dropboxStorage.limit
                }
            ]
        };
    }, [googleDriveStorage, dropboxStorage]);


    useEffect(() => {
        if (user) {
            getGoogleDriveFiles(user.accessToken).then((files) => {
                setGoogleDriveFiles(files);
            }).catch((error) => {
                console.error(error);
            });

            getGoogleDriveAbout(user.accessToken).then((response) => {
                setGoogleDriveStorage(response);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [user]);

    useEffect(() => {
        const token = 'sl.BerpZYdJPsLnDhnKXHIQkZIJsJiXPamdKZar1yaMmuI9fBy-M_oDzku4eXxPz118VziR0U9ar9WpOasMuLODHMh-lPzqS5gn1NQC9Q9OOocIJ__be7S8PiBVRFlp2stsUjIitcAq';
        // const token = 'sl.BeVNnylxvXjPt0Var1hWZjdkMFdSU0Jqm84dhB9fayDhN0N7mNIBfyTYO7pmBAvHQhJm2BVdbZ1_o0G9WEpAwuQoRkE7t0yhtREu1DliqECzMSpDRdI2CawK3vaRpXo9eSdq0zuK_h4';

        getDropboxFiles(token).then((files) => {
            setDropboxFiles(files);
        }).catch((error) => {
            console.error(error);
        });

        getDropboxAbout(token).then((response) => {
            setDropboxStorage(response);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return useMemo(() => ({
        user,
        setUser,
        cloudFiles,
        trashedFiles,
        cloudStorage,
        language,
        setLanguage
    }), [
        user,
        setUser,
        cloudFiles,
        trashedFiles,
        cloudStorage,
        language,
        setLanguage
    ]);
}