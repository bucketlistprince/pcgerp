import Layout from "../../components/Layout";
import { useRouter } from "next/router";

const MemberDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  // Dummy data for demonstration purposes
  const member = { id: id, name: "John Doe", email: "john@example.com" };

  return (
    <Layout>
      <div className="details">
        <h1>Member Details</h1>
        <p>Name: {member.name}</p>
        <p>Email: {member.email}</p>
        <button
          className="text-sm bg-green-500 hover:bg-green-300 font-bold text-black py-1 px-4 rounded"
          onClick={() => router.push("/members")}
        >
          Back to Members
        </button>
      </div>
    </Layout>
  );
};

export default MemberDetails;
