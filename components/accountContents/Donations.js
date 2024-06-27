import React, { useState } from "react";

const Donations = () => {
  // Updated dummy donation data including number of donors
  const donationData = [
    { date: "2024-06-01", amount: 500, donors: 5 },
    { date: "2024-06-08", amount: 700, donors: 7 },
    { date: "2024-06-15", amount: 600, donors: 6 },
    { date: "2024-06-22", amount: 800, donors: 8 },
    { date: "2024-06-29", amount: 1000, donors: 10 },
  ];

  // State to manage selected item
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to handle item click
  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <div className="bg-white">
      <table className="w-full border-collapse border border-gray-300 bg-gray-100">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Amount (GHC)</th>
          </tr>
        </thead>
        <tbody>
          {donationData.map((entry, index) => (
            <React.Fragment key={index}>
              <tr
                onClick={() => handleItemClick(index)}
                className={`${
                  selectedItem === index ? "bg-red-200 font-bold" : ""
                }`}
              >
                <td className="py-2 px-4">{entry.date}</td>
                <td className="py-2 px-4">{entry.amount}</td>
              </tr>
              {/* Display donation details for the selected item */}
              {selectedItem === index && (
                <tr>
                  <td colSpan="2" className="py-2 px-4 bg-red-100">
                    Number of Donors: {entry.donors}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <button className="mt-4 text-sm hover:bg-green-300 bg-gray-300 font-semibold text-black py-1 px-4 rounded">
        Add Donation
      </button>
    </div>
  );
};

export default Donations;
