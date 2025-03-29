import { lazy, Suspense } from "react"
import LoadingComponent from "../components/LoadingComponent"
import ErrorScreen from "../pages/ErrorScreen"

const LoginPage = lazy(()=> import('../pages/candidate/Login'))
const RegisterPage = lazy(()=> import('../pages/candidate/Register'))
const ForgotPasswordPage = lazy(()=> import('../pages/candidate/ForgotPassword'))
const Dashboard = lazy(()=> import('../pages/candidate/Dashboard'))
const ProfilePage = lazy(()=> import('../pages/candidate/Profile'))
const ProjectDetails = lazy(()=> import('../pages/candidate/ProjectDetails'))

const AdminLoginPage = lazy(()=> import('../pages/admin/Login'))
const AdminRegisterPage = lazy(()=> import('../pages/admin/Register'))
const AdminForgotPasswordPage = lazy(()=> import('../pages/admin/ForgotPassword'))
const AdminDashboard = lazy(()=> import('../pages/admin/Dashboard'))
const AdminProfilePage = lazy(()=> import('../pages/admin/Profile'))
const AdminProjectDetails = lazy(()=> import('../pages/admin/ProjectDetails'))
const AdminSubmissionsPage = lazy(()=> import('../pages/admin/Submissions'))

const Approutes = [
    {
        path : '/',
        element : <Suspense fallback={<LoadingComponent/>}><LoginPage/></Suspense>,
        exact : true
    },
    {
        path : '/register',
        element : <Suspense fallback={<LoadingComponent/>}><RegisterPage/></Suspense>,
        exact : true
    },
    {
        path : '/forgotpassword',
        element : <Suspense fallback={<LoadingComponent/>}><ForgotPasswordPage/></Suspense>,
        exact : true
    },
    {
        path : '/dashboard',
        element : <Suspense fallback={<LoadingComponent/>}><Dashboard/></Suspense>,
        exact : true
    },
    {
        path : '/profile',
        element : <Suspense fallback={<LoadingComponent/>}><ProfilePage/></Suspense>,
        exact : true
    },
    {
        path : '/projectDetails/:assignmentId',
        element : <Suspense fallback={<LoadingComponent/>}><ProjectDetails/></Suspense>,
        exact : true
    },
    {
        path : '/admin/',
        element : <Suspense fallback={<LoadingComponent/>}><AdminLoginPage/></Suspense>,
        exact : true
    },
    {
        path : '/admin/register',
        element : <Suspense fallback={<LoadingComponent/>}><AdminRegisterPage/></Suspense>,
        exact : true
    },
    {
        path : '/admin/forgotpassword',
        element : <Suspense fallback={<LoadingComponent/>}><AdminForgotPasswordPage/></Suspense>,
        exact : true
    },
    {
        path : '/admin/dashboard',
        element : <Suspense fallback={<LoadingComponent/>}><AdminDashboard/></Suspense>,
        exact : true
    },
    {
        path : '/admin/profile',
        element : <Suspense fallback={<LoadingComponent/>}><AdminProfilePage/></Suspense>,
        exact : true
    },
    {
        path : '/admin/submissons/:assignmentId',
        element : <Suspense fallback={<LoadingComponent/>}><AdminSubmissionsPage/></Suspense>,
        exact : true
    },
    {
        path : '/admin/projectDetails/:assignmentId',
        element : <Suspense fallback={<LoadingComponent/>}><AdminProjectDetails/></Suspense>,
        exact : true
    },
    {
        path:'*',
        element : <ErrorScreen/>,
    }
]

export default Approutes