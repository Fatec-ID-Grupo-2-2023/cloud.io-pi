import { FirebaseError } from 'firebase/app';
import { AuthProvider, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, OAuthCredential, User, fetchSignInMethodsForEmail, linkWithCredential, signInWithRedirect } from 'firebase/auth';
import { auth } from '../../auth/firebase';

function login(provider: AuthProvider) {
    signInWithRedirect(auth, provider).catch((err) => {
        console.error(err);
    });
}

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

    login(provider);
}

export function githubLogin() {
    const provider = new GithubAuthProvider();

    login(provider);
}

export function facebookLogin() {
    const provider = new FacebookAuthProvider();

    login(provider);
}

export function linkAccounts(err: FirebaseError) {
    if (err.customData) {
        const email = err.customData.email as string;

        fetchSignInMethodsForEmail(auth, email).then((providers) => {
            sessionStorage.setItem('@cloudio:linkAccount', JSON.stringify(err));

            if (providers.includes('google.com')) {
                googleLogin(email);
            } else {
                //TODO create an error screen
                console.error('Provider not supported to link account');
            }
        });
    }
}

export function linkAccountCheck(user: User) {
    const linkAccount = JSON.parse(sessionStorage.getItem('@cloudio:linkAccount') ?? '{}') as FirebaseError;

    let credential: OAuthCredential | null = null;

    if (!linkAccount.customData) return;

    const token: any = linkAccount.customData._tokenResponse;

    switch (token.providerId) {
        case 'github.com':
            credential = GithubAuthProvider.credentialFromError(linkAccount);
            break;
        case 'facebook.com':
            credential = FacebookAuthProvider.credentialFromError(linkAccount);
            break;
        default:
            console.error('Provider not supported to link account check');
            break;
    }

    if (credential) {
        linkWithCredential(user, credential).catch((err) => {
            console.error(err);
        }).finally(() => {
            sessionStorage.removeItem('@cloudio:linkAccount');
        });
    }
}