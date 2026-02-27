import Button from "../components/common/Button.jsx";
import {useNavigate} from "react-router-dom";

function NotFound() {
    let navigate = useNavigate();

    return <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4 text-white">
            Page inconnue
        </h1>

        <Button size="sm" onClick={() => navigate("/")}>
            Retour à l'accueil
        </Button>
    </div>;
}

export default NotFound;