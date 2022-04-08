import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { setAdminToken } from "../../store/reducers/authReducer";
import { useRegisterMutation } from "../../store/services/authService";

const Register = ()=>{

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({name:'', email: '', password: '' });

  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };



  const [register, response] = useRegisterMutation();

  console.log('my response', response);

  const errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];

  const registerFunction = (e) => {
    e.preventDefault();
    register(state);
  };

  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem('admin-token', response?.data?.token);
      dispatch(setAdminToken(response?.data?.token));
      navigate('/dashboard/products');
    }
  }, [response.isSuccess]);


return (

<>
<img  src="/assets/wave.png" className="fixed hidden lg:block inset-0 h-full " style={{zIndex:-1}}></img>


  
<div>
  

  <div className="h-screen w-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
    <Link to='/auth/admin-login'><img src="/assets/login.svg" className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto "/>
    </Link>
    

<form
    className="flex flex-col justify-center items-center w-1/2 "
    onSubmit={registerFunction}
  >
    <img src="/assets/avatar.svg" className="w-32"></img>
    <h3 className='my-8 font-semibold text-3xl text-gray-700 text-center'>Register</h3>

    {errors.length > 0 &&
          errors.map((error, key) => (
            <div key={key}>
              <p>{error.msg}</p>
            </div>
          ))}

    <div className='relative'>
      
      <input
      className='pl-8 py-2 border-b-2 font-semibold  text-lg focus:outline-none focus:border-gold transition-all duration-500 rounded-md'
        type="text"
        name="name"
        onChange={handleInputs}
        value={state.name}
        
        placeholder="Enter your name"
      />
    </div>
  
    <div className='relative mt-8'>
     
      <input
      className='pl-8 py-2  border-b-2 font-semibold  text-lg focus:outline-none focus:border-gold transition-all duration-500 rounded-md'
        type="email"
        name="email"
        onChange={handleInputs}
        value={state.email}
        
        placeholder="Enter email"
      />
    </div>
    <div className='relative mt-8'>
      
      <input
      className='pl-8 border-b-2 py-2 font-semibold  text-lg focus:outline-none focus:border-gold transition-all duration-500 rounded-md '
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleInputs}
            value={state.password}
       
      />
    </div>
    <div>
      <input
      className='py-3 px-20 bg-gold rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500 cursor-pointer'
        type="submit"
        value="Register"
       
      />
    </div>
  </form>

  </div>

  
</div></>
)


}

export default Register