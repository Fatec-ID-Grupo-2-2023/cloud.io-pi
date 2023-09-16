import { GithubAuthProvider, GoogleAuthProvider, fetchSignInMethodsForEmail, signInWithRedirect } from 'firebase/auth';
import { auth } from '../../auth/firebase';

export function googleLogin(email?: string) {
    const provider = new GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/drive');
    provider.addScope('https://www.googleapis.com/auth/drive.file');
    provider.addScope('https://www.googleapis.com/auth/drive.appdata');
    provider.addScope('https://www.googleapis.com/auth/docs');

    if (email) {
        provider.setCustomParameters({
            login_hint: email
        });
    }

    signInWithRedirect(auth, provider).catch((err) => {
        console.error(err);
    });
}

export function githubLogin() {
    const provider = new GithubAuthProvider();

    signInWithRedirect(auth, provider).catch((err) => {
        console.error(err);
    });
}

export function linkAccounts(err: any) {
    fetchSignInMethodsForEmail(auth, err.customData.email).then((providers) => {
        sessionStorage.setItem('@cloudio:linkAccount', JSON.stringify(err));

        switch (providers[0]) {
            case 'google.com':
                googleLogin(err.customData.email);
                break;
            default:
                console.error('Provider not supported to link account');
                break;
        }
    });
}