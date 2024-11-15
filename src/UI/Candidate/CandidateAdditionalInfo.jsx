import React, { useEffect } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSubmitAdditionalInfo from "../../Services/Candidate/CandidateProfile/useSubmitAdditionalInfo";
import { useGetAdditionalInfo } from "../../Services/Candidate/CandidateProfile/useGetAdditionalInfo";

const CandidateAdditionalInfo = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useSubmitAdditionalInfo();
  const { data: d, isLoading: load } = useGetAdditionalInfo();

  const formik = useFormik({
    initialValues: {
      github_link: "",
      linkedin_link: "",
      portfolio_link: "",
      resume_pdf: null, // Initialize as null
    },
    validationSchema: Yup.object({
      resume_pdf: Yup.mixed()
        .required("Resume is required"),
      github_link: Yup.string().url("Invalid URL format"),
      linkedin_link: Yup.string()
        .url("Invalid URL format")
        .required("LinkedIn link is required"),
      portfolio_link: Yup.string().url("Invalid URL format"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      try {
        await mutate(formData);
      } catch (submitError) {
        console.error("Error submitting additional info:", submitError);
      }
    },
  });

  useEffect(() => {
    if (d) {
      formik.setValues({
        github_link: d.github_link || "",
        linkedin_link: d.linkedin_link || "",
        portfolio_link: d.portfolio_link || "",
        resume_pdf: null,
      });
    }
  }, [d]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file type:", file.type); // Log the file type
    formik.setFieldValue("resume_pdf", file);
  };
  

  const backPage = () => {
    navigate("/candidateInfo/contact");
  };

  if (load) {
    return (
      <div className="flex justify-center items-center">
        <div className="border-t-transparent border-solid animate-spin rounded-full border-pink-400 border-8 h-44 w-44"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-between flex-col h-full">
      <div className="space-y-3">
        <div className="space-y-1">
          <p className="font-bold text-lg tablet:text-2xl">Candidate Profile</p>
          <p className="text-sm tablet:text-md laptop:text-lg">
            Provide information about your profession and other details
          </p>
        </div>
        <div>
          <p className="text-xl font-bold">Additional Information</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <img src="/src/assets/Images/illustration.png" alt="Upload" />
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden" // Hide the input
            id="file-upload"
            accept=".pdf"
          />
          <label
            htmlFor="file-upload"
            className="text-purple-500 font-semibold cursor-pointer"
          >
            Upload CV/Resume
          </label>
          <p className="mt-2">
            {formik.values.resume_pdf instanceof File
              ? formik.values.resume_pdf.name
              : ""}
          </p>
          {formik.touched.resume_pdf && formik.errors.resume_pdf ? (
            <p className="text-red-500">{formik.errors.resume_pdf}</p>
          ) : null}
        </div>
        <form className="space-y-10" onSubmit={formik.handleSubmit}>
          <div className="flex gap-5 tablet:gap-20 w-full">
            <div className="flex flex-col w-full">
              <label className="font-semibold">Github Link</label>
              <input
                type="text"
                name="github_link"
                placeholder="https://github.com/mohsinriaz"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200 ${
                  formik.touched.github_link && formik.errors.github_link
                    ? "border-red-500"
                    : ""
                }`}
                value={formik.values.github_link}
              />
              {formik.touched.github_link && formik.errors.github_link && (
                <p className="text-red-500 text-sm">
                  {formik.errors.github_link}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="font-semibold">
                LinkedIn Link<span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                name="linkedin_link"
                placeholder="https://us.linkedin.com/"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200 ${
                  formik.touched.linkedin_link && formik.errors.linkedin_link
                    ? "border-red-500"
                    : ""
                }`}
                value={formik.values.linkedin_link}
              />
              {formik.touched.linkedin_link && formik.errors.linkedin_link && (
                <p className="text-red-500 text-sm">
                  {formik.errors.linkedin_link}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="font-semibold">Portfolio/Website</label>
            <input
              type="text"
              name="portfolio_link"
              placeholder="https://portfolio.com/mohsinriaz"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200 ${
                formik.touched.portfolio_link && formik.errors.portfolio_link
                  ? "border-red-500"
                  : ""
              }`}
              value={formik.values.portfolio_link}
            />
            {formik.touched.portfolio_link && formik.errors.portfolio_link && (
              <p className="text-red-500 text-sm">
                {formik.errors.portfolio_link}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center py-3 mt-20">
            <button
              className="gap-2 flex items-center text-lg"
              onClick={backPage}
            >
              <MdOutlineArrowBackIos />
              <p>Previous</p>
            </button>
            <button
              className={`bg-LoginBtn bg-center bg-cover text-white px-4 py-1 rounded-full text-lg ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Next"}
            </button>
          </div>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default CandidateAdditionalInfo;
