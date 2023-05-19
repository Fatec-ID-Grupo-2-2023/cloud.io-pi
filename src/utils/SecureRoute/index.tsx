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
    const { user } = useContext(GlobalContext);

    useEffect(() => {
        if (!user) {
            history.push('/login');
        }
    }, [user, history]);

    return (
        <>
            {
                user && (
                    <Route exact={exact} path={path} component={component} />
                )
            }
        </>
    );
}