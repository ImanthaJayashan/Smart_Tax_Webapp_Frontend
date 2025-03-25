import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AboutUs = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [replyingIndex, setReplyingIndex] = useState(null);

  const handleAddFeedback = () => {
    setShowFeedbackForm(true);
  };

  const handleSubmitFeedback = () => {
    if (!feedback.trim()) {
      alert("Feedback cannot be empty."); // Validation for empty feedback
      return;
    }

    if (feedback.trim().length < 10) {
      alert("Feedback must be at least 10 characters long."); // Validation for minimum length
      return;
    }

    setFeedbackList([
      ...feedbackList,
      { name: 'Anonymous', text: feedback, replies: [], isEditing: false },
    ]);
    setFeedback(''); // Clear the text area
    setShowFeedbackForm(false); // Hide the form after submission
  };

  const handleEditFeedback = (index) => {
    const updatedFeedbackList = [...feedbackList];
    updatedFeedbackList[index].isEditing = true;
    setFeedbackList(updatedFeedbackList);
  };

  const handleSaveFeedback = (index, newText) => {
    const updatedFeedbackList = [...feedbackList];
    updatedFeedbackList[index].text = newText;
    updatedFeedbackList[index].isEditing = false;
    setFeedbackList(updatedFeedbackList);
  };

  const handleDeleteFeedback = (index) => {
    const updatedFeedbackList = feedbackList.filter((_, i) => i !== index);
    setFeedbackList(updatedFeedbackList);
  };

  const handleReplyFeedback = (index, replyText) => {
    const updatedFeedbackList = [...feedbackList];
    updatedFeedbackList[index].replies.push({ name: 'Anonymous', text: replyText });
    setFeedbackList(updatedFeedbackList);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Toast Container */}
      <ToastContainer />
      {/* Header */}
      <header style={{ backgroundColor: '#2b2d78' }} className="text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Name */}
          <div className="flex items-center space-x-4">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs7vZKGmx5-WlrJ-539bkuDt9Bz2gtG_CxrA&s" 
              alt="Tax Logo" 
              className="h-16 w-16 rounded-full border-2 border-white" // Circular logo with border
            />
            <h1 className="text-lg font-bold">Smart Tax Webapp</h1>
          </div>
          {/* Navigation Bar */}
          <nav className="flex justify-center items-center w-full space-x-6">
            <ul className="flex space-x-6">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/about" className="hover:text-gray-300">About</a></li>
              <li><a href="/services" className="hover:text-gray-300">Services</a></li>
              <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
            </ul>
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            {/* Tax Learning Hub Button */}
            <div className="absolute right-4">
              <button
                style={{ backgroundColor: '#eeb029' }}
                className="hover:opacity-90 text-white py-2 px-4 rounded"
              >
                Tax Learning Hub
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 text-center p-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">About Us</h1>
        <div className="text-lg text-gray-700 mb-4 max-w-4xl text-justify">
          <p className="mb-4">
            Smart Tax Webapp is your trusted platform for tax filing and management.
          </p>
          <p>
            Smart Tax Web App is designed to make tax management simple, fast, and stress-free. Our platform helps users easily upload documents, track transactions, and calculate taxes with an embedded tax calculator. We provide access to various tax forms to ensure that users meet all filing requirements. Whether you're managing personal taxes or business-related transactions, Smart Tax Web App streamlines the entire process. Our mission is to ensure that no one misses their tax payments, helping people stay on top of their financial records and avoid mistakes and penalties. By making tax filing easier, we contribute to strengthening the Sri Lankan economy, as timely tax payments help improve national resources. With Smart Tax Web App, tax filing becomes an effortless task, giving users peace of mind knowing their taxes are managed accurately and on time.
          </p>
        </div>
        <div className="mt-6">
          {/* Add Feedback Button */}
          <button
            onClick={handleAddFeedback}
            className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
          >
            Add Feedback
          </button>
        </div>

        {/* Feedback Form */}
        {showFeedbackForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">
                {editingIndex !== null
                  ? 'Edit Feedback'
                  : replyingIndex !== null
                  ? 'Reply to Feedback'
                  : 'Add Feedback'}
              </h2>
              {replyingIndex !== null && (
                <div className="mb-4 p-4 border border-gray-300 rounded bg-gray-100">
                  <p className="text-gray-800">
                    <strong>Original Comment:</strong> {feedbackList[replyingIndex].text}
                  </p>
                </div>
              )}
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={
                  replyingIndex !== null
                    ? 'Write your reply here...'
                    : 'Write your feedback here...'
                }
                className="w-full min-h-[100px] p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  resize: 'vertical', // Allow vertical resizing only
                }}
              ></textarea>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => {
                    setShowFeedbackForm(false);
                    setFeedback('');
                    setEditingIndex(null);
                    setReplyingIndex(null); // Reset replying state
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (editingIndex !== null) {
                      // Update existing feedback
                      const updatedFeedbackList = [...feedbackList];
                      updatedFeedbackList[editingIndex].text = feedback;
                      updatedFeedbackList[editingIndex].isEditing = false;
                      setFeedbackList(updatedFeedbackList);
                    } else if (replyingIndex !== null) {
                      // Add reply to feedback
                      const updatedFeedbackList = [...feedbackList];
                      updatedFeedbackList[replyingIndex].replies.push(feedback);
                      setFeedbackList(updatedFeedbackList);
                    } else {
                      // Add new feedback
                      handleSubmitFeedback();
                    }
                    setShowFeedbackForm(false);
                    setFeedback('');
                    setEditingIndex(null);
                    setReplyingIndex(null); // Reset replying state
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  {replyingIndex !== null ? 'Submit Reply' : editingIndex !== null ? 'Save' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Display Feedback */}
        <div className="mt-6 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Feedback</h2>
          {feedbackList.map((item, index) => (
            <div
              key={index}
              className="relative p-6 mb-6 bg-gray-50 border border-gray-300 rounded-lg shadow-lg" // Added distinct styling for the comment box
            >
              {/* User Logo and Name */}
              <div className="absolute top-[-20px] left-[-20px] flex flex-col items-center">
                <img
                  src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" // Replace with actual user logo URL
                  alt="User Logo"
                  className="h-12 w-12 rounded-full border-2 border-blue-500 shadow-md" // Circular logo with border and shadow
                />
                <p className="text-xs text-gray-600 mt-1"> {/* Commenter's name */}
                  {item.name || 'Anonymous'}
                </p>
              </div>
              <div className="ml-16"> {/* Adjusted margin to align content with the logo */}
                <div className="flex justify-between items-center">
                  {item.isEditing ? (
                    <textarea
                      defaultValue={item.text}
                      onBlur={(e) => handleSaveFeedback(index, e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  ) : (
                    <p
                      className="text-gray-800 break-words overflow-hidden"
                      style={{
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        maxHeight: '300px', // Increased height limit
                        overflowY: 'auto', // Enable scrolling for long text
                        padding: '20px', // Adjusted padding
                        border: '1px solid #ccc', // Add border for outline
                        borderRadius: '5px', // Rounded corners
                        backgroundColor: '#f9f9f9', // Light background for better readability
                      }}
                    >
                      {item.text}
                    </p>
                  )}
                  {/* Dropdown Menu */}
                  <div className="relative">
                    {!item.isEditing && (
                      <button
                        onClick={() => {
                          const updatedFeedbackList = [...feedbackList];
                          updatedFeedbackList[index].showMenu = !updatedFeedbackList[index].showMenu;
                          setFeedbackList(updatedFeedbackList);
                        }}
                        className="px-2 py-1 text-gray-500 hover:text-gray-700"
                      >
                        ...
                      </button>
                    )}
                    {item.showMenu && !item.isEditing && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-10">
                        <button
                          onClick={() => {
                            const updatedFeedbackList = [...feedbackList];
                            updatedFeedbackList[index].isEditing = true;
                            updatedFeedbackList[index].showMenu = false; // Hide dropdown
                            setFeedbackList(updatedFeedbackList);
                            setFeedback(item.text); // Set feedback text for editing
                            setShowFeedbackForm(true); // Show feedback form
                            setEditingIndex(index); // Set editing index
                          }}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteFeedback(index)}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setReplyingIndex(index); // Set replying index
                            setShowFeedbackForm(true); // Show feedback form
                          }}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Reply
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {/* Display Replies */}
                {item.replies.length > 0 && (
                  <div className="mt-4 pl-6 border-l-4 border-blue-500">
                    {item.replies.map((reply, replyIndex) => (
                      <div
                        key={replyIndex}
                        className="mb-2 p-3 bg-gray-100 rounded shadow-sm"
                        style={{
                          borderLeft: '4px solid #2b2d78', // Vertical line for separation
                          wordWrap: 'break-word', // Ensure long words break to the next line
                          overflowWrap: 'break-word', // Handle overflow for long words
                          maxWidth: '100%', // Prevent text from exceeding the container width
                          overflow: 'hidden', // Hide any overflowing content
                        }}
                      >
                        <p
                          className="text-sm text-gray-800"
                          style={{
                            maxHeight: '150px', // Limit the height of the reply box
                            overflowY: 'auto', // Add vertical scrolling for long replies
                          }}
                        >
                          <strong>Reply:</strong> {reply}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#2b2d78' }} className="text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Smart Tax. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
