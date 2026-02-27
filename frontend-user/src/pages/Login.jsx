import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import Button from "../components/common/Button.jsx";

function Login() {
    const [formData, setFormData] = useState({email: "", password: ""});
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setTimeout(() => {
            localStorage.setItem('user',
                JSON.stringify({email: formData.email,
                name: formData.email.split('@')[0]
                }));
            setLoading(false);
            navigate("/");
        }, 1000);
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.email) errors.email = "Email requis";
        if (!formData.password) errors.password = "Mot de passe requis";
        return errors;
    }

    if (loading) return <p className="text-center py-10">Chargement du questionnaire</p>;

    function setEmail(value) {
        setFormData({...formData, email: value});
    }

    function setPassword(value) {
        setFormData({...formData, password: value});
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-red-600 text-6xl font-bold mb-8">
                NETFLUX
            </h1>

            <div className="w-full max-w-md p-12 bg-black/80 border border-gray-800 rounded-md">
                <h2 className="text-3xl font-bold mb-8">Se connecter</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            value={formData.email || ''}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors && !formData.email && (
                            <span className="text-red-600 text-sm">Email requis</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            value={formData.password || ''}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors && !formData.password && (
                            <span className="text-red-500 text-sm">Mot de passe requis</span>
                        )}
                    </div>

                    <div className="w-full flex justify-center">
                        <Button className="w-full bg-red-600 py-4" type="submit">
                            Se connecter
                        </Button>
                    </div>
                </form>

                <p className="mt-8 text-gray-500 text-center">
                    Pas encore de compte ?
                    <Link to="/register" className="text-red-600 hover:underline">
                        S'inscrire
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;