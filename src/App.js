import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';

import PrivateRoute from './routes/privateRoute';
import { CartProvider } from './components/Header/CartContext';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import './App.scss';
import AdminNavbar from './components/AdminNavbar/adminNav';
import AOS from 'aos';
import 'aos/dist/aos.css';
function App() {
    const { user } = useContext(UserContext);
    AOS.init();

    return (
        <CartProvider>
            <Router>
                {user && user.isLoading ? (
                    <div className="loading-box">
                        <ClimbingBoxLoader color="#36d7b7" className="loading-icon" size={30} />
                        <span className="loading-text">Loading Data...</span>
                    </div>
                ) : (
                    <div className="App">
                        {user.account.groupWithRole && user.account.groupWithRole.name === 'Admin' ? (
                            <>
                                <Header />
                                <AdminNavbar />
                            </>
                        ) : (
                            <Header />
                        )}

                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                return <Route key={index} path={route.path} element={<Page />} />;
                            })}
                            <Route element={<PrivateRoute />}>
                                {privateRoutes.map((route, index) => {
                                    const PrivatePage = route.component;
                                    return <Route key={index} path={route.path} element={<PrivatePage />} />;
                                })}
                            </Route>
                        </Routes>
                        <Footer />
                    </div>
                )}
                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="light"
                />
            </Router>
        </CartProvider>
    );
}

export default App;
