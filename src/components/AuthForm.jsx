import React, { useState } from "react";
import { auth, googleProvider } from "./firebase"; // adjust path if needed
import {
signInWithPopup,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
updateProfile,
} from "firebase/auth";

export default function AuthForm({ onSuccess, setCurrentView }) {
const [isLogin, setIsLogin] = useState(true);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [name, setName] = useState("");
const [loading, setLoading] = useState(false);

const handleEmailAuth = async (e) => {
e.preventDefault();
setLoading(true);
try {
if (isLogin) {
// Email sign-in
await signInWithEmailAndPassword(auth, email, password);
} else {
// Email sign-up
const userCredential = await createUserWithEmailAndPassword(auth, email, password);
if (name) {
// set display name on the firebase user profile
await updateProfile(userCredential.user, { displayName: name });
}
}
// onAuthStateChanged (in App) will pick up the signed-in user,
// but we still call onSuccess for immediate navigation if desired.
onSuccess();
} catch (err) {
console.error("Auth error:", err);
alert(err.message || "Authentication failed");
} finally {
setLoading(false);
}
};

const handleGoogleSignIn = async () => {
setLoading(true);
try {
await signInWithPopup(auth, googleProvider);
// onAuthStateChanged will also fire; call onSuccess for immediate effect
onSuccess();
} catch (err) {
console.error("Google sign-in error:", err);
alert(err.message || "Google sign-in failed");
} finally {
setLoading(false);
}
};

const title = isLogin ? "Welcome Back" : "Create an Account";
const buttonText = isLogin ? "Login" : "Sign Up";
const switchText = isLogin ? "Don't have an account? " : "Already have an account? ";
const switchLinkText = isLogin ? "Sign Up" : "Login";

return (
<div className="flex justify-center items-center min-h-screen bg-cover bg-no-repeat bg-center"
style={{ backgroundImage: "url('/hero-bg.png')" }}> <div className="absolute inset-0 bg-white/50 z-0"></div> <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm z-10"> <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">{title}</h2>

    <form onSubmit={handleEmailAuth} className="space-y-4">
      {!isLogin && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={!isLogin}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150"
      >
        {loading ? "Processing..." : buttonText}
      </button>
    </form>

    <div className="my-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="mt-4 w-full inline-flex justify-center items-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50"
        aria-label="Continue with Google"
      >
        <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
        {loading ? "Processing..." : "Continue with Google"}
      </button>
    </div>

    <div className="mt-4 text-center text-sm">
      {switchText}
      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="font-medium text-teal-600 hover:text-teal-500"
      >
        {switchLinkText}
      </button>
    </div>
  </div>
</div>

);
}
