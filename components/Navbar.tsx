import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="relative z-10 px-12 py-5">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={150}
        height={50}
        priority
      />
    </nav>
  );
};

export default Navbar;
