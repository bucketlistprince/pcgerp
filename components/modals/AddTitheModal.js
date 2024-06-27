import React, { useEffect } from "react";

const AddTitheModal = ({ isOpen, onClose, onSubmit, date, setDate, titherId, setTitherId, titherName, setTitherName, titheAmount, setTitheAmount, comment, setComment }) => {
  if (!isOpen) return null;

  // Set default date to today's date when the component mounts
  useEffect(() => {
    if (!date) {
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
    }
  }, [date, setDate]);

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
          {/* Tither ID input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Tither ID</label>
            <input
              type="text"
              value={titherId}
              onChange={(e) => setTitherId(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          {/* Tither Name input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Tither Name</label>
            <input
              type="text"
              value={titherName}
              onChange={(e) => setTitherName(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          {/* Tithe amount input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Tithe Amount (GHC)</label>
            <input
              type="number"
              value={titheAmount}
              onChange={(e) => setTitheAmount(e.target.value)}
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

export default AddTitheModal;
