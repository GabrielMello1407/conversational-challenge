import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="flex items-center gap-4 px-6 py-4 bg-gray-800 border-b border-gray-700 shadow-md">
      <Link href="/">
        <Image src="/furia.png" alt="Logo Furia" width={50} height={50} />
      </Link>
    </div>
  );
};

export default Navbar;
