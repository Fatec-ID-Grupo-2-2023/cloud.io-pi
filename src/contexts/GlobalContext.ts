import { createContext } from 'react';
import { ICloudioFile, ICloudioStorage } from '../models/cloud';
import { IDropboxUser } from '../models/dropbox';
import { ILanguage } from '../models/general';
import { IGoogleUser } from '../models/google';

export interface IGlobalContext {
    googleUser: IGoogleUser;
    setGoogleUser: (user: IGoogleUser) => void;

    dropboxUser: IDropboxUser;
    setDropboxUser: (user: IDropboxUser) => void;

    cloudFiles: ICloudioFile[];
    trashedFiles: ICloudioFile[];

    cloudStorage: ICloudioStorage;

    language: ILanguage;
    setLanguage: (language: ILanguage) => void;
}

export const GlobalContext = createContext<IGlobalContext>({
    googleUser: undefined,
    setGoogleUser: () => null,

    dropboxUser: undefined,
    setDropboxUser: () => null,

    cloudFiles: [],
    trashedFiles: [],

    cloudStorage: {
        usage: 0,
        limit: 0,
        accounts: []
    },

    language: 'en',
    setLanguage: () => null
});