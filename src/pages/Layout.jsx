import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import EditContact from "./EditContact";
import { AppContextProvider } from "../store/appContext";

export const Layout = () => {
    return (
        <BrowserRouter>
            <AppContextProvider>

                <Navbar />

                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<ContactList />} />
                        <Route path="/add" element={<AddContact />} />
                        <Route path="/edit/:id" element={<EditContact />} />
                        <Route path="*" element={<h1>Not Found</h1>} />
                    </Routes>
                </div>

                <Footer />

            </AppContextProvider>
        </BrowserRouter>
    );
};
