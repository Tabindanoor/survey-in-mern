




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"
import { Link } from 'react-router-dom';
const App = () => {
  
  const [success,setSuccess ] = useState(false)
  const [error,seterror ] = useState(false)
  const Toast =()=>{
  return(
    <div id="toast-simple" class="flex items-center  text-center  w-full max-w-xs p-4 space-x-4  text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
    {/* <svg class="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
    </svg>
    <div class="ps-4 text-sm font-normal">Data saved successfully :)</div> */}
    <div
        className="fixed inset-x-0 bottom-0 mx-auto max-w-md p-4 mb-4 bg-green-500 text-white rounded-md shadow-md"
        role="alert"
      >
        Data saved successfully! 🚀
      </div>
</div>
  )
}


const Alert =()=>{
  return(
    <div id="toast-simple" class="flex items-center  text-center  w-full max-w-xs p-4 space-x-4  text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
    {/* <svg class="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
    </svg>
    <div class="ps-4 text-lg font-semibold text-red-800 ">Enter all Feilds.....!</div> */}
    <div
        className="fixed inset-x-0 bottom-0 mx-auto max-w-md p-4 mb-4 bg-red-500 text-white rounded-md shadow-md"
        role="alert"
      >
        Enter all fields...!
      </div>
</div>
  )
}


  const [schoolSurvey, setSchoolSurvey] = useState({
    name: '',
    role: '',
    schoolName: '',
    schoolAddress: '',
    feedback: '',
  });

  

  const [schoolSurveys, setSchoolSurveys] = useState([]);
  // const [userSurveys, setUserSurveys] = useState([]);

  useEffect(() => {
    fetchSchoolSurveys();
    // fetchUserSurveys();
  }, []);

  const fetchSchoolSurveys = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/school-surveys');
      setSchoolSurveys(response.data);
    } catch (error) {
      console.error('Error fetching school surveys:', error.message);
    }
  };




  const submitSchoolSurvey = async () => {
    if(schoolSurvey.feedback && schoolSurvey.name && schoolSurvey.role && schoolSurvey.schoolAddress && schoolSurvey.schoolName !=='')

    try {
      await axios.post('http://localhost:5000/api/school-surveys', schoolSurvey);
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 3000);
      fetchSchoolSurveys();
      setSchoolSurvey({
        name: '',
        role: '',
        schoolName: '',
        schoolAddress: '',
        feedback: '',
      });
    } catch (error) {
      console.error('Error submitting school survey:', error.message);
    }
    else  
        seterror(true);
        setTimeout(() => {
          seterror(false);
        }, 3000);
        };
        
  

  return (
    <div className="App text-center   ">
      <h1  className='text-3xl font-serif font-bold'>Survey App</h1>

      {/* School System Survey */}
      <div className='max-w-sm justify-center mx-auto text-start   '>
        <h2  className='text-2xl font-serif font-bold text-center'>School System Survey</h2>
        <label className='text-xl font-semibold'>Name:</label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          value={schoolSurvey.name}
          onChange={(e) => setSchoolSurvey({ ...schoolSurvey, name: e.target.value })}
        />

{/* <br /> */}
      {success && <Toast/>}
      {error && <Alert/>}
       

        <label className='text-xl font-semibold'>Role: </label>
         <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          value={schoolSurvey.role}
          onChange={(e) => setSchoolSurvey({ ...schoolSurvey, role: e.target.value })}
        //  value={role} onChange={(e) => setRole(e.target.value)}
         >
           <option value="">Select Role</option>
           <option value= "Student">Student</option>
           <option value="Teacher">Teacher</option>
           <option value="Parents/Guardian">Parents/Guardian</option>
         </select>


        
        <label className='text-xl font-semibold'>School Name:</label>
        <input
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          type="text"
          value={schoolSurvey.schoolName}
          onChange={(e) => setSchoolSurvey({ ...schoolSurvey, schoolName: e.target.value })}
        />
        <label className='text-xl font-semibold'>School Address:</label>
        <input
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          type="text"
          value={schoolSurvey.schoolAddress}
          onChange={(e) => setSchoolSurvey({ ...schoolSurvey, schoolAddress: e.target.value })}
        />
        <label className='text-xl font-semibold'>Feedback:</label>
        <textarea
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          value={schoolSurvey.feedback}
          onChange={(e) => setSchoolSurvey({ ...schoolSurvey, feedback: e.target.value })}
        />
        <br />
        <button
         className="bg-purple-600  font-semibold text-lg text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
         onClick={submitSchoolSurvey}>Submit School Survey</button>
      </div>

     
      {/* Display School Surveys */}
      <hr className='m-3 ' />
      <div className='text-center mx-auto justify-center  '>
        <h2 className='font-medium text-2xl '>Survey Record</h2>
        <br />
        <table className='text-center align-center justify-center mx-auto ' >
          <thead>
            <tr className=''>
              <th className=' text-xl bg-slate-400  p-2 w-48  rounded-lg '>Name</th>
              <th className=' text-xl bg-slate-400  p-2 w-48  rounded-lg '>Role</th>
              <th className=' text-xl bg-slate-400  p-2 w-48  rounded-lg '>School Name</th>
              <th className=' text-xl bg-slate-400  p-2 w-48  rounded-lg '>School Address</th>
              <th className=' text-xl bg-slate-400  p-2 w-48  rounded-lg '>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {schoolSurveys.map((survey) => (
              <tr key={survey._id}>
                <td>{survey.name}</td>
                <td>{survey.role}</td>
                <td>{survey.schoolName}</td>
                <td>{survey.schoolAddress}</td>
                <td>{survey.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
     {/* <Link  to={"/survey"}><button className='bg-black p-3 text-xl text-white rounded-lg mt-10'>Create You Own Questions  </button> </Link> */}

    
     
    </div>
  );
};

export default App;

