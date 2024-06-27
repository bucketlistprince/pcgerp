// components/Tabs.js
import React, { useState } from "react";

const AccountTabs = ({ tabs, initialTab, renderContent }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div>
      <div className="mb-4">
        <ul className="flex border-b">
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`text-sm mr-1 cursor-pointer py-1 px-4 ${
                activeTab === tab
                  ? "border-l border-t border-r rounded-t bg-white font-bold"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-100 rounded">{renderContent(activeTab)}</div>
    </div>
  );
};

export default AccountTabs;
