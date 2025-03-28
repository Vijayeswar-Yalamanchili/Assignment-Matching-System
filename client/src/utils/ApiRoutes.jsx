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
    CONTACTUS : {
        path : '/candidates/contact ',
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
    USERPROFILEUPDATE : {
        path : '/candidates/profileupdate',
        authenticate : true
    },
    ADDADDRESS : {
        path : '/candidates/addaddress',
        authenticate : true
    },
    GETADDRESS : {
        path : '/candidates/getaddress',
        authenticate : true
    },
    EDITADDRESS : {
        path : '/candidates/editaddress',
        authenticate : true
    },
    DELETEADDRESS : {
        path : '/candidates/deleteaddress',
        authenticate : true
    },
    GETALLPRODUCTS : {
        path : '/candidates/allproducts',
        authenticate : true
    },
    ADDCARTLIST : {
        path : '/candidates/addcart',
        authenticate : true
    },
    REMOVECARTLIST : {
        path : '/candidates/removecart',
        authenticate : true
    },
    REMOVECARTITEMS : {
        path : '/candidates/clearcart',
        authenticate : true
    },
    GETCARTITEMS : {
        path :'/candidates/cartitems',
        authenticate : true
    },
    UPDATEQUANTITY : {
        path :'/candidates/updatequantity',
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
    ADMINPROFILEUSER : {
        path : '/admin/getcurrentuser',
        authenticate : true
    },
    ADMINUPDATEPROFILEUSER : {
        path : '/admin/updatecurrentuser',
        authenticate : true
    },
    ADMINEDITUSER : {
        path : '/admin/edituser',
        authenticate : true
    },
    ADMINDELETEUSER : {
        path : '/admin/deleteuser',
        authenticate : true
    },
    ADMINADDPRODUCT : {
        path : '/admin/addproduct',
        authenticate : true
    },
    ADMINGETPRODUCT : {
        path : '/admin/getallproducts',
        authenticate : true
    },
    ADMINGETORDER : {
        path : '/admin/getallorders',
        authenticate : true
    },
    ADMINEDITPRODUCT : {
        path : '/admin/editproduct',
        authenticate : true
    },
    ADMINDELETEPRODUCT : {
        path : '/admin/deleteproduct',
        authenticate : true
    },
    ADMINGETALLORDERS : {
        path :'/admin/myorders',
        authenticate : false
    },
}

export default ApiRoutes