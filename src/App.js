


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Toast =()=>{
  return(
    <div id="toast-simple" class="flex items-center  text-center  w-full max-w-xs p-4 space-x-4  text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
    <svg class="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
    </svg>
    <div class="ps-4 text-sm font-normal">Data saved successfully :)</div>
</div>
  )
}


const Alert =()=>{
  return(
    <div id="toast-simple" class="flex items-center  text-center  w-full max-w-xs p-4 space-x-4  text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
    <svg class="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
    </svg>
    <div class="ps-4 text-lg font-semibold text-red-800 ">Enter all Feilds.....!</div>
</div>
  )
}


function App() {
  const [name, setName] = useState('');
  const [schoolName, setschoolName] = useState('');
  const [address, setaddress] = useState('');
  const [role, setRole] = useState(''); // Student or Teacher
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [success,setSuccess ] = useState(false)
  const [error,seterror ] = useState(false)

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/feedback');
      setFeedbackList(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error.message);
    }
  };

  const submitFeedback = async () => {
      
      if( name && role &&  feedback && schoolName && address !=='')   
    try {
      await axios.post('http://localhost:5000/api/submit-feedback', { name, role, feedback, schoolName });
     
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      fetchFeedback();
      setName('');
      setRole('');
      setFeedback('');
      setschoolName('')
      setaddress('');
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
    }
    else  
    seterror(true);
    setTimeout(() => {
      seterror(false);
    }, 3000);
  
  };

  return (
    <div className='text-center'>
     
  <h1 className='text-4xl font-serif font-bold m-4'>School Survey </h1>
<form class="max-w-sm mx-auto bg-slate-400 rounded-lg p-8 text-start " onSubmit={(e)=>e.preventDefault()}>

      <div  >
        <br />
      {success && <Toast/>}
      {error && <Alert/>}

        <br />
        <label className='text-xl font-semibold'>Role: </label>
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value= "Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Parents/Guardian">Parents/Guardian</option>
        </select>
      </div>
      <div>
        <label className=' font-semibold text-xl'>Name:</label>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label className=' font-semibold text-xl'>School Name:</label>
        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  value={schoolName} onChange={(e) => setschoolName(e.target.value)} />
      </div>
      <div>
        <label className=' font-semibold text-xl'>School Adress:</label>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" value={address} onChange={(e) => setaddress(e.target.value)} />
      </div>
     
<div>
<label className=' font-semibold text-xl'>Feedback:</label>
<textarea className='w-full h-38 p-3 rounded-lg' value={feedback} onChange={(e) => setFeedback(e.target.value)} />
</div>
<button className='bg-blue-600 text-center self-center justify-center p-3 w-full rounded-md text-white text-xl font-semibold' onClick={submitFeedback}>Submit Feedback</button>
 <br />

  <ul>
    {feedbackList.map((item) => (
      <li key={item._id}>
        <strong>{item.name}</strong> ({item.role}): {item.feedback}
      </li>
    ))}
  </ul>
  
</form>
<br /><br />
<Link to={"/survey"} className='bg-purple-400 rounded-lg p-3 text-end mt-5 '>Create Your Own Survey</Link>

  
      
</div>
);
}

export default App;
