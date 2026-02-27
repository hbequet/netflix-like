import Button from "../components/common/Button.jsx";
import {Link} from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";

function MyRentals() {
    const rentals = [];

    if (rentals.length === 0) return (
        <div className="min-h-screen bg-black text-white pt-24 px-8">
            <Navbar />

            <h1 className="text-4xl font-bold mb-12">Mes locations</h1>

            {rentals.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-20 gap-6">
                    <div className="text-gray-700">
                        <svg
                            width="100" height="100"
                            viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="1"
                            strokeLinecap="round" strokeLinejoin="round"
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M7 3v18M17 3v18M3 7h4M3 12h4M3 17h4M17 7h4M17 12h4M17 17h4" />
                        </svg>
                    </div>

                    <p className="text-gray-400 text-xl font-medium">
                        Aucune location pour le moment
                    </p>

                    <Link to="/">
                        <Button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-md font-bold transition-colors">
                            Découvrir des films
                        </Button>
                    </Link>
                </div>
            )}

            <Footer />
        </div>
    )

    return (
        <div>Pas vide</div>
    );
}

export default MyRentals;