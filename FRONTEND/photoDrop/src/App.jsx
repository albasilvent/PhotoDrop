import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/appPages/HomePage";
import { SearchPage } from "./components/appPages/SearchPage";
import "./App.css";
import { AuthProvider } from "./contexts/auth-context";
import { LoginPage } from "./components/appPages/LoginPage";
import { ProfilePage } from "./components/appPages/ProfilePage";
import { RegisterPage } from "./components/appPages/RegisterPage";
import { ValidateEmailPage } from "./components/appPages/ValidateEmailPage";
import { PostDetailsPage } from "./components/appPages/PostDetailsPage";
import { EditUserPage } from "./components/appPages/EditUserPage";

function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        element={<ValidateEmailPage />}
                        path="/validate-email"
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/users/:id" element={<ProfilePage />} />
                    <Route path="/posts/:id" element={<PostDetailsPage />} />
                    <Route path="/edit-user" element={<EditUserPage />} />
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
