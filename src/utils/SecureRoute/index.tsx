import { ComponentType, ReactNode, useContext, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';

interface IProps {
    component: ComponentType<ReactNode>;
    path: string;
    exact?: boolean;
}

export default function ProtectedRoute({ exact, path, component }: IProps) {
    const history = useHistory();
    const { googleUser } = useContext(GlobalContext);

    useEffect(() => {
        if (!googleUser) {
            history.push('/login');
        }
    }, [googleUser, history]);

    return (
        <>
            {
                googleUser && (
                    <Route exact={exact} path={path} component={component} />
                )
            }
        </>
    );
}