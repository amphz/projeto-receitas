"use client";

console.log("motion:", motion);
import Link from "next/link";
import { motion } from "framer-motion"; 

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center h-screen bg-pink-950 text-center px-4"
    >
      <h1 className="text-5xl font-bold mb-4 text-sky-300 drop-shadow-lg animate-pulse">
        Caderno de Receitas 🍰
      </h1>
      <p className="text-white text-lg mb-8 max-w-md">
        Descubra, cadastre e gerencie receitas deliciosas de forma prática!
      </p>
      <Link
        href="/receitas"
        className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-xl text-lg shadow transition transform hover:scale-105 hover:shadow-lg duration-200"
      >
        Ver e Cadastrar Receitas 🍽️
      </Link>
      <footer className="absolute bottom-4 text-white text-sm opacity-70">
        Amanda Pazianoti Horst – 301 Informática
      </footer>
    </motion.main>
  );
}
