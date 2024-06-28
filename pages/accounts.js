// pages/accounts.js
import Layout from "../components/Layout";
import AccountTabs from "../components/AccountTabs";

import Offertory from "../components/accountContents/Offertory";
import Tithe from "../components/accountContents/Tithe";
import Welfare from "../components/accountContents/Welfare";
import Donations from "../components/accountContents/Donation";
import Others from "../components/accountContents/Others";

const Accounts = () => {
  const tabs = ["Offertory", "Tithe", "Welfare", "Donations", "Others"];

  const renderContent = (activeTab) => {
    switch (activeTab) {
      case "Offertory":
        return <Offertory />;
      case "Tithe":
        return <Tithe />;
      case "Welfare":
        return <Welfare />;
      case "Donations":
        return <Donations />;
      case "Others":
        return <Others />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-4 flex justify-end">
        {/* <button className="text-sm hover:bg-green-300 bg-gray-300 font-semibold text-black py-1 px-4 rounded">
            Receive Contribution
          </button> */}
        </div>

        <div className="flex mb-4">
          <div className="bg-white p-2 rounded-lg shadow-md hover:bg-green-300 hover:font-bold mr-4">
            <h2 className="text-sm font-semibold mb-2 text-gray-800">
              Offertory
            </h2>
            <p className="text-2xl">GH¢ 1203.50</p>
          </div>
          <div className="bg-white p-2 rounded-lg shadow-md hover:bg-green-300 hover:font-bold mr-4 ">
            <h2 className="text-sm font-semibold mb-2 text-gray-800">
              Tithe
            </h2>
            <p className="text-2xl">GH¢ 7540.00</p>
          </div>
          <div className="bg-white p-2 rounded-lg shadow-md hover:bg-green-300 hover:font-bold">
            <h2 className="text-sm font-semibold mb-2 text-gray-800">
              Welfare
            </h2>
            <p className="text-2xl">GH¢ 2165.70</p>
          </div>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-md">
          <h1 className="font-bold mb-4">
            General Accounts
            <hr />
          </h1>
          <AccountTabs tabs={tabs} initialTab="Offertory" renderContent={renderContent} />
        </div>
      </div>
    </Layout>
  );
};

export default Accounts;
