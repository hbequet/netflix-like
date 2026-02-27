import {useNavigate} from "react-router-dom";

function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem('user') !== null;
    let navigate = useNavigate();

    if (!isAuthenticated) {
        navigate('/login');
    }
    return children;
}
export default ProtectedRoute;
