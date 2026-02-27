import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import MyRentals from './pages/MyRentals';
{/*
import Register from './pages/Register';
*/}
function App() {
    return (
        <div className="bg-black text-white min-h-screen">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                    <Route path="/login" element={<Login />} />
                    {/*<Route path="/register" element={<Register />} />*/}

                    <Route
                        path="/my-rentals"
                        element={
                            <ProtectedRoute>
                                <MyRentals />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
