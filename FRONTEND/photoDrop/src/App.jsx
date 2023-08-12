import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/appPages/HomePage";
import { SearchPage } from "./components/appPages/SearchPage";
import { AuthProvider } from "./contexts/auth-context";
import { LoginPage } from "./components/appPages/LoginPage";
import { ProfilePage } from "./components/appPages/ProfilePage";
import { RegisterPage } from "./components/appPages/RegisterPage";
import { ValidateEmailPage } from "./components/appPages/ValidateEmailPage";
import { PostDetailsPage } from "./components/appPages/PostDetailsPage";
import { EditUserPage } from "./components/appPages/EditUserPage";
import { EditPostPage } from "./components/appPages/EditPostPage";
import { NotFoundPage } from "./components/appPages/NotFoundPage";
import { AddPostPage } from "./components/appPages/AddPostPage";
import "./App.css";

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
                    <Route path="/edit-post/:id" element={<EditPostPage />} />
                    <Route path="/add-post" element={<AddPostPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
