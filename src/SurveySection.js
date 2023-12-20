


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const MessageModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-4 shadow-lg rounded-md">
        <div className="text-lg text-red-700 font-semibold mb-2">{message}</div>
        <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Close
        </button>
      </div>
    </div>
  );
};

const SurveySection = () => {
  const [userSurvey, setUserSurvey] = useState({
    question: '',
    options: [],
  });

  const [allQuestions, setAllQuestions] = useState([]);
  const [userSurveys, setUserSurveys] = useState([]);
  // const [error, setError] = useState('');
  // const [success, setSuccess] = useState('');


  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const submitUserSurvey = async () => {
    if (userSurvey.question.trim() === '' || userSurvey.options.some((option) => option.trim() === '')) {
      setShowErrorModal(true);
      setShowSuccessModal(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/user-surveys', userSurvey);
      fetchUserSurveys();
      setAllQuestions([...allQuestions, userSurvey]);
      setUserSurvey({
        question: '',
        options: [],
      });
      setShowErrorModal(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting user survey:', error.message);
      setShowErrorModal(true);
      setShowSuccessModal(false);
    }
  };


  useEffect(() => {
    fetchQuestions();
    fetchUserSurveys();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user-surveys');
      setAllQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error.message);
    }
  };

  const fetchUserSurveys = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user-surveys');
      setUserSurveys(response.data);
    } catch (error) {
      console.error('Error fetching user surveys:', error.message);
    }
  };

  // const submitUserSurvey = async () => {
  //   // Validate if question and options are not empty
  //   if (userSurvey.question.trim() === '' || userSurvey.options.some((option) => option.trim() === '')) {
  //     setError('Please enter a question and at least one option.');
  //     setSuccess('');
  //     return;
  //   }

  //   try {
  //     await axios.post('http://localhost:5000/api/user-surveys', userSurvey);
  //     fetchUserSurveys();
  //     setAllQuestions([...allQuestions, userSurvey]); // Assuming you want to update allQuestions too
  //     setUserSurvey({
  //       question: '',
  //       options: [],
  //     });
  //     setError('');
  //     setSuccess('Survey submitted successfully!');
  //     // Hide success message after 3 seconds
  //     setTimeout(() => {
  //       setSuccess('');
  //     }, 3000);
  //   } catch (error) {
  //     console.error('Error submitting user survey:', error.message);
  //     setError('Error submitting survey. Please try again.');
  //     setSuccess('');
  //   }
  // };

  return (
    <div className="p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg shadow-lg">
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">User-Generated Survey</h2>
          <div className="mb-4">
            <label className="block text-lg mb-2">Question:</label>
            <input
              type="text"
              value={userSurvey.question}
              onChange={(e) => setUserSurvey({ ...userSurvey, question: e.target.value })}
              className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2">Options (separate with commas):</label>
            <input
              type="text"
              value={userSurvey.options.join(',')}
              onChange={(e) => setUserSurvey({ ...userSurvey, options: e.target.value.split(',') })}
              className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            onClick={submitUserSurvey}
            className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit User Survey
          </button>

          {showErrorModal && (
        <MessageModal message="Please enter a question and at least one option." onClose={() => setShowErrorModal(false)} />
      )}
      {showSuccessModal && (
        <MessageModal message="Survey submitted successfully!" onClose={() => setShowSuccessModal(false)} />
      )}


          {/* {error && <div className="text-red-500 mt-2">{error}</div>}
          {success && <div className="text-green-500 mt-2">{success}</div>} */}
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">All User Surveys</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4 border">Question</th>
                <th className="py-2 px-4 border">Options</th>
              </tr>
            </thead>
            <tbody>
              {userSurveys.map((survey) => (
                <tr key={survey._id} className="bg-gray-700 text-white">
                  <td className="py-2 px-4 border">{survey.question}</td>
                  <td className="py-2 px-4 border">{survey.options.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SurveySection;
