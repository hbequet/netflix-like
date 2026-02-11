import Footer from "./components/layout/Footer";
import Navbar from "./components/common/Navbar.jsx";
import Home from "./pages/Home.jsx";

function App() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />
            <main className="flex-grow flex items-center justify-center">
                <Home />

            </main>
            <Footer />
        </div>
    )
}
export default App