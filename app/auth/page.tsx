import Navbar from "@/components/Navbar";
import AuthCard from "@/components/auth/AuthCard";

const AuthPage = () => {
  return (
    <div className="relative min-h-screen w-full">

      {/* Background layer */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/images/hero.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Auth Card centered */}
      <div className="flex min-h-screen items-center justify-center">
        <AuthCard />
      </div>

    </div>
  );
};

export default AuthPage;
