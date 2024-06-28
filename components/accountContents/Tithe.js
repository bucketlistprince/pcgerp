import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa"; // Import the required icons
import AddTitheModal from "../modals/AddTitheModal";

const Tithe = () => {
  const [titheData, setTitheData] = useState([
    {
      date: "2024-06-01",
      titherId: "19900115280",
      titherName: "John Doe",
      amount: 500,
    },
    {
      date: "2024-06-08",
      titherId: "19850510517",
      titherName: "Jane Smith",
      amount: 700,
    },
    {
      date: "2024-06-15",
      titherId: "19920720382",
      titherName: "Mike Johnson",
      amount: 800,
    },
    {
      date: "2024-06-22",
      titherId: "19881230397",
      titherName: "Emily Davis",
      amount: 1000,
    },
    {
      date: "2024-06-29",
      titherId: "19910325517",
      titherName: "James Brown",
      amount: 1200,
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [titherId, setTitherId] = useState("");
  const [titherName, setTitherName] = useState("");
  const [titheAmount, setTitheAmount] = useState("");
  const [comment, setComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tithesPerPage, setTithesPerPage] = useState(10); // Default per page
  const [selectedRow, setSelectedRow] = useState(null);
  const [latestEntryIndex, setLatestEntryIndex] = useState(null);
  const [highlightLatest, setHighlightLatest] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // State to show/hide search bar
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      date,
      titherId,
      titherName,
      amount: parseInt(titheAmount),
      comment: comment,
    };

    // Add new entry to the beginning of the tithe data array
    setTitheData([newEntry, ...titheData]);
    setLatestEntryIndex(0); // Set index of the latest entry
    setHighlightLatest(true); // Highlight the latest entry

    // Reset form fields and close the form
    setDate("");
    setTitherId("");
    setTitherName("");
    setTitheAmount("");
    setComment("");
    setShowForm(false);
  };

  // Highlight the latest entry for 2 seconds
  useEffect(() => {
    if (highlightLatest) {
      const timer = setTimeout(() => {
        setHighlightLatest(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [highlightLatest]);

  // Calculate indices for the current page of tithes
  const indexOfLastTithe = currentPage * tithesPerPage;
  const indexOfFirstTithe = indexOfLastTithe - tithesPerPage;
  const currentTithes = titheData.slice(indexOfFirstTithe, indexOfLastTithe);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(titheData.length / tithesPerPage); i++) {
    pageNumbers.push(i);
  }

  // Change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change the number of items per page
  const handleItemsPerPageChange = (value) => {
    setTithesPerPage(value);
    setCurrentPage(1); // Reset to the first page
  };

  // Filter the tithe data based on the search query
  const filteredTithes = titheData.filter((entry) =>
    entry.titherName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white">
      <div className="mb-4">
        <AddTitheModal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          date={date}
          setDate={setDate}
          titherId={titherId}
          setTitherId={setTitherId}
          titherName={titherName}
          setTitherName={setTitherName}
          titheAmount={titheAmount}
          setTitheAmount={setTitheAmount}
          comment={comment}
          setComment={setComment}
        />

        <div className="flex justify-between items-center">
          <div className="flex">
            <button
              onClick={() => setShowForm(true)}
              className="text-sm hover:bg-green-300 bg-gray-300 font-semibold text-black py-1 px-4 rounded mr-4"
            >
              Add Tithe
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
                value={tithesPerPage}
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
              placeholder="Search by name..."
              className="py-1 px-4 border rounded w-1/3 text-sm"
            />
          </div>
        )}
      </div>
      <table className="w-full border-collapse border border-gray-300 bg-gray-100">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-2 text-sm text-left"></th>
            <th className="py-2 px-2 text-sm text-left">Name</th>
            <th className="py-2 px-2 text-sm text-right">Amount (GHC)</th>
            <th className="py-2 px-2 text-sm text-left">Date</th>
            <th className="py-2 px-2 text-sm text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTithes.slice(indexOfFirstTithe, indexOfLastTithe).map((entry, index) => (
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
                <td className="py-1 px-1 text-gray-400 text-sm">{indexOfFirstTithe + index + 1}</td>
                <td className="py-1 px-2">{entry.titherName}</td>
                <td className="py-1 px-2 flex justify-end">{entry.amount}</td>
                <td className="py-1 px-2">{entry.date}</td>
                <td className="py-1 px-2 flex justify-end">
                  <button
                    onClick={() => {
                      // Add functionality to edit the entry
                      // Populate the AddTitheModal with the entry's data
                      setDate(entry.date);
                      setTitherId(entry.titherId);
                      setTitherName(entry.titherName);
                      setTitheAmount(entry.amount.toString());
                      setComment(entry.comment);
                      setShowForm(true);
                    }}
                    className="bg-transparent hover:bg-gray-100 text-gray-500 hover:text-gray-700 px-2 rounded"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      // Add functionality to delete the entry
                      const updatedTithes = [...titheData];
                      updatedTithes.splice(indexOfFirstTithe + index, 1);
                      setTitheData(updatedTithes);
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

export default Tithe;
