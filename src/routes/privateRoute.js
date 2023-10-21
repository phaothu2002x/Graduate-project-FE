import { useEffect, react } from 'react';
import { Route } from 'react-router-dom';
import { privateRoutes } from '~/routes';
const PrivateRoute = (props) => {
    // useEffect(() => {}, []);
    return <Route path={props.path} element={props.component} />;
};

export default PrivateRoute;
