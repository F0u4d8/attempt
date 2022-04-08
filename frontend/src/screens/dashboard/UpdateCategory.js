import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ScreenHeader from '../../components/ScreenHeader';
import Wrapper from './Wrapper';
import { useState, useEffect } from 'react';
import { useFetchCategoryQuery ,useUpdateCategoryMutation} from '../../store/services/categoryService';
import { useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner'
import {setSuccess} from "../../store/reducers/globalReducer"

const UpdateCategories = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {id} = useParams()
  const {data , isFetching} = useFetchCategoryQuery(id)

  const [state, setState] = useState('');

  useEffect(()=>{

data?.category && setState(data?.category?.name)


  },[data?.category])

  const [saveCategory , response] = useUpdateCategoryMutation()
  const errors = response?.error?.data?.errors ? response?.error?.data?.errors : [];

  const updateSubmit = (e) => {
    e.preventDefault();
    saveCategory({ name: state , id });
  };

  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.message))
navigate('/dashboard/categories')

    }
  }, [response?.isSuccess]);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/categories" className="btn-blue">
          <i className="bi bi-arrow-left-short"></i> Categories list
        </Link>
      </ScreenHeader>

    {!isFetching ?   <form className="w-full md:w-8/12 " onSubmit={updateSubmit} >
        <h3 className="text-lg capitalize">update category </h3>
        {errors.length > 0 &&
          errors.map((error, key) => (
            <div key={key}>
              <p className="alert-danger">{error.msg}</p>
            </div>
          ))}

        <div className="mb-3">
          <input
            type="text"
            name=""
            id=""
            className="form-control"
            placeholder="Category name"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="btn btn-indigo"
            type="submit"
            value='Update'
          />
        </div>
      </form> : <Spinner/>}
    </Wrapper>
  );
};

export default UpdateCategories;
