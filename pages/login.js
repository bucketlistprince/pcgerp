import Image from "next/image";
import Link from "next/link";
import logoImage from "../images/logo.jpg"; //

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 ">
      <div className="w-full max-w-xs">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-8 mt-8 flex justify-center">
            <Image
              src={logoImage}
              alt="Logo"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <div className="mb-4">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Login
            </button>
            </Link>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs">
          Forgot Password? Contact the Administrator.
        </p>
      </div>
    </div>
  );
};

export default Login;
