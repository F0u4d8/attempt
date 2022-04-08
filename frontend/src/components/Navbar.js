import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/reducers/authReducer';
import Sidebar from './Sidebar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import jwtDecode from 'jwt-decode';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

function Navbar() {
    const { adminToken } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    const adminLogout = () => {
        dispatch(logout());
    }

function verifyToken (){
 if(adminToken) {
    const decodeToken = jwtDecode(adminToken);
    const name= decodeToken.name
   return name

 } else {
     return null
 }

}
 

const value = verifyToken()


  
 
 

  return (
    <nav className="fiexed left-64 top-4 right-0 ">
      <div className="bg-gold w-full flex p-3 justify-end">
      
      
{adminToken ?  <NavDropdown title={value}>
  <LinkContainer to="/dashboard/account"><NavDropdown.Item>User Profile</NavDropdown.Item></LinkContainer>
<NavDropdown.Divider />
<button className="text-lg capitalize" onClick={adminLogout}>logout</button>

</NavDropdown> : <Link to="/auth/admin-login" className='btn-blue'>Sign in </Link>}



        <Sidebar />
      </div>
    </nav>
  );
}

export default Navbar;
