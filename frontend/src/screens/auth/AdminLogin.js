import { useState, useEffect } from 'react';
import { useAuthLoginMutation } from '../../store/services/authService';
import { setAdminToken } from '../../store/reducers/authReducer';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Wrapper from '../dashboard/Wrapper';
import Navbar from '../../components/Navbar';
const AdminLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ email: '', password: '' });

  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [login, response] = useAuthLoginMutation();
  console.log('my response', response);

  const errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];

  const adminLoginFunction = (e) => {
    e.preventDefault();
    login(state);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem('admin-token', response?.data?.token);
      dispatch(setAdminToken(response?.data?.token));
      navigate('/dashboard/products');
    }
  }, [response.isSuccess]);

  return (
   <>
   
   <img
        src="/assets/wave.png"
        className="fixed hidden lg:block inset-0 h-full "
        style={{ zIndex: -1 }}
      ></img>

      <div>
        <div className="h-screen w-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
          <Link to="/auth/register">
            <img
              src="/assets/register.svg"
              className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto "
            />
          </Link>

          <form
            className="flex flex-col justify-center items-center w-1/2 "
            onSubmit={adminLoginFunction}
          >
            <img src="/assets/avatar.svg" className="w-32"></img>
            <h3 className="my-8 font-semibold text-3xl text-gray-700 text-center">
              dashboard login
            </h3>
            {errors.length > 0 &&
              errors.map((error, key) => (
                <div key={key}>
                  <p>{error.msg}</p>
                </div>
              ))}
            <div className="relative">
              <i class="bi bi-person-circle absolute text-2xl text-gold py-2 "></i>
              <input
                className="pl-8 py-2 border-b-2 font-semibold  text-lg focus:outline-none focus:border-gold transition-all duration-500 rounded-md"
                type="email"
                name="email"
                onChange={handleInputs}
                value={state.email}
                placeholder="Enter email"
              />
            </div>
            <div className="relative mt-8">
              <i class="bi bi-key absolute text-xl text-gold py-2"></i>
              <input
                className="pl-8 border-b-2 py-2 font-semibold  text-lg focus:outline-none focus:border-gold transition-all duration-500 rounded-md "
                type="password"
                name="password"
                onChange={handleInputs}
                value={state.password}
              />
            </div>
            <div>
              <input
                className="py-3 px-20 bg-gold rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500 cursor-pointer"
                type="submit"
                value={response.isLoading ? 'Loading ...' : 'Sign in'}
              />
            </div>
          </form>
        </div>
      </div></>
      
    
  );
};

export default AdminLogin;
