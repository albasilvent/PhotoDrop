import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/appPages/HomePage";
import { SearchPage } from "./components/appPages/SearchPage";
import "./App.css";
import { AuthProvider } from "./contexts/auth-context";
import { LoginPage } from "./components/appPages/LoginPage";
import { ProfilePage } from "./components/appPages/ProfilePage";
import { RegisterPage } from "./components/appPages/RegisterPage";
import { ValidateEmailPage } from "./components/appPages/ValidateEmailPage";
import { DeleteModalPage } from "./components/appPages/DeleteModalPage";

function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path= "/validate-email" element={<ValidateEmailPage/>}/>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/users/:id" element={<ProfilePage />} />
                    <Route path="/posts/delete" element={<DeleteModalPage />} />

                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;

