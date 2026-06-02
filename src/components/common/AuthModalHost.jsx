import Login from "../auth/Login";
import Register from "../auth/Register";
import { useSite } from "../../context/SiteContext";

const AuthModalHost = () => {
  const { showLogin, setShowLogin, showRegister, setShowRegister } = useSite();

  const closeAuthModal = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  if (!showLogin && !showRegister) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[100000] bg-black/60 backdrop-blur-sm animate-fadeIn">
      {showRegister ? (
        <Register
          onClose={closeAuthModal}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      ) : (
        <Login
          onClose={closeAuthModal}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}
    </div>
  );
};

export default AuthModalHost;
