import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/appPages/HomePage";
import { SearchPage } from "./components/appPages/SearchPage";
import "./App.css";
import { AuthProvider } from "./contexts/auth-context";

function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
