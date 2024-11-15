import React, { useEffect } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddressSelector from "../../Features/AddressSelector";
import useSubmitConteactInfo from "../../Services/Candidate/CandidateProfile/useSubmitConteactInfo";
import { useGetContectInfo } from "../../Services/Candidate/CandidateProfile/useGetContectInfo";

const CandidateContactInfo = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, isError, error:ERR } = useSubmitConteactInfo();
  const { data: d, isLoading: load } = useGetContectInfo();
  
  const formik = useFormik({
    initialValues: {
      email: "",
      phone_number: "",
      sms: false,
      whatsapp: false,
      country: "",
      state: "",
      city: "",
      address: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone_number: Yup.string().required("Phone number is required"),
      country: Yup.string().required("Country is required"),
      state: Yup.string().required("State is required"),
      city: Yup.string().required("City is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: async (values) => {
      const errors = await formik.validateForm();
      console.log("Validation errors:", errors); // Debugging line
      formik.setTouched({
        email: true,
        phone_number: true,
        country: true,
        state: true,
        city: true,
        address: true,
        sms: true,
        whatsapp: true,
      });

      if (Object.keys(errors).length > 0) {
        console.log("Form errors detected."); // Debugging line
        return; // Stop submission if errors exist
      }

      try {
        await mutate(values);
      } catch (submitError) {
        console.error("Error submitting contact info:", submitError);
      }
    },
  });

  useEffect(() => {
    if (d) {
      formik.setValues({
        email: d.email || "",
        phone_number: d.phone_number || "",
        sms: d.sms || false,
        whatsapp: d.whatsapp || false,
        country: d.country || "",
        state: d.state || "",
        city: d.city || "",
        address: d.address || "",
      });
    }
  }, [d]);

  const handlePrevious = () => {
    navigate("/candidateInfo");
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
          <p className="text-xl font-bold">Contact Information</p>
        </div>
        <form className="space-y-10" onSubmit={formik.handleSubmit}>
          <div className="flex gap-5 tablet:gap-20 w-full">
            <div className="flex flex-col w-full">
              <label className="font-semibold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="mohsinriaz@7kc.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
                required
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="font-semibold">Phone number</label>
              <input
                type="text"
                name="phone_number"
                placeholder="+991234567892"
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200 ${
                  formik.touched.phone_number && formik.errors.phone_number
                    ? "border-red-500"
                    : ""
                }`}
                required
              />
              {formik.touched.phone_number && formik.errors.phone_number && (
                <p className="text-red-500 text-sm">
                  {formik.errors.phone_number}
                </p>
              )}
              <div className="flex font-semibold mt-2 gap-5">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    name="sms"
                    checked={formik.values.sms}
                    onChange={formik.handleChange}
                  />
                  <label>SMS</label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    name="whatsapp"
                    checked={formik.values.whatsapp}
                    onChange={formik.handleChange}
                  />
                  <label>WhatsApp</label>
                </div>
              </div>
            </div>
          </div>

          {/* Address Fields */}
          <AddressSelector
            formData={formik.values}
            handleChange={formik.handleChange}
            errors={formik.errors}
            touched={formik.touched}
          />

          {isError && <p className="text-red-500">{ERR}</p>}
        </form>
      </div>
      <div className="flex justify-between items-center py-3 mt-20">
        <button
          className="gap-2 flex items-center text-lg"
          onClick={handlePrevious}
        >
          <MdOutlineArrowBackIos />
          <p>Previous</p>
        </button>
        <button
          type="submit"
          className={`bg-LoginBtn bg-center bg-cover text-white px-4 py-1 rounded-full text-lg ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={formik.handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default CandidateContactInfo;
