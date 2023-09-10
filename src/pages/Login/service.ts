import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '../../auth/firebase';

export function googleLogin() {
    const provider = new GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/drive');
    provider.addScope('https://www.googleapis.com/auth/drive.file');
    provider.addScope('https://www.googleapis.com/auth/drive.appdata');
    provider.addScope('https://www.googleapis.com/auth/docs');

    signInWithRedirect(auth, provider).catch((err) => {
        console.error(err);
    });
}