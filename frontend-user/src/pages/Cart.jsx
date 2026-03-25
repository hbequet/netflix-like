import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import Button from "../components/common/Button.jsx";
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

function Cart() {
    const { cart, removeFromCart, getCartTotal, clearCart, rentAllInCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-black text-white pt-24 px-8 flex flex-col">
                <Navbar />
                <div className="grow flex flex-col items-center justify-center gap-6">
                    <h1 className="text-4xl font-bold">Mon Panier</h1>
                    <p className="text-gray-400 text-xl">Votre panier est vide...</p>
                    <Link to="/">
                        <Button className="bg-red-600 hover:bg-red-700">Parcourir les films</Button>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-8">
            <Navbar />

            <h1 className="text-4xl font-bold mb-12">Mon Panier</h1>

            <div className=" mx-auto flex flex-col lg:flex-row gap-8">

                {/* Film list (left) */}
                <div className="grow space-y-4">
                    {cart.map((movie) => (
                        <div key={movie._id} className="flex bg-[#0f121d] rounded-lg overflow-hidden border border-gray-800 p-4 items-center group">
                            {/* Poster */}
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-20 h-28 object-cover rounded-md shadow-lg"
                            />

                            {/* Infos */}
                            <div className="ml-6 grow">
                                <h3 className="text-xl font-bold">{movie.title}</h3>
                                <p className="text-gray-500 text-sm">
                                    {movie.year} • {movie.genre} • {movie.duration}min
                                </p>
                                <p className="text-red-500 font-bold mt-2 text-lg">
                                    {movie.price}€
                                </p>
                            </div>

                            {/* Delete button */}
                            <button
                                onClick={() => removeFromCart(movie._id)}
                                className="p-3 text-gray-500 hover:text-red-500 transition-colors"
                                title="Supprimer du panier"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Summary (right) */}
                <div className="lg:w-96">
                    <div className="bg-[#0f121d] rounded-lg p-6 border border-gray-800 sticky top-32">
                        <h2 className="text-2xl font-bold mb-6">Résumé</h2>

                        <div className="space-y-4 text-gray-400">
                            <div className="flex justify-between">
                                <span>Nombre de films:</span>
                                <span className="text-white font-medium">{cart.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Durée de location:</span>
                                <span className="text-white font-medium">7 jours</span>
                            </div>
                        </div>

                        <div className="my-6 border-t border-gray-800 pt-6 flex justify-between items-baseline">
                            <span className="text-2xl font-bold text-white">Total:</span>
                            <span className="text-3xl font-black text-red-600">{getCartTotal()}€</span>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={rentAllInCart}
                                className="w-full bg-red-600 hover:bg-red-700 py-4 text-lg font-bold tracking-wider"
                            >
                                Louer tout ({cart.length} films)
                            </Button>

                            <Button
                                onClick={clearCart}
                                variant="secondary"
                                className="w-full border-gray-700 hover:bg-gray-800 py-2 text-sm text-gray-400"
                            >
                                Vider le panier
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Cart;