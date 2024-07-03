import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa"; // Import the required icons
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
  const [offertoriesPerPage, setOffertoriesPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [latestEntryIndex, setLatestEntryIndex] = useState(null);
  const [highlightLatest, setHighlightLatest] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredOffertories = offertoryData.filter((entry) =>
    entry.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        <div className="flex justify-between items-center">
          <div className="flex">
            <button
              onClick={() => setShowForm(true)}
              className="text-sm hover:bg-green-300 bg-gray-300 font-semibold text-black py-1 px-4 rounded mr-4"
            >
              Add Offertory
            </button>
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-sm hover:bg-green-300 bg-gray-300 font-semibold text-black px-2 rounded mr-4"
            >
              <FaSearch />
            </button>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center mr-4">
              <span className="mr-2 text-sm">Items per page:</span>
              <select
                value={offertoriesPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(parseInt(e.target.value))
                }
                className="py-1 px-2 bg-gray-300 text-sm rounded"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            <ul className="flex">
              {currentPage > 1 && (
                <li>
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    className="py-1 px-2 bg-gray-300 rounded mr-1"
                  >
                    {"< "}
                  </button>
                </li>
              )}
              {pageNumbers.map((number) => (
                <li key={number} className="mx-1">
                  <button
                    onClick={() => paginate(number)}
                    className={`py-1 px-2 bg-gray-300 text-xs rounded ${
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
                    className="py-1 px-2 bg-gray-300 rounded ml-1"
                  >
                    {" >"}
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
        {showSearch && (
          <div className=" mt-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by comment..."
              className="py-1 px-4 border rounded w-1/3 text-sm"
            />
          </div>
        )}
      </div>
      <table className="w-full border-collapse border border-gray-300 bg-gray-100">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-1 text-sm text-left"></th>
            <th className="py-2 px-2 text-sm text-left">Comment</th>
            <th className="py-2 px-2 text-sm text-right">Amount (GHC)</th>
            <th className="py-2 px-2 text-sm text-left">Date</th>
            <th className="py-2 px-2 text-sm text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOffertories
            .slice(indexOfFirstOffertory, indexOfLastOffertory)
            .map((entry, index) => (
              <React.Fragment key={index}>
                <tr
                  className={
                    selectedRow === entry
                      ? "bg-red-100 font-semibold"
                      : index === latestEntryIndex && highlightLatest
                      ? "bg-green-300"
                      : ""
                  }
                  onClick={() => {
                    setLatestEntryIndex(index);
                    setSelectedRow(entry);
                  }}
                >
                  <td className="py-1 px-1 text-gray-400 text-sm">
                    {indexOfFirstOffertory + index + 1}
                  </td>
                  <td className="py-1 px-2">{entry.comment}</td>
                  <td className="py-1 px-2 flex justify-end">{entry.amount}</td>
                  <td className="py-1 px-2">{entry.date}</td>
                  <td className="py-1 px-2 flex justify-end">
                    <button
                      onClick={() => {
                        setDate(entry.date);
                        setOffertoryAmount(entry.amount.toString());
                        setComment(entry.comment);
                        setShowForm(true);
                      }}
                      className="bg-transparent hover:bg-gray-100 text-gray-500 hover:text-gray-700 px-2 rounded"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        const updatedOffertories = [...offertoryData];
                        updatedOffertories.splice(
                          indexOfFirstOffertory + index,
                          1
                        );
                        setOffertoryData(updatedOffertories);
                      }}
                      className="text-red-600 hover:text-red-800 ml-2"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Offertory;
