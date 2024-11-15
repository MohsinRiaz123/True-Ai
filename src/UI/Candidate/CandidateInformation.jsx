// import React, { useState } from "react";
// import { VscDiffAdded } from "react-icons/vsc";
// import { MdOutlineArrowBackIos } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { RxCross1 } from "react-icons/rx";
// import { RiDeleteBinLine } from "react-icons/ri";

// const CandidateInformation = () => {
//   const [addExp, setAddExp] = useState(false);
//   const [addEducation, setAddEducation] = useState(false);
//   const [currentlyWorking, setCurrentlyWorking] = useState(false);
//   const [experienceList, setExperienceList] = useState([]);
//   const [educationList, setEducationList] = useState([]);

//   const [formData, setFormData] = useState({
//     jobTitle: "",
//     company: "",
//     country: "",
//     cityState: "",
//     fromDate: "",
//     toDate: "",
//     description: "",
//   });

//   const [educationData, setEducationData] = useState({
//     degree: "",
//     institute: "",
//     fromDate: "",
//     toDate: "",
//   });

//   const navigate = useNavigate();

//   const nextpage = () => {
//     navigate("/candidate");
//   };

//   const backPage = () => {
//     navigate("/candidateInfo/additional");
//   };

//   const handleToDateChange = (e) => {
//     const value = e.target.value;
//     setFormData((prev) => ({ ...prev, toDate: value }));
//     if (value) {
//       setCurrentlyWorking(false);
//     }
//   };

//   const handleCheckboxChange = (e) => {
//     const checked = e.target.checked;
//     setCurrentlyWorking(checked);
//     if (checked) {
//       setFormData((prev) => ({ ...prev, toDate: "" }));
//     }
//   };

//   const handleAddExperience = () => {
//     setExperienceList((prev) => [
//       ...prev,
//       {
//         ...formData,
//         toDate: currentlyWorking ? "" : formData.toDate,
//         currentlyWorking,
//       },
//     ]);
//     setAddExp(false);
//     setFormData({
//       jobTitle: "",
//       company: "",
//       country: "",
//       cityState: "",
//       fromDate: "",
//       toDate: "",
//       description: "",
//     });
//     setCurrentlyWorking(false);
//   };

//   const handleAddEducation = () => {
//     setEducationList((prev) => [
//       ...prev,
//       {
//         ...educationData,
//         toDate: currentlyWorking ? "" : educationData.toDate,
//         currentlyEnrolled: currentlyWorking,
//       },
//     ]);
//     setAddEducation(false);
//     setEducationData({
//       degree: "",
//       institute: "",
//       fromDate: "",
//       toDate: "",
//     });
//     setCurrentlyWorking(false);
//   };

//   const handleDeleteExperience = (index) => {
//     setExperienceList((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleDeleteEducation = (index) => {
//     setEducationList((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="relative space-y-2">
//       <div>
//         <p className="text-2xl font-bold">Candidate Information</p>
//         <p className="text-lg">
//           Please make sure the information shown here is correct.
//         </p>
//       </div>
//       <div>
//         <p className="text-xl font-semibold">Summary</p>
//         <textarea
//           className="border border-gray-500 min-h-[150px] rounded-2xl w-full px-3 py-1 outline-none"
//           placeholder="Lorem ipsum is a dummy text/............"
//         ></textarea>
//       </div>
//       <div>
//         <div className="flex justify-between">
//           <p className="text-xl font-semibold">Work Experience</p>
//           <button
//             className="text-xl px-5 outline-none"
//             onClick={() => setAddExp(true)}
//           >
//             <VscDiffAdded />
//           </button>
//           {addExp && (
//             <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//               <div className="w-[40%] bg-white px-5 py-2 rounded-xl">
//                 <div className="flex justify-between mt-8">
//                   <p className="text-2xl font-semibold">Add Work Experience</p>
//                   <button
//                     className="bg-black text-white p-2 text-lg rounded-lg"
//                     onClick={() => setAddExp(false)}
//                   >
//                     <RxCross1 />
//                   </button>
//                 </div>
//                 <form className="grid grid-cols-2 gap-5 mt-4">
//                   <div className="flex flex-col">
//                     <label className="font-semibold flex">
//                       Job Title <p className="text-red-600">*</p>
//                     </label>
//                     <input
//                       type="text"
//                       className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg"
//                       value={formData.jobTitle}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           jobTitle: e.target.value,
//                         }))
//                       }
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <label className="font-semibold flex">
//                       Company<p className="text-red-600">*</p>
//                     </label>
//                     <input
//                       type="text"
//                       className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg"
//                       value={formData.company}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           company: e.target.value,
//                         }))
//                       }
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <label className="font-semibold">Country</label>
//                     <input
//                       type="text"
//                       className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg"
//                       value={formData.country}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           country: e.target.value,
//                         }))
//                       }
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <label className="font-semibold">City, State</label>
//                     <input
//                       type="text"
//                       className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg"
//                       value={formData.cityState}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           cityState: e.target.value,
//                         }))
//                       }
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <label className="font-semibold">From</label>
//                     <input
//                       type="date"
//                       className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg"
//                       value={formData.fromDate}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           fromDate: e.target.value,
//                         }))
//                       }
//                     />
//                   </div>
//                   <div className="flex flex-col space-y-2">
//                     <div className="flex flex-col">
//                       <label className="font-semibold">To</label>
//                       <input
//                         type="date"
//                         className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg"
//                         value={formData.toDate}
//                         onChange={handleToDateChange}
//                         disabled={currentlyWorking} // Disable "To" date input if currently working
//                       />
//                     </div>
//                     <div className="flex gap-2">
//                       <input
//                         type="checkbox"
//                         checked={currentlyWorking}
//                         onChange={handleCheckboxChange}
//                       />
//                       <p>Currently working</p>
//                     </div>
//                   </div>
//                   <div className="flex flex-col col-span-2">
//                     <label className="font-semibold">Description</label>
//                     <textarea
//                       className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg min-h-[100px] mt-2"
//                       value={formData.description}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           description: e.target.value,
//                         }))
//                       }
//                     />
//                   </div>
//                 </form>
//                 <div className="mt-5 flex justify-end">
//                   <button
//                     className="bg-black text-white px-6 py-1 rounded-lg"
//                     onClick={handleAddExperience}
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div>
//           {experienceList.map((exp, i) => (
//             <div key={i} className="border p-2 my-2 rounded-md flex justify-between text-sm">
//               <div className="flex flex-col justify-around">
//                 <h3 className="font-bold">{exp.jobTitle}</h3>
//                 <p>{exp.company}</p>
//               </div>
//               <div>
//                 <p>
//                   {exp.fromDate} - {exp.currentlyWorking ? "Present" : exp.toDate}
//                 </p>
//                 <div className="flex justify-end">
//                   <button
//                     className="text-white bg-black p-2 rounded-lg w-8 text-lg"
//                     onClick={() => handleDeleteExperience(i)}
//                   >
//                     <RiDeleteBinLine />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div>
//         <div className="flex justify-between">
//           <p className="text-xl font-semibold">Education</p>
//           <button
//             className="text-xl px-5"
//             onClick={() => setAddEducation(true)}
//           >
//             <VscDiffAdded />
//           </button>
//           {addEducation && (
//             <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//               <div className="w-[40%] bg-white px-5 py-2 rounded-xl">
//                 <div className="flex justify-between mt-8">
//                   <p className="text-2xl font-semibold">Add Education</p>
//                   <button
//                     className="bg-black text-white p-2 text-lg rounded-lg"
//                     onClick={() => setAddEducation(false)}
//                   >
//                     <RxCross1 />
//                   </button>
//                 </div>
//                 <form className="grid grid-cols-2 gap-5 mt-4">
//                   <div className="flex flex-col">
//                     <label className="font-semibold px-2 flex">
//                       Degree <p className="text-red-600">*</p>
//                     </label>
//                     <input
//                       type="text"
//                       className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg"
//                       value={educationData.degree}
//                       onChange={(e) =>
//                         setEducationData((prev) => ({
//                           ...prev,
//                           degree: e.target.value,
//                         }))
//                       }
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <label className="font-semibold px-2">Institute</label>
//                     <input
//                       type="text"
//                       className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg"
//                       value={educationData.institute}
//                       onChange={(e) =>
//                         setEducationData((prev) => ({
//                           ...prev,
//                           institute: e.target.value,
//                         }))
//                       }
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <label className="font-semibold px-2">From</label>
//                     <input
//                       type="date"
//                       className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg"
//                       value={educationData.fromDate}
//                       onChange={(e) =>
//                         setEducationData((prev) => ({
//                           ...prev,
//                           fromDate: e.target.value,
//                         }))
//                       }
//                     />
//                   </div>
//                   <div className="flex flex-col space-y-2">
//                     <div className="flex flex-col">
//                       <label className="font-semibold px-2">To</label>
//                       <input
//                         type="date"
//                         className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg"
//                         value={educationData.toDate}
//                         onChange={(e) =>
//                           setEducationData((prev) => ({
//                             ...prev,
//                             toDate: e.target.value,
//                           }))
//                         }
//                         disabled={currentlyWorking} // Disable "To" date input if currently enrolled
//                       />
//                     </div>
//                     <div className="flex gap-2">
//                       <input
//                         type="checkbox"
//                         checked={currentlyWorking}
//                         onChange={handleCheckboxChange}
//                       />
//                       <p>Currently enrolled</p>
//                     </div>
//                   </div>
//                 </form>
//                 <div className="mt-5 flex justify-end">
//                   <button
//                     className="bg-black text-white px-6 py-1 rounded-lg"
//                     onClick={handleAddEducation}
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="">
//           {educationList.map((edu, i) => (
//             <div
//               key={i}
//               className="border p-2 my-2 rounded-md flex justify-between text-sm"
//             >
//               <div className="flex flex-col justify-around">
//                 <h3 className="font-bold">{edu.degree}</h3>
//                 <p>{edu.institute}</p>
//               </div>
//               <div className="">
//                 <p>
//                   {edu.fromDate} - {edu.currentlyEnrolled ? "Present" : edu.toDate}
//                 </p>
//                 <div className="flex justify-end">
//                   <button
//                     className="text-white bg-black p-2 rounded-lg w-8 text-lg"
//                     onClick={() => handleDeleteEducation(i)}
//                   >
//                     <RiDeleteBinLine />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex justify-between items-center py-3 mt-20">
//         <button className="gap-2 flex items-center text-lg" onClick={backPage}>
//           <p>
//             <MdOutlineArrowBackIos />
//           </p>
//           <p>Previous</p>
//         </button>
//         <button
//           className="bg-LoginBtn bg-center bg-cover text-white px-4 py-1 rounded-full text-lg"
//           onClick={nextpage}
//         >
//           Complete Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CandidateInformation;
