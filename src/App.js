import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';

import PrivateRoute from './routes/privateRoute';
import ManageUser from './pages/ManageUser/manageUser';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}

                    {/* private routes */}
                    {privateRoutes.map((route, index) => {
                        const PrivatePage = route.component;
                        return <Route key={index} path={route.path} element={<PrivatePage />} />;
                    })}
                    {/* <PrivateRoute path="/manage-user" component={ManageUser} /> */}
                </Routes>
                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="light"
                />
            </div>
        </Router>
    );
}

export default App;
