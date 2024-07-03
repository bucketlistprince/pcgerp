import Layout from "../components/Layout";
import BigCalendar from "../components/BigCalendar";
import { useRouter } from "next/router";

const Dashboard = () => {
  const upcomingBirthdays = [
    { name: "John Doe", date: "2024-07-20" },
    { name: "Jane Smith", date: "2024-07-9" },
    { name: "Jerry Allen", date: "2024-07-20" },
    { name: "Barry Tims", date: "2024-07-25" },
  ];

  const router = useRouter();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between mb-4">
          <div className="flex flex-wrap gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md hover:bg-green-300 hover:font-bold transition-all">
              <h2 className="text-sm mb-2 text-gray-800">
                Today&apos;s Birthdays
              </h2>
              <p className="text-3xl">0</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:bg-green-300 hover:font-bold transition-all">
              <h2 className="text-sm mb-2 text-gray-800">
                Month&apos;s Birthdays
              </h2>
              <p className="text-3xl">4</p>
            </div>
          </div>
        </div>

        <div className="text-sm rounded-lg shadow-md bg-white w-full">
          <BigCalendar birthdays={upcomingBirthdays} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
