import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [adresse_mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Remplacez par votre appel API pour la connexion
    fetch("http://localhost:5000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adresse_mail, password }),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/");
        } else {
          alert("Nom d’utilisateur ou mot de passe incorrect");
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  return (
    <div className="w-[420px] bg-white/10 border-3 border-white/10 backdrop-blur-lg shadow-md text-white p-8 rounded-2xl mx-auto mt-24">
      <form onSubmit={handleSubmit}>
        <h1 className="text-[36px] text-sky-900 text-center mb-8">Connexion</h1>
        <div className="relative w-full h-[50px] my-8">
          <input
            type="text"
            placeholder="Email"
            value={adresse_mail}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-full bg-transparent border outline-none border-2 border-sky-900 rounded-[40px] p-[20px_45px_20px_20px] text-sky-900 placeholder-sky-900/70"
          />
          <FaUser className="absolute right-5 top-1/2 -translate-y-1/2 text-[20px] text-sky-900" />
        </div>
        <div className="relative w-full h-[50px] my-8">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-full bg-transparent border outline-none border-2 border-sky-900 rounded-[40px] p-[20px_45px_20px_20px] text-sky-900 placeholder-sky-900/70"
          />
          <FaLock className="absolute right-5 top-1/2 -translate-y-1/2 text-[20px] text-sky-900" />
        </div>
        <button
          type="submit"
          className="w-full h-[45px] border-none outline-none bg-gradient-to-r from-[#007bff] to-[#0056b3] text-white text-[16px] font-bold cursor-pointer rounded-[40px] transition-all duration-300 ease-in-out shadow-md hover:from-[#0056b3] hover:to-[#003580]"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
