import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa"; // Import the required icons
import AddDonationModal from "../modals/AddDonationModal";

const Donation = () => {
  const [donationData, setDonationData] = useState([
    { date: "2024-06-01", amount: 500, comment: "First donation", donorName: "John Doe" },
    { date: "2024-06-08", amount: 1200, comment: "Second donation", donorName: "Jane Smith" },
    { date: "2024-06-15", amount: 800, comment: "Third donation", donorName: "Alice Johnson" },
    { date: "2024-06-22", amount: 1500, comment: "Fourth donation", donorName: "Bob Brown" },
    { date: "2024-06-29", amount: 2000, comment: "Fifth donation", donorName: "Charlie Davis" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [comment, setComment] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorId, setDonorId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [donationsPerPage, setDonationsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [latestEntryIndex, setLatestEntryIndex] = useState(null);
  const [highlightLatest, setHighlightLatest] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      date,
      amount: parseInt(donationAmount),
      comment,
      donorName,
      donorId,
    };

    setDonationData([newEntry, ...donationData]);
    setLatestEntryIndex(0);
    setHighlightLatest(true);

    setDate("");
    setDonationAmount("");
    setComment("");
    setDonorName("");
    setDonorId("");
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

  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = donationData.slice(
    indexOfFirstDonation,
    indexOfLastDonation
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(donationData.length / donationsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (value) => {
    setDonationsPerPage(value);
    setCurrentPage(1);
  };

  const filteredDonations = donationData.filter((entry) =>
    entry.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white">
      <div className="mb-4">
        <AddDonationModal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          date={date}
          setDate={setDate}
          donationAmount={donationAmount}
          setDonationAmount={setDonationAmount}
          comment={comment}
          setComment={setComment}
          donorName={donorName}
          setDonorName={setDonorName}
          donorId={donorId}
          setDonorId={setDonorId}
        />

        <div className="flex justify-between items-center">
          <div className="flex">
            <button
              onClick={() => setShowForm(true)}
              className="text-sm hover:bg-green-300 bg-gray-300 font-semibold text-black py-1 px-4 rounded mr-4"
            >
              Add Donation
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
                value={donationsPerPage}
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
          <div className="mt-2">
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
            <th className="py-2 px-2 text-sm text-left">Donor Name</th>
            <th className="py-2 px-2 text-sm text-left">Comment</th>
            <th className="py-2 px-2 text-sm text-right">Amount (GHC)</th>
            <th className="py-2 px-2 text-sm text-left">Date</th>
            <th className="py-2 px-2 text-sm text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonations
            .slice(indexOfFirstDonation, indexOfLastDonation)
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
                    {indexOfFirstDonation + index + 1}
                  </td>
                  <td className="py-1 px-2">{entry.donorName}</td>
                  <td className="py-1 px-2">{entry.comment}</td>
                  <td className="py-1 px-2 flex justify-end">{entry.amount}</td>
                  <td className="py-1 px-2">{entry.date}</td>
                  <td className="py-1 px-2 flex justify-end">
                    <button
                      onClick={() => {
                        setDate(entry.date);
                        setDonationAmount(entry.amount.toString());
                        setComment(entry.comment);
                        setDonorName(entry.donorName);
                        setDonorId(entry.donorId);
                        setShowForm(true);
                      }}
                      className="bg-transparent hover:bg-gray-100 text-gray-500 hover:text-gray-700 px-2 rounded"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        const updatedDonations = [...donationData];
                        updatedDonations.splice(
                          indexOfFirstDonation + index,
                          1
                        );
                        setDonationData(updatedDonations);
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

export default Donation;
