// pages/members/[id].js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import membersData from "@/data/members.json"; // Ensure this path is correct

const MemberDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Extract the ID from the URL
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    if (id) {
      // Log id to verify it's being extracted
      console.log("ID from URL:", id);

      // Find the member by id from the JSON data
      const memberData = membersData.find((m) => m.id === parseInt(id));
      console.log("Found Member Data:", memberData); // Log member data

      setMember(memberData);
      setLoading(false); // Set loading to false after fetching data
    }
  }, [id]);

  const handleEdit = () => {
    router.push(`/members/edit/${id}`);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this member?")) {
      // Here, you'd typically send a delete request to your server.
      // For this example, we'll simply log and redirect.
      console.log(`Delete member with id: ${id}`);
      router.push("/members");
    }
  };

  if (loading) return <p>Loading...</p>; // Display loading message if data is being fetched

  if (!member) return <p>Member not found.</p>; // Display message if member is not found

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Member Details</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            {`${member.surname || ""} ${member.otherNames || ""}`.trim()}
          </h2>
          <p className="mb-2"><strong>ID:</strong> {member.id}</p>
          <p className="mb-2"><strong>Generational Group:</strong> {member.generationalGroupName}</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center"
            >
              <span className="mr-2">✎</span> Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-4 flex items-center"
            >
              <span className="mr-2">🗑️</span> Delete
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MemberDetails;
