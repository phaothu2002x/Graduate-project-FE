import { Route } from 'react-router-dom';

const PrivateRoute = (props) => {
    return <Route path={props.path} element={props.component} />;
};

export default PrivateRoute;
