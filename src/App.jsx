import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/OnBording/Login";
import ForgetPassword from "./pages/OnBording/ForgotPassword";
import EmailSend from "./pages/OnBording/EmailSend";
import ResetPassword from "./pages/OnBording/ResetPassword";
import ResetConfirmation from "./pages/OnBording/ResetConfirmation";
import LogInSignUp from "./pages/OnBording/LogInSignUp";
import SignUp from "./pages/OnBording/SignUp";
import EmployeeSignup from "./pages/OnBording/EmployeeSignup";
import CandidateProfile from "./pages/Candidate/CandidateProfile";
import ScheduledInterview from "./UI/Candidate/ScheduledInterview";
import Job from "./UI/Candidate/Job";
import Reschedule from "./UI/Candidate/Reschedule";
import Candidate from "./pages/Candidate/Candidate";
import InterviewHistory from "./UI/Candidate/InterviewHistory";
import SignupChoice from "./pages/OnBording/SignupChoice";
import Employe from "./pages/Employee/Employe";
import EmpDashboard from "./UI/Employee/EmpDashboard";
import EmpScheduledInterview from "./UI/Employee/EmpScheduledInterview";
import EmpCancelledInterviews from "./UI/Employee/EmpCancelledInterviews";
import EmployeProfile from "./pages/Employee/EmployeProfile";
import UserManagement from "./UI/Employee/UserManagement";
import EmployerHome from "./UI/Employee/EmployerHome";
import ScannedResume from "./UI/Employee/ScannedResume";
import ShowResume from "./UI/Employee/ShowResume";
import CandidatePersonalInfo from "./UI/Candidate/CandidatePersonalInfo";
import CandidateContectInfo from "./UI/Candidate/CandidateContectInfo";
import CandidateAdditionalInfo from "./UI/Candidate/CandidateAdditionalInfo";
import CandidateHome from "./UI/Candidate/CandidateHome";
import CreatePreInterview from "./UI/Employee/CreatePreInterview";
import InterviewSchedule from "./UI/Employee/InterviewSchedule";
import BulkUpload from "./UI/Employee/BulkUpload";
import RecordingsList from "./UI/Employee/RecordingsList";
import CandidateRecordingHistory from "./UI/Candidate/CandidateRecordingHistory";
import CandidateRecordingDetail from "./UI/Candidate/CandidateRecordingDetail";
import EmpRecordingDetailes from "./UI/Employee/EmpRecordingDetailes";
import Subscription from "./UI/Employee/Subscription";
import StartInterview from "./UI/StartInterview";
import DeclinedInterview from "./UI/Candidate/DeclinedInterview";
import RescheduledInterviews from "./UI/Candidate/RescheduledInterviews";
import EmpDeclinedInterview from "./UI/Employee/EmpDeclinedInterview";
import EmpPendingInterviews from "./UI/Employee/EmpPendingInterviews";
import EmpRescheduleInterviews from "./UI/Employee/EmpRescheduleInterviews";
import Main from "./UI/Candidate/AutoFetchedInfo/Main";
import CandidateDashboard from "./WebRTC/component/CandidateDashboard";
import EmployeDashboard from "./pages/Employee/EmployeDashboard";
import{QueryClient, QueryClientProvider} from "@tanstack/react-query";
export default function App() {
  const route = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/empsignup",
      element: <EmployeeSignup />,
    },
    {
      path: "/forgotpassword",
      element: <ForgetPassword />,
    },
    {
      path: "/emailsend",
      element: <EmailSend />,
    },
    {
      path: "/resetpassword",
      element: <ResetPassword />,
    },
    {
      path: "/resetconfirmation",
      element: <ResetConfirmation />,
    },
    {
      path: "/",
      element: <LogInSignUp />,
    },
    {
      path: "/signupchoice",
      element: <SignupChoice />,
    },
    {
      path: "/candidateInfo",
      element: <CandidateProfile />,
      children: [
        {
          index: true,
          element: <CandidatePersonalInfo />,
        },
        {
          path: "contact",
          element: <CandidateContectInfo />,
        },
        {
          path: "additional",
          element: <CandidateAdditionalInfo />,
        },
        {
          path: "info",
          element: <Main />,
        },
      ],
    },
    {
      path: "/candidate",
      element: <Candidate />,
      children: [
        {
          index: true,
          element: <CandidateHome />,
        },
        {
          path: "job",
          element: <Job />,
        },
        {
          path: "interviewHistory",
          element: <InterviewHistory />,
        },
        {
          path: "scheduleInterview",
          element: <ScheduledInterview />,
        },
        {
          path: "declinedInterview",
          element: <DeclinedInterview />,
        },
        {
          path: "rescheduledInterview",
          element: <RescheduledInterviews />,
        },
        {
          path: "interviewRecordings",
          element: <CandidateRecordingHistory />,
        },
        {
          path: "recdetails",
          element: <CandidateRecordingDetail />,
        },
        {
          path: "reschedule",
          element: <Reschedule />,
        },
      ],
    },
    {
      path: "/empDashboard",
      element: <EmployeDashboard/>,
      children: [
        {
          index: true,
          element: <EmpDashboard />,
        },
        {
          path: "scheduleInterviews",
          element: <EmpScheduledInterview />,
        },
        {
          path: "declinedInterviews",
          element: <EmpDeclinedInterview />,
        },
        {
          path: "pendingInterviews",
          element: <EmpPendingInterviews />,
        },
        {
          path: "RescheduledInterviews",
          element: <EmpRescheduleInterviews />,
        },
        {
          path: "cancelledInterviews",
          element: <EmpCancelledInterviews />,
        },
      ],
    },
    {
      path: "/employe",
      element: <Employe />,
      children: [
        {
          index:true,
          path:"Home",
          element: <EmployerHome />,
        },
        {
          path: "scheduleInterviews",
          element: <EmpScheduledInterview />,
        },
        {
          path: "declinedInterviews",
          element: <EmpDeclinedInterview />,
        },
        {
          path: "pendingInterviews",
          element: <EmpPendingInterviews />,
        },
        {
          path: "RescheduledInterviews",
          element: <EmpRescheduleInterviews />,
        },
        {
          path: "cancelledInterviews",
          element: <EmpCancelledInterviews />,
        },
        {
          path: "usermanagement",
          element: <UserManagement />,
        },
       
        {
          path: "scannedResume",
          element: <ScannedResume />,
        },
        {
          path: "candidateProfile",
          element: <ShowResume />,
        },
        {
          path: "createPreInterview",
          element: <CreatePreInterview />,
        },
        {
          path: "createInterview",
          element: <InterviewSchedule />,
        },
        {
          path: "bulkUpload",
          element: <BulkUpload />,
        },
        {
          path: "preRecordings",
          element: <RecordingsList />,
        },
        {
          path: "recdetails",
          element: <EmpRecordingDetailes />,
        },
        {
          path: "subscription",
          element: <Subscription />,
        },
      ],
    },
    {
      path: "/employeeprofile",
      element: <EmployeProfile />,
    },
    {
      path: "/preInterview",
      element: <CandidateDashboard />,
    },
  ]);

  const queryClient=new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={route} />
    </QueryClientProvider>
  );
}
