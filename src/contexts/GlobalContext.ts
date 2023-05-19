import { createContext } from 'react';
import { ICloudioFile, ICloudioStorage } from '../models/cloud';
import { ILanguage } from '../models/general';
import { IGoogleUser } from '../models/google';

export interface IGlobalContext {
    user: IGoogleUser;
    setUser: (user: IGoogleUser) => void;

    cloudFiles: ICloudioFile[];
    trashedFiles: ICloudioFile[];

    cloudStorage: ICloudioStorage;

    language: ILanguage;
    setLanguage: (language: ILanguage) => void;
}

export const GlobalContext = createContext<IGlobalContext>({
    user: undefined,
    setUser: () => null,

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