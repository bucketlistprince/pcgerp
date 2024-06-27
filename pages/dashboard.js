import Layout from "../components/Layout";
import BirthdayCalendar from "../components/BirthdayCalendar";
import Link from "next/link";
import { useRouter } from "next/router";

const Dashboard = () => {
  const upcomingBirthdays = [
    { name: "John Doe", date: "2024-06-20" },
    { name: "Jane Smith", date: "2024-06-25" },
  ];

  const router = useRouter();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-4 flex justify-end">
          <Link href="/login">
            <button className="text-sm bg-green-500 hover:bg-gray-300 font-bold text-black py-1 px-4 rounded">
              Log Out
            </button>
          </Link>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <div
              className="bg-white p-2 rounded-lg shadow-md hover:bg-green-300 hover:font-bold mr-4"
              onClick={() => router.push("/members")}
            >
              <h2 className="text-sm font-semibold mb-2 text-gray-800">
                Total Members
              </h2>
              <p className="text-2xl">265</p>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-md hover:bg-green-300 hover:font-bold mr-4">
              <h2 className="text-sm font-semibold mb-2 text-gray-800">
                Today's Birthdays
              </h2>
              <p className="text-2xl">0</p>
            </div>
          </div>
          <div className="bg-white p-2 rounded-lg shadow-md hover:bg-green-300 hover:font-bold">
            <h2 className="text-sm font-semibold mb-2 text-gray-800">
              Month's Birthdays
            </h2>
            <p className="text-2xl">2</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md mt-4">
          <BirthdayCalendar birthdays={upcomingBirthdays} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
