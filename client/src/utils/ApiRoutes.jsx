const ApiRoutes = {
    LOGIN : {
        path : '/candidates/login',
        authenticate : false
    },
    REGISTER : {
        path : '/candidates/register',
        authenticate : false
    },
    FORGOTPASSWORD : {
        path : '/candidates/forgotpassword',
        authenticate : false
    },
    LOGOUT : {
        path : '/candidates/logout',
        authenticate : true
    },
    SUBMITASSIGNMENT : {
        path : '/candidates/submittask',
        authenticate : true
    },
    CURRENTUSER : {
        path : '/candidates/currentuser',
        authenticate : true
    },
    ALLASSIGNMENTS : {
        path : '/candidates/allassignments',
        authenticate : true
    },
    CURRENTASSIGNMENT : {
        path : '/candidates/getcurrentassignment',
        authenticate : true
    },
    CURRENTSUBMITTEDASSIGNMENT : {
        path : '/candidates/getcurrentsubmittedassignment',
        authenticate : true
    },

    // ADMIN
    ADMINLOGIN : {
        path : '/admin/login',
        authenticate : true
    },
    ADMINREGISTER : {
        path : '/admin/register',
        authenticate : true
    },
    ADMINFORGOTPASSWORD : {
        path : '/admin/forgotpassword',
        authenticate : false
    },
    ADMINLOGOUT : {
        path : '/admin/logout',
        authenticate : true
    },
    ADMINADDASSIGNMENTS : {
        path : '/admin/addassignment',
        authenticate : true
    },
    ADMINALLASSIGNMENTS : {
        path : '/admin/getallassignments',
        authenticate : true
    },
    ADMINCURRENTASSIGNMENT : {
        path : '/admin/getcurrentassignment',
        authenticate : true
    },
    ADMINGETSUBMITTEDTASK : {
        path : '/admin/getsubmittedassignment',
        authenticate : true
    },
    ADMINREVIEWSUBMISSION : {
        path : '/admin/reviewsubmission',
        authenticate : true
    },
    ADMINPROFILEUSER : {
        path : '/admin/getcurrentuser',
        authenticate : true
    }
}

export default ApiRoutes