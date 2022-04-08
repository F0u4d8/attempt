import { Link } from 'react-router-dom';

const Pagination = ({ page, perPage, count, path }) => {
  const totalLinks = Math.ceil(count / perPage);
  let startLoop = page;
  let diff = totalLinks - page;

  if (diff <= 3) {
    startLoop = totalLinks - 3;
  }

  let endLoop = startLoop + 3;
  if (endLoop <= 0) {
    startLoop = 1;
  }

  const links = () => {
    const allLinks = [];

    for (let i = startLoop; i <= endLoop; i++) {
      allLinks.push(
        <li key={i}>
          <Link className={`pagination-link ${page === i && 'bg-blue-500 text-white'}`} to={`/${path}/${i}`}>{i}</Link>
        </li>
      );
    }
    return allLinks;
  };
  const next = () => {
    if (page < totalLinks) {
      return (
        <li>
          <Link  className='pagination-link' to={`/${path}/${page + 1}`}><i className="bi bi-chevron-double-right"></i></Link>
        </li>
      );
    }
  };

  const previous = () => {
    if (page > 1) {
      return (
        <li>
          <Link  className='pagination-link' to={`/${path}/${page - 1}`}><i className="bi bi-chevron-double-left"></i></Link>
        </li>
      );
    }
  };

  return count > 3 && (<ul className='flex mt-2'>{previous()}
  {links()}
  {next()}</ul>);
};

export default Pagination;
