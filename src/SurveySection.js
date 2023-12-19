// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SurveySection = () => {
//   const [surveys, setSurveys] = useState([]);
//   const [selectedSurvey, setSelectedSurvey] = useState(null);
//   const [surveyResponses, setSurveyResponses] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchSurveys();
//   }, []);

//   const fetchSurveys = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/surveys/all');
//       setSurveys(response.data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error fetching surveys:', error.message);
//     }
//   };

//   const selectSurvey = (survey) => {
//     setSelectedSurvey(survey);
//     // Initialize responses with empty values for each question
//     const initialResponses = {};
//     survey.questions.forEach((question) => {
//       initialResponses[question.question] = '';
//     });
//     setSurveyResponses(initialResponses);
//   };

//   const submitSurvey = async () => {
//     try {
//       // Send surveyResponses to the server to store the responses
//       console.log({ surveyResponses });
//       // Clear selected survey and responses
//       setSelectedSurvey(null);
//       setSurveyResponses({});
//     } catch (error) {
//       console.error('Error submitting survey responses:', error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Survey Section</h2>

//       {isLoading ? (
//         <p>Loading surveys...</p>
//       ) : (
//         <div>
//           <h3>Available Surveys</h3>
//           <ul>
//             {surveys.map((survey) => (
//               <li key={survey._id} onClick={() => selectSurvey(survey)}>
//                 {survey.name}
//               </li>
//             ))}
//           </ul>

//           {selectedSurvey && (
//             <div>
//               <h3>Selected Survey: {selectedSurvey.name}</h3>
//               <ul>
//                 {selectedSurvey.questions.map((question) => (
//                   <li key={question.question}>
//                     {question.question}
//                     <input
//                       type="text"
//                       value={surveyResponses[question.question]}
//                       onChange={(e) => {
//                         setSurveyResponses({
//                           ...surveyResponses,
//                           [question.question]: e.target.value,
//                         });
//                       }}
//                     />
//                   </li>
//                 ))}
//               </ul>
//               <button onClick={submitSurvey}>Submit Survey</button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SurveySection;


import React, { useState } from 'react';
import axios from 'axios';

const SurveyCreator = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState('');
  
  const addQuestion = () => {
    if (currentQuestion.trim() !== '') {
      setQuestions([...questions, { question: currentQuestion, options }]);
      setCurrentQuestion('');
      setOptions([]);
    }
  };

  const addOption = () => {
    if (currentOption.trim() !== '') {
      setOptions([...options, currentOption]);
      setCurrentOption('');
    }
  };

  // const saveSurvey = () => {
  //   // Send data to the server to save the survey configuration
  //   console.log({ questions });
  // };


  const saveSurvey = async () => {
    try {
      console.log("mera data ")
      // await axios.post('http://localhost:5000/save', { questions });
      await axios.post('http://localhost:5000/api/surveys/save', { questions });

      // await axios.post('http://localhost:5000/api/surveys/save', { questions });

      console.log('Survey questions saved successfully!');
    } catch (error) {
      console.error('Error saving survey questions:', error.message);
    }
  };
  

  return (
    <div className=' text-center'>
      <h2 className='m-4 text-3xl  font-extralight'>Create Your Own Survey</h2>
      
      <div className='flex justify-center'>
        <label className='bg-red-300 p-3'>Question:</label>
        <input
          type="text"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          className='bg-gray-400 mx-1 '
        />
        <button className='bg-yellow-600 rounded-full p-2  ' onClick={addQuestion}>Add Question</button>
      </div>
      <br />

      <div className='flex justify-center'>
        <label className='bg-red-300 p-3'>Options:</label>
        <input
          type="text"
          value={currentOption}
          onChange={(e) => setCurrentOption(e.target.value)}
          className='bg-gray-400 mx-1 '

        />
        <button className='bg-yellow-600 rounded-full p-2  '  onClick={addOption}>Add Option</button>
      </div>
      <br /><br />
      <button className='bg-blue-300 p-2 rounded-md' onClick={saveSurvey}>Save Survey</button>

      <h3 className='text-2xl font-semibold'>Survey Preview</h3>
      <ul>
        {questions.map((q, index) => (
          <li key={index} className='text-2xl font-extrabold'>
            {q.question}
            <ul>
              {q.options.map((opt, optIndex) => (
                <li key={optIndex} className='text-xl font-semibold'>{opt}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyCreator;
