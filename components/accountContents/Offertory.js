import React, { useState, useEffect } from "react";
import AddOffertoryModal from "../modals/AddOffertoryModal";

const Offertory = () => {
  const [offertoryData, setOffertoryData] = useState([
    { date: "2024-06-01", amount: 1000, comment: "First offertory" },
    { date: "2024-06-08", amount: 2010, comment: "Second offertory" },
    { date: "2024-06-15", amount: 1510, comment: "Third offertory" },
    { date: "2024-06-22", amount: 2510, comment: "Fourth offertory" },
    { date: "2024-06-29", amount: 3100, comment: "Fifth offertory" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [offertoryAmount, setOffertoryAmount] = useState("");
  const [comment, setComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [offertoriesPerPage, setOffertoriesPerPage] = useState(10); // Default per page
  const [selectedRow, setSelectedRow] = useState(null);
  const [latestEntryIndex, setLatestEntryIndex] = useState(null);
  const [highlightLatest, setHighlightLatest] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      date,
      amount: parseInt(offertoryAmount),
      comment: comment,
    };

    setOffertoryData([newEntry, ...offertoryData]);
    setLatestEntryIndex(0);
    setHighlightLatest(true);

    setDate("");
    setOffertoryAmount("");
    setComment("");
    setShowForm(false);
  };

  useEffect(() => {
    if (highlightLatest) {
      const timer = setTimeout(() => {
        setHighlightLatest(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [highlightLatest]);

  const indexOfLastOffertory = currentPage * offertoriesPerPage;
  const indexOfFirstOffertory = indexOfLastOffertory - offertoriesPerPage;
  const currentOffertories = offertoryData.slice(
    indexOfFirstOffertory,
    indexOfLastOffertory
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(offertoryData.length / offertoriesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (value) => {
    setOffertoriesPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white">
      <div className="mb-4">
        <AddOffertoryModal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          date={date}
          setDate={setDate}
          offertoryAmount={offertoryAmount}
          setOffertoryAmount={setOffertoryAmount}
          comment={comment}
          setComment={setComment}
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={() => setShowForm(true)}
            className="text-sm hover:bg-green-300 bg-gray-300 font-semibold text-black py-1 px-4 rounded mr-4"
          >
            Add Offertory
          </button>
          <div className="flex items-center">
            <span className="mr-2 text-sm">Items per page:</span>
            <select
              value={offertoriesPerPage}
              onChange={(e) =>
                handleItemsPerPageChange(parseInt(e.target.value))
              }
              className="py-1 px-2 bg-gray-300 text-sm rounded"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={100}>100</option>
            </select>
          </div>
          <ul className="flex">
            {currentPage > 1 && (
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className="py-1 px-2 bg-gray-300 rounded mr-1 text-xs"
                >
                  {"< "}
                </button>
              </li>
            )}
            {pageNumbers.map((number) => (
              <li key={number} className="mx-0.5">
                <button
                  onClick={() => paginate(number)}
                  className={`py-1 px-2 bg-gray-300 text-xs text-bold rounded ${
                    currentPage === number ? "font-semibold" : ""
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
            {currentPage < pageNumbers.length && (
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className="py-1 px-2 bg-gray-300 rounded ml-1 text-xs text-bold"
                >
                  {" >"}
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      <table className="w-full border-collapse border border-gray-300 bg-gray-100">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-sm text-left">Date</th>
            <th className="py-2 px-4 text-sm text-left">Amount (GHC)</th>
          </tr>
        </thead>
        <tbody>
          {currentOffertories.map((entry, index) => (
            <React.Fragment key={index}>
              <tr
                className={
                  selectedRow === entry
                    ? "bg-red-200 font-semibold"
                    : index === latestEntryIndex && highlightLatest
                    ? "bg-green-300"
                    : ""
                }
                onClick={() => {
                  setLatestEntryIndex(index); // Set selected row index
                  setSelectedRow(entry); // Set selected row data
                }}
              >
                <td className="py-1 px-4">{entry.date}</td>
                <td className="py-1 px-4">{entry.amount}</td>
              </tr>
              {selectedRow === entry && (
                <tr className="bg-red-100">
                  <td colSpan="2" className="px-4 py-2">
                    {entry.comment}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Offertory;
