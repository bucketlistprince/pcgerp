import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa";
import Layout from "@/components/Layout";

const Members = () => {
  const router = useRouter();
  const [membersData, setMembersData] = useState([
    { id: 1, name: "John Doe", generationalGroupName: "Junior Youth" },
    { id: 2, name: "Jane Smith", generationalGroupName: "Women's Fellowship" },
    { id: 3, name: "Michael Johnson", generationalGroupName: "Children's Session" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage, setMembersPerPage] = useState(5);

  const handleDelete = (id) => {
    const updatedMembers = membersData.filter((member) => member.id !== id);
    setMembersData(updatedMembers);
  };

  const filteredMembers = membersData.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredMembers.length / membersPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e) => {
    setMembersPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <Layout>
      <div className="flex max-w-5xl mx-auto mb-4">
        <div className="bg-white p-2 rounded-lg shadow-md hover:bg-green-300 hover:font-bold mr-4">
          <h2 className="text-sm font-semibold mb-2 text-gray-800">
            Total Members
          </h2>
          <p className="text-2xl">{membersData.length}</p>
        </div>
      </div>

      <div className="bg-white p-2 max-w-5xl mx-auto">

        <h1 className="font-bold mb-4">
          Members List
          <hr />
        </h1>
        <div className="mb-4 flex justify-between items-center">
          <div className="flex">
            <button
              onClick={() => router.push("/members/add")}
              className="text-sm hover:bg-green-300 bg-gray-300 font-semibold text-black py-1 px-4 rounded mr-4"
            >
              Add Member
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
                value={membersPerPage}
                onChange={handleItemsPerPageChange}
                className="py-1 px-2 bg-gray-300 text-sm rounded"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
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
              placeholder="Search by name..."
              className="py-1 px-4 border rounded w-1/3 text-sm"
            />
          </div>
        )}
        <table className="w-full border-collapse border border-gray-300 bg-gray-100 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-1 px-1 text-sm text-left"></th>
              <th className="py-2 px-2 text-sm text-left">Name</th>
              <th className="py-2 px-2 text-sm text-left">Gen. Group</th>
              <th className="py-2 px-2 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.map((member, index) => (
              <tr key={member.id}>
                <td className="py-1 px-1 text-gray-400 text-sm">{indexOfFirstMember + index + 1}</td>
                <td className="py-1 px-2">{member.name}</td>
                <td className="py-1 px-2">{member.generationalGroupName}</td>
                <td className="py-1 px-2 flex justify-end">
                  <button
                    onClick={() => router.push(`/members/${member.id}`)}
                    className="bg-transparent hover:bg-gray-100 text-gray-500 hover:text-gray-700 px-2 rounded"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Members;
