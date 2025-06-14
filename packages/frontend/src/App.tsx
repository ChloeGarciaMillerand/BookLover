import { Routes, Route } from "react-router";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";

import HomePage from "./pages/HomePage";

function App() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-grow">
                TODO
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
