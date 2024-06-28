import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa"; // Import the required icons
import AddWelfareModal from "../modals/AddWelfareModal"; // Assuming you have a similar modal for adding welfare entries

const Welfare = () => {
  const [welfareData, setWelfareData] = useState([
    {
      date: "2024-06-01",
      contributorId: "19900115280",
      contributorName: "John Doe",
      amount: 300,
    },
    {
      date: "2024-06-08",
      contributorId: "19850510517",
      contributorName: "Jane Smith",
      amount: 500,
    },
    {
      date: "2024-06-15",
      contributorId: "19920720382",
      contributorName: "Mike Johnson",
      amount: 700,
    },
    {
      date: "2024-06-22",
      contributorId: "19881230397",
      contributorName: "Emily Davis",
      amount: 900,
    },
    {
      date: "2024-06-29",
      contributorId: "19910325517",
      contributorName: "James Brown",
      amount: 1100,
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [contributorId, setContributorId] = useState("");
  const [contributorName, setContributorName] = useState("");
  const [welfareAmount, setWelfareAmount] = useState("");
  const [comment, setComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [welfaresPerPage, setWelfaresPerPage] = useState(10); // Default per page
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
      contributorId,
      contributorName,
      amount: parseInt(welfareAmount),
      comment: comment,
    };

    // Add new entry to the beginning of the welfare data array
    setWelfareData([newEntry, ...welfareData]);
    setLatestEntryIndex(0); // Set index of the latest entry
    setHighlightLatest(true); // Highlight the latest entry

    // Reset form fields and close the form
    setDate("");
    setContributorId("");
    setContributorName("");
    setWelfareAmount("");
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

  // Calculate indices for the current page of welfares
  const indexOfLastWelfare = currentPage * welfaresPerPage;
  const indexOfFirstWelfare = indexOfLastWelfare - welfaresPerPage;
  const currentWelfares = welfareData.slice(indexOfFirstWelfare, indexOfLastWelfare);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(welfareData.length / welfaresPerPage); i++) {
    pageNumbers.push(i);
  }

  // Change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change the number of items per page
  const handleItemsPerPageChange = (value) => {
    setWelfaresPerPage(value);
    setCurrentPage(1); // Reset to the first page
  };

  // Filter the welfare data based on the search query
  const filteredWelfares = welfareData.filter((entry) =>
    entry.contributorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white">
      <div className="mb-4">
        <AddWelfareModal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          date={date}
          setDate={setDate}
          contributorId={contributorId}
          setContributorId={setContributorId}
          contributorName={contributorName}
          setContributorName={setContributorName}
          welfareAmount={welfareAmount}
          setWelfareAmount={setWelfareAmount}
          comment={comment}
          setComment={setComment}
        />

        <div className="flex justify-between items-center">
          <div className="flex">
            <button
              onClick={() => setShowForm(true)}
              className="text-sm hover:bg-green-300 bg-gray-300 font-semibold text-black py-1 px-4 rounded mr-4"
            >
              Add Welfare
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
                value={welfaresPerPage}
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
          {filteredWelfares.slice(indexOfFirstWelfare, indexOfLastWelfare).map((entry, index) => (
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
                <td className="py-1 px-1 text-gray-400 text-sm">{indexOfFirstWelfare + index + 1}</td>
                <td className="py-1 px-2">{entry.contributorName}</td>
                <td className="py-1 px-2 flex justify-end">{entry.amount}</td>
                <td className="py-1 px-2">{entry.date}</td>
                <td className="py-1 px-2 flex justify-end">
                  <button
                    onClick={() => {
                      // Add functionality to edit the entry
                      // Populate the AddWelfareModal with the entry's data
                      setDate(entry.date);
                      setContributorId(entry.contributorId);
                      setContributorName(entry.contributorName);
                      setWelfareAmount(entry.amount.toString());
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
                      const updatedWelfares = [...welfareData];
                      updatedWelfares.splice(indexOfFirstWelfare + index, 1);
                      setWelfareData(updatedWelfares);
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

export default Welfare;
