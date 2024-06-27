import Layout from "../../components/Layout";
import Link from "next/link";
import { useState } from "react";

// Helper function to generate unique ID from birthday and last name
const generateId = (birthday, lastName) => {
  const birthDateParts = birthday.split("-");
  const birthDateNumber = birthDateParts.join(""); // Concatenate year, month, and day

  const lastNameNumber = lastName
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return parseInt(birthDateNumber + lastNameNumber, 10);
};

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const members = [
    { name: "John Doe", email: "john@example.com", birthday: "1990-01-15" },
    { name: "Ben Smith", email: "ben@example.com", birthday: "1985-05-10" },
    { name: "Mary Jane", email: "jane@example.com", birthday: "1992-07-20" },
    { name: "Prince Dyke", email: "dyke@example.com", birthday: "1988-12-30" },
    { name: "John Smith", email: "smith@example.com", birthday: "1991-03-25" },
  ];

  const membersWithId = members.map((member) => ({
    ...member,
    id: generateId(member.birthday, member.name.split(" ").pop()),
  }));

  const filteredMembers = membersWithId.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toString().includes(searchTerm)
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-sm p-2 border rounded"
          />
        </div>
        <div className="px-4 bg-white my-4 py-4 rounded">
          <h1 className="font-bold mb-4">
            All Members
            <hr></hr>
          </h1>

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-gray-400 py-1 px-2">#</th>
                <th className="py-1 px-4 text-left">ID</th>
                <th className="py-1 px-4 text-left">Name</th>
                <th className="py-1 px-4 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr
                  key={member.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    (window.location.href = `/members/${member.id}`)
                  }
                >
                  <td className="text-gray-400 py-1 px-2">{index + 1}</td>
                  <td className="py-1 px-4">{member.id}</td>
                  <td className="py-1 px-4">{member.name}</td>
                  <td className="py-1 px-4">{member.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link href="/members/add">
          <button className="text-sm hover:bg-green-300 bg-gray-300 font-semibold text-black py-1 px-4 rounded">
            Add New
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default Members;
