import Layout from "../components/Layout";
import BigCalendarComponent from "../components/BigCalendarComponent";
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
        <div className="flex justify-between">
          <div className="flex">
            <div
              className="bg-white p-2 rounded-lg shadow-md hover:bg-green-300 hover:font-bold mr-4"
              onClick={() => router.push("/members")}
            >
              <h2 className="text-sm font-semibold mb-2 text-gray-800">
                Week's Birthdays
              </h2>
              <p className="text-2xl">15</p>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-md hover:bg-green-300 hover:font-bold mr-4">
              <h2 className="text-sm font-semibold mb-2 text-gray-800">
                Today's Birthdays
              </h2>
              <p className="text-2xl">2</p>
            </div>
          </div>
          <div className="bg-white p-2 rounded-lg shadow-md hover:bg-green-300 hover:font-bold">
            <h2 className="text-sm font-semibold mb-2 text-gray-800">
              Month's Birthdays
            </h2>
            <p className="text-2xl">2</p>
          </div>
        </div>

        <div className="rounded-lg shadow-md mt-4 bg-white w-full">
          <BigCalendarComponent birthdays={upcomingBirthdays} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
