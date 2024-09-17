import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./contexts/AuthProvider";
import './styles/App.css'; // Asegúrate de que esta línea esté presente
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Chat from './components/Chat';

function App() {
  return (
    <AuthProvider>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
