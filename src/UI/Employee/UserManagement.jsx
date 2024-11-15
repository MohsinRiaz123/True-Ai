import React, { useState, useEffect } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { AddUserSchema } from "../../schemas/addUserSchema";
import { useFormik } from "formik";
import { GoDotFill } from "react-icons/go";
import { useGetUsers } from "../../Services/Employee/User_Managment/useGetUsers";
import useAddUser from "../../Services/Employee/User_Managment/useAddUser";
import useEditUser from "../../Services/Employee/User_Managment/useEditUser";
import usedeleteUser from "../../Services/Employee/User_Managment/usedeleteUser";

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showPop, setShowPop] = useState(false);
  const [showEditPop, setShowEditPop] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [addUser, setAddUser] = useState([]);
  const { data, isLoading } = useGetUsers();
  const {
    mutate: AddUser,
    isLoading: addLoading,
    isError,
    error,
  } = useAddUser();
  const {
    mutate: EditUser,
    isLoading: EditLoading,
    isError: EditisError,
    error: EditError,
  } = useEditUser();

  const {
    mutate: DeleteUser,
    isLoading: DeleteLoading,
    isError: DeleteisError,
    error: DeleteError,
  } = usedeleteUser();
  useEffect(() => {
    if (data) {
      setAddUser(data);
    }
  }, [data]);

  const updateUserData = async (updatedValues) => {
    console.log("edit value", updatedValues);

    // Create the title
    const newTitle = `${updatedValues.firstName} ${updatedValues.lastName}`;

    // Create a new payload including the title
    const payload = {
      ...updatedValues,
      title: newTitle, // Add the title here
    };

    // Optionally update the local state with the new title
    setAddUser((prevUsers) =>
      prevUsers.map((user) =>
        user.email === currentUser.email
          ? {
              ...user,
              ...payload, // Use the updated payload
            }
          : user
      )
    );

    try {
      const response = await EditUser(payload); // Use the payload here
      // Optionally handle success response
    } catch (error) {
      setErrorMessage("Failed to update user.");
      // Optionally revert title change or handle error state
    }
  };
  const addUserFunc = async (values) => {
    console.log("New User", values);
    const newUser = {
      title: `${values.firstName} ${values.lastName}`,
      role: values.role,
      email: values.email,
      phone: values.phone,
      status: values.status,
    };

    try {
      const res = await AddUser(newUser);

      setAddUser((prevUsers) => [...prevUsers, newUser]);
      setShowPop(false);
    } catch (error) {
      setErrorMessage("Failed to add user.");
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setValues,
  } = useFormik({
    initialValues: {
      id: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      role: "",
      status: "active", // Default status
    },
    validationSchema: AddUserSchema,
    onSubmit: (values, { resetForm }) => {
      setErrorMessage("");
      const isEmailDuplicate = addUser.some(
        (user) =>
          user.email === values.email && user.email !== currentUser?.email
      );
      const isPhoneDuplicate = addUser.some(
        (user) =>
          user.phone === values.phone && user.phone !== currentUser?.phone
      );

      if (isEmailDuplicate) {
        setErrorMessage("Email already exists.");
        return;
      }
      if (isPhoneDuplicate) {
        setErrorMessage("Phone number already exists.");
        return;
      }

      if (currentUser) {
        updateUserData(values);
      } else {
        addUserFunc(values);
      }
      resetForm();
      setCurrentUser(null); // Clear current user
    },
  });

  const deleteUser = async (id) => {
    console.log("id ->", id);
    try {
      const responce = await DeleteUser(id);
      setAddUser((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      setErrorMessage("Failed to delete user.");
    }
  };

  const filteredUsers = addUser.filter(
    (user) =>
      user.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
  );

  const currentRows = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setValues({
      id: user.id,
      firstName: user.title.split(" ")[0],
      lastName: user.title.split(" ")[1] || "",
      phone: user.phone,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setShowEditPop(true);
  };

  const getDotColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "#A3E635";
      case "inactive":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col tablet:flex-row items-center justify-between space-y-5">
        <div className="">
          <p className="text-lg laptop:text-2xl font-bold">User Management</p>
        </div>
        <div className="flex gap-10 items-center pr-0 tablet:pr-5 laptop:pr-10 text-xs laptop:text-base">
          <div className="flex border border-gray-300 shadow-lg shadow-gray-300 px-3 py-1 rounded-lg">
            <div>
              <input
                type="text"
                name="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="placeholder:text-gray-500 outline-none"
              />
            </div>
            <div className="text-gray-500 flex items-center">
              <RiSearch2Line />
            </div>
          </div>
          <div>
            <button
              className="border border-gray-300 shadow-lg shadow-gray-300 px-2 laptop:px-3 py-1 rounded-lg laptop:rounded-xl text-purple-600"
              onClick={() => {
                setCurrentUser(null); // Clear current user
                // Reset form values for adding a new user, or keep it as empty fields
                setValues({
                  firstName: "",
                  lastName: "",
                  phone: "",
                  email: "",
                  role: "",
                  status: "Active", // Set default status if needed
                });
                setShowPop(true);
              }}
            >
              Add User
            </button>
            {(showPop || showEditPop) && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="flex bg-white px-10 py-5 w-[90%] laptop:w-[45%] flex-col rounded-2xl space-y-5">
                  <div className="text-lg flex justify-between">
                    <div className="text-xl font-bold">
                      {currentUser ? "Edit User" : "Create a New User"}
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setShowPop(false);
                          setShowEditPop(false);
                          setCurrentUser(null);
                        }}
                      >
                        <div className="bg-black text-white rounded-md p-2">
                          <RxCross1 />
                        </div>
                      </button>
                    </div>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center justify-center w-[90%] tablet:w-3/4 mx-auto space-y-8"
                  >
                    <div className="flex gap-5 tablet:gap-20 w-full">
                      <div className="flex flex-col w-full">
                        <label>First Name</label>
                        <input
                          type="text"
                          placeholder="John"
                          name="firstName"
                          className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.firstName && touched.firstName ? (
                          <p className="text-red-500">{errors.firstName}</p>
                        ) : null}
                      </div>
                      <div className="flex flex-col w-full">
                        <label>Last Name</label>
                        <input
                          type="text"
                          placeholder="Doe"
                          name="lastName"
                          className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.lastName && touched.lastName ? (
                          <p className="text-red-500">{errors.lastName}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex gap-5 tablet:gap-20 w-full">
                      <div className="flex flex-col w-full">
                        <label>Contact No</label>
                        <input
                          type="text"
                          placeholder="+00 123 456 7890"
                          name="phone"
                          className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.phone && touched.phone ? (
                          <p className="text-red-500">{errors.phone}</p>
                        ) : null}
                      </div>
                      <div className="flex flex-col w-full">
                        <label>Email</label>
                        <input
                          type="email"
                          placeholder="mohsin@7kc.com"
                          name="email"
                          className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (
                          <p className="text-red-500">{errors.email}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex gap-5 tablet:gap-20 w-full">
                      <div className="flex flex-col w-full">
                        <label>Role</label>
                        <input
                          type="text"
                          placeholder="Editor / Administrator"
                          name="role"
                          className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200"
                          value={values.role}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.role && touched.role ? (
                          <p className="text-red-500">{errors.role}</p>
                        ) : null}
                      </div>
                      <div className="flex flex-col w-full">
                        <label>Status</label>
                        <select
                          name="status"
                          className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200"
                          value={
                            currentUser === null ? "Active" : values.status
                          } // Assuming values.status holds the selected status
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={currentUser === null} // Disable if not in edit mode
                          id="status"
                        >
                          <option value="" disabled>
                            Select status
                          </option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                        {errors.status && touched.status ? (
                          <p className="text-red-500">{errors.status}</p>
                        ) : null}
                      </div>
                    </div>
                    {errorMessage && (
                      <p className="text-red-500">{errorMessage}</p>
                    )}
                    <div className="flex items-center justify-start pb-10 pt-4 w-full">
                      <button
                        className="bg-LoginBtn bg-cover bg-center text-white px-10 py-3 rounded-full text-sm"
                        type="submit"
                      >
                        {currentUser ? "Update User" : "Add User"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-screen">
        <div className="space-y-4">
          <div className="font-semibold grid grid-cols-5 px-3 tablet:px-5 text-[8px] tablet:text-xs laptop:text-lg">
            <div className="flex items-center justify-start">Title</div>
            <div className="flex items-center justify-start px-2 tablet:px-6">
              Role
            </div>
            <div className="flex items-center justify-start">
              Email & Phone No
            </div>
            <div className="flex items-center justify-end">Status</div>
            <div className="flex items-center justify-end">Action</div>
          </div>
          <div className="space-y-5 text-[8px] tablet:text-xs laptop:text-md 2xl:text-lg">
            {currentRows.length === 0 ? (
              <div className="text-center py-5 text-gray-500">
                No data available
              </div>
            ) : (
              currentRows.map((val, i) => (
                <div key={i} className="grid grid-cols-5">
                  <div className="gap-2 flex items-center">
                    <div className="flex gap-2 flex-col tablet:flex-row">
                      <img
                        src={val.image}
                        alt="user pic"
                        className="w-5 h-5 tablet:w-8 tablet:h-8 2xl:w-10 2xl:h-10 text-xs  rounded-full"
                      />
                      <p className="flex items-center">{val.title}</p>
                    </div>
                  </div>
                  <div className="flex px-0 tablet:px-6 items-center">
                    <p>{val.role}</p>
                  </div>
                  <div className="flex flex-col flex-wrap">
                    <p>{val.email}</p>
                    <p>{val.phone}</p>
                  </div>
                  <div className="flex items-center justify-end px-0 tablet:px-4">
                    <div className="pl-[15%]">
                      <div className="flex px-2 py-1 border border-gray-300 gap-1 rounded-lg items-center">
                        <p
                          className="text-xl"
                          style={{ color: getDotColor(val.status) }}
                        >
                          <GoDotFill />
                        </p>
                        <p>{val.status}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs tablet:text-lg laptop:text-2xl flex gap-1 tablet:gap-4 justify-end px-4">
                    <button
                      className="text-purple-400"
                      onClick={() => handleEdit(val)}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className="text-pink-400"
                      onClick={() => deleteUser(val.id)}
                    >
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex mt-4  justify-between text-lg p-10">
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`mx-1 flex justify-center items-center gap-1 ${
                currentPage === 1 ? "text-gray-400" : "text-black"
              }`}
            >
              <IoIosArrowBack />
              Previous
            </button>
          </div>
          <div>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-2 py-1 rounded-md ${
                  currentPage === index + 2 ? "text-black" : "text-gray-400"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`mx-1 flex justify-center items-center gap-1 ${
                currentPage === totalPages ? "text-gray-400" : "text-black"
              }`}
            >
              Next
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
