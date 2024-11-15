import React, { useState } from "react";
import useSubmitResumes from "../../Services/Employee/bulkUpload/useSubmitResumas";
const BulkUpload = () => {
  const [file, setFiles] = useState([]);
  const [addAble, setAddAble] = useState(true);
  const { mutate, isPending, isError, error } = useSubmitResumes();
  const handleFileChange = (event) => {
    setAddAble(true);
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 0) {
      const pdfFiles = Array.from(selectedFiles).filter(
        (file) => file.type === "application/pdf"
      );
      if (pdfFiles.length === 0) {
        alert("Please upload valid PDF files.");
      } else {
        setFiles(pdfFiles);
      }
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      file.forEach((file) => {
        formData.append("resume_bulk", file); // Append each file
      });
  
      // Assuming mutate is your function to make the upload request
      await mutate(formData); 
      setAddAble(false);
      setFiles([]); 
    } catch (err) {
      console.error("Error updating data:", err);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xl font-semibold">
          Hello Michael, say goodbye to going through hundreds of resumes and
          let TrueAI do this job for you.
        </p>
      </div>
      <div className="flex gap-10">
        <div className="border border-gray-300 w-[20%] shadow-xl rounded-2xl pb-10">
          <div>
            <p className="text-lg font-semibold p-3">
              Simply follow these steps:
            </p>
          </div>
          {[
            "Upload all the resumes of the candidates at once.",
            "Sit back and relax while TrueAI processes the uploaded resumes.",
            "Our database will discover the top candidates who are the perfect match for your job requirements.",
          ].map((step, index) => (
            <div className="flex p-3 gap-2" key={index}>
              <div className="bg-black rounded-full mt-1 p-2 w-6 h-6 text-white flex items-center justify-center">
                {index + 1}
              </div>
              <div>
                <p>{step}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-[80%] space-y-16">
          <div className="flex items-center justify-center w-full flex-col rounded-2xl space-y-14 border border-gray-300 shadow-xl ">
            <div className="text-xl font-bold text-[#8E01FF] flex justify-center flex-col">
              <p className="flex justify-center pt-10">Upload Resumes</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-center">
                <img
                  src="../../src/assets/Images/pdf.png"
                  alt="Resume Image"
                  className="w-16"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  className={`w-20 laptop:w-[100px]  file:border-0 file:bg-white file:font-semibold ${isPending?" hidden":"file:text-[#8E01FF]" }`}
                  onChange={handleFileChange} // Capture file changes
                  disabled={isPending}
                />
              </div>
            </div>
            {file.length > 0 && (
              <div className="flex flex-col w-full px-7">
                <p className="font-semibold flex justify-center">
                  Selected Files:
                </p>
                <div className="flex flex-wrap mt-3">
                  {file.slice(0, 10).map((file, index) => (
                    <p key={index} className=" text-gray-700 mx-2 text-sm   ">
                      <span className="font-extrabold mr-1">~</span>
                      {file.name}
                    </p>
                  ))}
                </div>
              </div>
            )}
             {isPending && (
              <div className="flex justify-center items-center h-[100px] w-full">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-[100px] w-[100px] animate-spin"></div>
              </div>
            )}
            <div className="flex justify-center">
              <button
                onClick={handleUpload}
                className={`bg-black rounded-full text-white font-semibold px-5 py-2 mb-10 ${
                  isPending || file.length < 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={isPending || file.length < 1}
              >
                {isPending ? "Uploading..." : addAble ? "Upload" : "Done"}
              </button>
              {isError&&(<div className="flex justify-center items-center w-full text-red-500">
                <p>{error}</p>
              </div>)}
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
