import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';

import PrivateRoute from './routes/privateRoute';
import { CartProvider } from './components/Header/CartContext';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="App">
                    <Header />
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
                            {/* <Route path="/manage-user" element={<ManageUser />} /> */}
                        </Route>
                    </Routes>
                    <Footer />
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
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
