import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import Button from "../components/common/Button.jsx";

function Register() {
    const [formData, setFormData] = useState({name: "", email: "", password: "", passwordConfirm: ""});
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) {
            newErrors.name = "Nom requis";
        }
        if (!formData.email) {
            newErrors.email = "Email requis";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email invalide";
        }
        if (!formData.password) {
            newErrors.password = "Mot de passe requis";
        } else if (formData.password.length < 6) {
            newErrors.password = "Au moins 6 caractères";
        }
        if (formData.password !== formData.passwordConfirm) {
            newErrors.passwordConfirm = "Les mots de passe ne correspondent pas";
        }
        return newErrors;
    }

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

    if (loading) return <p className="text-center py-10">Chargement du questionnaire</p>;

    function setName(value) {
        setFormData({...formData, name: value});
    }

    function setEmail(value) {
        setFormData({...formData, email: value});
    }

    function setPassword(value) {
        setFormData({...formData, password: value});
    }

    function setPasswordConfirm(value) {
        setFormData({...formData, passwordConfirm: value});
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
                            type="name"
                            placeholder="Nom"
                            className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            value={formData.name || ''}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors && !formData.name && (
                            <span className="text-red-600 text-sm">Nom requis</span>
                        )}
                    </div>

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

                    <div className="flex flex-col gap-1">
                        <input
                            type="password"
                            placeholder="Confirmez le Mot de passe"
                            className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            value={formData.passwordConfirm || ''}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />

                        {errors && !formData.passwordConfirm && (
                            <span className="text-red-500 text-sm">Mot de passe requis</span>
                        )}
                    </div>

                    <div className="w-full flex justify-center">
                        <Button className="w-full bg-red-600 py-4" type="submit">
                            S'inscrire
                        </Button>
                    </div>
                </form>

                <p className="mt-8 text-gray-500 text-center">
                    Déjà un compte ?
                    <Link to="/register" className="text-red-600 hover:underline">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;