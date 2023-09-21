import { User, UserCredential } from 'firebase/auth';
import { createContext } from 'react';
import { ICloudioFile, ICloudioStorage } from '../models/cloud';
import { ILanguage, IToken } from '../models/general';

export interface IGlobalContext {
    user?: User;

    googleSignIn: (user: UserCredential) => void;
    dropboxSignIn: (user: IToken) => void;

    signOut: () => void;

    cloudFiles?: ICloudioFile[];
    trashedFiles?: ICloudioFile[];

    cloudStorage?: ICloudioStorage;

    language: ILanguage;
    setLanguage: (language: ILanguage) => void;
}

export const GlobalContext = createContext<IGlobalContext>({} as IGlobalContext);