import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";
import { TranslationProvider } from "./context/TranslationContext";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";

// Lazy load page components to improve initial load performance
const HomePage = lazy(() =>
  import("./pages/Home/index").then((module) => ({ default: module.HomePage }))
);
const DocumentationPage = lazy(() =>
  import("./pages/Documentation/index").then((module) => ({
    default: module.DocumentationPage,
  }))
);
const PricingPage = lazy(() =>
  import("./pages/Pricing/index").then((module) => ({
    default: module.PricingPage,
  }))
);
const ContactsPage = lazy(() =>
  import("./pages/Contacts/index").then((module) => ({
    default: module.ContactsPage,
  }))
);
const LoginPage = lazy(() =>
  import("./pages/Auth/sections/LoginPage").then((module) => ({
    default: module.LoginPage,
  }))
);
const RegisterPage = lazy(() =>
  import("./pages/Auth/sections/RegisterPage").then((module) => ({
    default: module.RegisterPage,
  }))
);
const ProfilePage = lazy(() =>
  import("./pages/Profile/sections/ProfilePage").then((module) => ({
    default: module.ProfilePage,
  }))
);

// Loading component shown while lazy components are loading
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <TranslationProvider>
      <AuthProvider>
        <SearchProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-white">
              <Navigation />

              <main className="flex-grow">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/docs" element={<DocumentationPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </Suspense>
              </main>

              <Footer />
            </div>
          </Router>
        </SearchProvider>
      </AuthProvider>
    </TranslationProvider>
  );
}

export default App;
