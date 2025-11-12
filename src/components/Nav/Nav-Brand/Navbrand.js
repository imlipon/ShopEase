import './NavBrand.css'
import { Link } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const NavBrand = () => {
    return ( 
        <div className='navbrand__container'>
           <Link to="/" className='navbrand__link'>
               <div className="navbrand__icon__wrapper">
                   <ShoppingBagIcon className='navbrand__icon' />
               </div>
               <h1 className='navbrand'>ShopEase</h1>
           </Link>
        </div>
     );
}
 
export default NavBrand;