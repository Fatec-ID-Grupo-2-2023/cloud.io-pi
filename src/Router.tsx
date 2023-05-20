import { Route, Switch } from 'react-router-dom';
import App from './App';
import { GlobalContext } from './contexts/GlobalContext';
import useGlobalContext from './contexts/useGlobalContext';
import Files from './pages/Files';
import Home from './pages/Home';
import Login from './pages/Login';
import Settings from './pages/Settings';

import DropboxLogin from './components/DropboxLogin';
import Trash from './pages/Trash';
import ProtectedRoute from './utils/SecureRoute';

export default function Router() {
    const globalContext = useGlobalContext();

    return (
        <GlobalContext.Provider value={globalContext}>
            <App>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <ProtectedRoute path='/files/:origin/:type' component={Files} />
                    <ProtectedRoute exact path='/files' component={Files} />
                    <ProtectedRoute exact path='/trash' component={Trash} />
                    <ProtectedRoute exact path='/settings' component={Settings} />
                    <ProtectedRoute exact path='/' component={Home} />
                    <Route path='/' component={DropboxLogin} />
                </Switch>
            </App>
        </GlobalContext.Provider>
    );
}