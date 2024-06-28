import React from "react";

const AddDonationModal = ({
  isOpen,
  onClose,
  onSubmit,
  date,
  setDate,
  donorId,
  setDonorId,
  donorName,
  setDonorName,
  donationAmount,
  setDonationAmount,
  comment,
  setComment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-lg text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <form onSubmit={onSubmit} className="mt-4">
          {/* Date input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          {/* Donor ID input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Donor ID</label>
            <input
              type="text"
              value={donorId}
              onChange={(e) => setDonorId(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          {/* Donor name input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Donor Name</label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          {/* Donation amount input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Donation Amount (GHC)</label>
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          {/* Comments input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded p-2"
              rows="4"
              placeholder="Enter any comment..."
            />
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="mt-4 text-sm hover:bg-green-300 bg-gray-300 font-semibold text-black py-1 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDonationModal;
