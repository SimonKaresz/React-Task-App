import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebase";

export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogleProfile = async () => {
    const result = await signInWithPopup(auth, provider);
    navigate("/");
  };

  return (
    <div className="loginContent">
      <h1>Sign in with your Google Account to continue</h1>
      <button onClick={signInWithGoogleProfile}>Sign in</button>
    </div>
  );
};
