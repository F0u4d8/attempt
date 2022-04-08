
import { Link } from 'react-router-dom';
import Wrapper from './Wrapper';

const Products = () => {
  return (
    
     <Wrapper><Link to="/dashboard/create-product" className="btn-blue">
    <i className="bi bi-arrow-left-short"></i> create product
  </Link></Wrapper>
    
  );
};

export default Products;
