import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ScreenHeader from '../../components/ScreenHeader';
import Wrapper from './Wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, setSuccess } from '../../store/reducers/globalReducer';
import { useEffect } from 'react';
import { useGetQuery , useDeleteCategoryMutation} from '../../store/services/categoryService';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';

const Categories = () => {
  let { page } = useParams();

  if(!page){

page= 1

  }
  

  const { success } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const { data = [], isFetching } = useGetQuery(page);
  const [removeCategory , response] = useDeleteCategoryMutation()

  console.log(response)

  const deleteCat = id =>{

if(window.confirm('do you really want to delete')){
removeCategory(id)


}


  }
 
useEffect(()=>{

if(response.isSuccess){


dispatch(setSuccess(response?.data?.message))


}


},[response?.data?.message])


  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, []);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/create-category" className="btn-blue">
          Add categorie <i className="bi bi-file-plus"></i>
        </Link>
      </ScreenHeader>

      {success && <div className="alert-success">{success}</div>}

      {!isFetching ? (
        data?.categories?.length > 0 && (
          <>  <div>
            <table className="w-full bg-blue-900 rounded-md">
              <thead>
                <tr className="border-b border-blue-800 text-left">
                  <th className='p-3 uppercase text-sm font-medium text-blue-400'>name</th>
                  <th className='p-3 uppercase text-sm font-medium text-blue-400'>edit</th> 
                  <th className='p-3 uppercase text-sm font-medium text-blue-400'>delete</th>
                </tr>
              </thead>
              <tbody>
                {data?.categories?.map((categorie) => (
                  <tr key={categorie._id}>
                    <td className='p-3 capitalize text-sm font-normal text-blue-400'>{categorie.name}</td>
                    <td><Link to={`/dashboard/update-category/${categorie._id}`} className="btn btn-warning">edit</Link></td>
                    <td><button className='btn btn-danger' onClick={()=> deleteCat(categorie._id)}>delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> <Pagination page ={ parseInt(page)} perPage={data.perPage} count={data.count} path='dashboard/categories'/></>
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Categories;
