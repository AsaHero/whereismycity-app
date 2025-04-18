import React from "react";
import { Hero } from "./sections/Hero";
import { Features } from "./sections/Features";
import { Demo } from "./sections/Demo";
import { UseCases } from "./sections/Usecases";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Demo />
      <Features />
      <UseCases />
    </div>
  );
};
