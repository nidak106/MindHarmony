import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider, firebaseInitError } from "./firebase";

export default function AuthForm({ onSuccess, setCurrentView }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // show a concise UI banner if firebase is not configured
  const firebaseError = firebaseInitError;

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!auth) {
      alert(firebaseError || "Firebase not configured. Contact admin.");
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        // Email sign-in
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Email sign-up
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (name) {
          await updateProfile(userCredential.user, { displayName: name });
        }
      }
      onSuccess();
    } catch (err) {
      console.error("Auth error:", err);
      alert(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!auth || !googleProvider) {
      alert(firebaseError || "Firebase not configured. Contact admin.");
      return;
    }
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
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
    <div className="relative flex justify-center items-center min-h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: "url('/hero-bg.png')" }}>
      {/* show firebase error banner */}
      {firebaseError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-[92%] sm:max-w-xl bg-red-600 text-white px-4 py-2 rounded-md shadow text-sm">
          {firebaseError}
        </div>
      )}

      {/* Overlay covers the whole background */}
      <div className="absolute inset-0 bg-white/50 z-0"></div>
      {/* Card sits above overlay */}
      <div className="relative z-10 bg-white p-4 sm:p-8 rounded-lg shadow-xl w-full max-w-sm mx-2">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">{title}</h2>
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
            disabled={loading || !!firebaseError}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 disabled:opacity-60"
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
            disabled={loading || !!firebaseError}
            className="mt-4 w-full inline-flex justify-center items-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50 disabled:opacity-60"
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
