"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getToken } from "next-auth/jwt";

export default function AuthComponent() {
  const { data: session } = useSession();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Only needed for sign-up
  const router = useRouter();

  console.log(session);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      console.error("Sign-in error:", res.error);
      alert(res.error); // Display the error message to the user
    } else {
      router.push("/"); // Redirect to home or any other page after sign-in
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call your sign-up API endpoint to create a user with email, password, and username
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, username }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        // Automatically sign in after sign-up
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        if (res?.error) {
          console.error("Sign-up error:", res.error);
          alert(res.error); // Display the error message to the user
        } else {
          router.push("/"); // Redirect to home or any other page after sign-in
        }
      } else {
        const error = await res.json();
        console.error("Sign-up error:", error);
      }
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  };

  if (session) {
    return (
      <>
        <p className="text-black">Signed in as {session.user?.email}</p>
        <button
          className="bg-blue-500 text-white p-2 rounded mt-4"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
  }

  return (
    <div className="auth-container">
      <h2 className="text-xl font-bold">{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
        {isSignUp && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full p-2 border rounded mt-2 text-black"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border rounded mt-2 text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border rounded mt-2 text-black"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 w-full"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <button
        className="bg-red-500 text-white p-2 rounded mt-4 w-full"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>

      <p className="text-sm mt-4">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-500 cursor-pointer"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </span>
      </p>
    </div>
  );
}
