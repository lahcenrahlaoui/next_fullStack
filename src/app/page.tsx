"use client";

import { useContext, useState } from "react";
import Orbits from "@/components/shared/orbits";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion'
import { JubarexContext, JubarexContextType } from "./context";
import { useRouter } from "next/navigation"

const Home = () => {
  const { user, refreshUserFromToken } = useContext(JubarexContext) as JubarexContextType;

  const router = useRouter()

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async () => {
    router.push("/posts");
    // Uncomment and modify as needed for your authentication process
    // const response = await fetch(
    //   process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, password }),
    //   }
    // );
    // const res: { access_token: string } = await response.json();
    // localStorage.setItem("accessToken", res.access_token);
    // await refreshUserFromToken();
  };

  return (
    <section className="relative">
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-5 z-0" />

      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 relative container flex flex-col justify-center items-center text-center lg:text-start lg:items-start h-[calc(100vh-60px)] lg:h-screen"
      >
        {/* Hero Content */}
        <article className="mb-8 flex flex-col gap-y-2 lg:gap-y-4">
          <h3 className="font-jetbrains font-medium text-base lg:text-lg text-gray-900 dark:text-gray-300">
            Protect Your Ancient Treasures with Juba Rex
          </h3>
          <h1 className="font-bold text-4xl lg:text-6xl leading-tight text-gray-900 dark:text-white">
            Safeguarding & Digitalizing{" "}
            <span className="text-[#FFB800]">Ancient Treasures</span>
          </h1>
        </article>

        {/* Hero Intro */}
        <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-400 max-w-2xl lg:mr-[40%]">
          Our services not only secure your physical treasures but also preserve
          them digitally for future generations.
        </p>

        {/* Buttons & Inputs */}
        {/* {user?.email ? (
          <div className="mt-10 lg:mt-12 flex items-center gap-6">
            <h2 className="text-xl lg:text-2xl font-medium text-white">
              Welcome back, {user.firstname} {user.lastname}
            </h2>
          </div>
        ) : ( */}
        <div className="mt-10 lg:mt-12 w-full max-w-lg space-y-4">
          <div className="flex flex-col w-full">
            <label className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800] transition ease-in-out"
              placeholder="Email"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800] transition ease-in-out"
              placeholder="Password"
            />
          </div>

          <Button
            onClick={login}
            className="w-full py-3 text-lg font-semibold bg-[#FFB800] text-white rounded-lg hover:bg-[#e5a700] transition duration-300"
          >
            Login
          </Button>
        </div>
        {/* )} */}
      </motion.section>

      <Orbits mini={false} />
    </section>
  );
};

export default Home;
