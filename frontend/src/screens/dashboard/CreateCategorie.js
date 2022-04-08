import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ScreenHeader from '../../components/ScreenHeader';
import Wrapper from './Wrapper';
import { useState, useEffect } from 'react';
import { useCreateMutation } from '../../store/services/categoryService';
import {setSuccess} from "../../store/reducers/globalReducer"
import { useDispatch } from 'react-redux';

const CreateCategories = () => {

const [images , setImage] = useState([]);






  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [saveCategory, data] = useCreateMutation();
  const [state, setState] = useState('');
  const errors = data?.error?.data?.errors ? data?.error?.data?.errors : [];

  const submitCategory = (e) => {
    e.preventDefault();
    saveCategory({ name: state });
  };

  useEffect(() => {
    if (data?.isSuccess) {
      dispatch(setSuccess(data?.data?.message))
navigate('/dashboard/categories')

    }
  }, [data?.isSuccess]);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/categories" className="btn-blue">
          <i className="bi bi-arrow-left-short"></i> Categories list
        </Link>
      </ScreenHeader>

      <form className="w-full md:w-8/12 " onSubmit={submitCategory}>
        <h3 className="text-lg capitalize">Create Categorie</h3>
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
            className="btn-indigo"
            type="submit"
            value={data.isLoading ? 'loading ..' : 'create category'}
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateCategories;
