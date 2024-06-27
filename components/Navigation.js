import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import logoImage from "../images/logo.jpg"; // Adjust the path as needed

const Navigation = () => {
  const router = useRouter();

  const linkClasses = (path) => 
    router.pathname === path 
      ? "text-green-400 font-bold text-2xl inline-block py-2 px-4 rounded transition duration-300"
      : "text-white text-2xl hover:text-green-700 font-medium inline-block py-2 px-4 rounded transition duration-300";

  return (
    <nav className="py-2 pl-4 pr-8">
      <h1 className="text-sm text-white text-sm px-4 font-medium text-gray-800 mt-5 text-left">
        Logged in as:
      </h1>
      <h1 className="text-sm text-white px-4 font-bold text-gray-800 mb-2 mt-0 text-left">
        Church Administrator
      </h1>
      <div className="mb-8 mt-8 flex justify-center">
        <Image
          src={logoImage}
          alt="Deposit"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <h1 className="text-sm text-white px-4 font-medium text-gray-100 mb-2 mt-0 text-left">
        Menu
      </h1>
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard" passHref>
            <div className={linkClasses('/dashboard')}>
              Dashboard
            </div>
          </Link>
        </li>
        <li>
          <Link href="/members" passHref>
            <div className={linkClasses('/members')}>
              Members
            </div>
          </Link>
        </li>
        <li>
          <Link href="/accounts" passHref>
            <div className={linkClasses('/accounts')}>
              Accounts
            </div>
          </Link>
        </li>
        <li>
          <Link href="/settings" passHref>
            <div className={linkClasses('/settings')}>
              Settings
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
