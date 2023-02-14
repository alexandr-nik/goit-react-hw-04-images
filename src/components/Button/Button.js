import PropTypes from 'prop-types';
import './Button.css'

export const Button = ({ loadMore }) => {
   return (
     <li className="ButtonLoadMore">
       <button className="Button" type="button" onClick={loadMore}>
         Load More
       </button>
     </li>
   );
};
Button.propTypes ={
  loadMore:PropTypes.func.isRequired,
}