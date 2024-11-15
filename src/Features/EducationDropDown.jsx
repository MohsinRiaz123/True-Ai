import React, { useState } from "react";

const EducationDropDown = (props) => {
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const undergraduateDegrees = [
    "Bachelor of Arts (BA)",
    "Bachelor of Science (BS)",
    "Bachelor of Engineering (BEng)",
    "Bachelor of Fine Arts (BFA)",
    "Bachelor of Business Administration (BBA)",
    "Bachelor of Commerce (BCom)",
    "Bachelor of Laws (LLB)",
    "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
    "Bachelor of Education (BEd)",
    "Bachelor of Architecture (BArch)",
    "Bachelor of Social Work (BSW)",
    "Bachelor of Design (BDes)",
    "Bachelor of Music (BMus)",
    "Bachelor of Technology (BTech)",
    "Bachelor of Nursing (BN)",
  ];

  const graduateDegrees = [
    "Master of Arts (MA)",
    "Master of Science (MS)",
    "Master of Business Administration (MBA)",
    "Master of Engineering (MEng)",
    "Master of Fine Arts (MFA)",
    "Master of Education (MEd)",
    "Master of Public Health (MPH)",
    "Master of Laws (LLM)",
    "Master of Social Work (MSW)",
    "Master of Architecture (MArch)",
    "Master of Design (MDes)",
    "Master of Music (MMus)",
    "Master of Nursing (MN)",
    "Master of Philosophy (MPhil)",
  ];

  const doctoralDegrees = [
    "Doctor of Philosophy (PhD)",
    "Doctor of Medicine (MD)",
    "Doctor of Education (EdD)",
    "Doctor of Business Administration (DBA)",
    "Doctor of Engineering (DEng)",
    "Doctor of Psychology (PsyD)",
    "Doctor of Nursing Practice (DNP)",
    "Doctor of Public Health (DrPH)",
  ];

  const professionalDegrees = [
    "Juris Doctor (JD)",
    "Doctor of Dental Surgery (DDS)",
    "Doctor of Optometry (OD)",
    "Doctor of Veterinary Medicine (DVM)",
    "Doctor of Pharmacy (PharmD)",
    "Certified Public Accountant (CPA)",
  ];

  const diplomasAndCertificates = [
    "Postgraduate Diploma",
    "Graduate Certificate",
    "Undergraduate Certificate",
    "Vocational Diploma",
    "Technical Diploma",
    "High School Diploma",
    "General Educational Development (GED)",
  ];

  const handleDegreeClick = (degree) => {
    // Call the function passed via props
    props.setEducationTerm(degree);
    setShow(false); // Hide dropdown after selection
  };

  return (
    <div className="absolute bg-gray-100 border-gray-300 rounded-lg w-[20%] mt-3 z-10 text-sm p-2">
      <div className="overflow-y-auto max-h-[200px]">
      <div>
          <p className="font-bold px-1">
            Bachelors 
          </p>
          {undergraduateDegrees.map((degree, index) => (
            <div
              key={index}
              className="p-1 hover:bg-gray-300 cursor-pointer"
              onClick={() => handleDegreeClick(degree)}
            >
              {degree}
            </div>
          ))}
           <p className="font-bold px-1">
            Masters 
          </p>
          {graduateDegrees.map((degree, index) => (
            <div
              key={index}
              className="p-1 hover:bg-gray-300 cursor-pointer"
              onClick={() => handleDegreeClick(degree)}
            >
              {degree}
            </div>
             ))}
             <p className="font-bold px-1">
             Doctoral Degree 
          </p>
          {doctoralDegrees.map((degree, index) => (
            <div
              key={index}
              className="p-1 hover:bg-gray-300 cursor-pointer"
              onClick={() => handleDegreeClick(degree)}
            >
              {degree}
            </div>
             ))}
             <p className="font-bold px-1">
             Professional Degree 
          </p>
          {professionalDegrees.map((degree, index) => (
            <div
              key={index}
              className="p-1 hover:bg-gray-300 cursor-pointer"
              onClick={() => handleDegreeClick(degree)}
            >
              {degree}
            </div>
             ))}
              <p className="font-bold px-1">
              Diploma And Certificates
          </p>
          {diplomasAndCertificates.map((degree, index) => (
            <div
              key={index}
              className="p-1 hover:bg-gray-300 cursor-pointer"
              onClick={() => handleDegreeClick(degree)}
            >
              {degree}
            </div>
             ))}
        </div>
        </div>
    </div>
  );
};

export default EducationDropDown;
