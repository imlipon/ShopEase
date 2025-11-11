import './Control.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import Cart from '../../Card/Cart/Cart';
import { useContext, useState } from 'react';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Control = () => {
    const wishItems = useContext(WishItemsContext)
    const [menuOpen, setMenuOpen] = useState(false)

    return ( 
        <div className="control__bar__container">
            <div className="controls__container">
                <Link to="/account/login" className="control control--account">
                    <div className="control__content">
                        <span className="control__label">Hello, Sign in</span>
                        <span className="control__value">Account</span>
                    </div>
                    <PersonOutlineIcon sx={{ fontSize: '24px', marginLeft: '8px' }}/>
                </Link>

                <Link to="/wishlist" className="control control--wishlist">
                    <div className="control__content">
                        <span className="control__label">Your</span>
                        <span className="control__value">Wishlist</span>
                    </div>
                    <Badge badgeContent={wishItems.items.length} color="error">
                        <FavoriteBorderIcon sx={{ fontSize: '24px', marginLeft: '8px' }}/>
                    </Badge>
                </Link>

                <div className="control control--cart">
                    <Cart />
                </div>

                <div className="control control--menu" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
                    <button className="menu__toggle" onClick={() => setMenuOpen(!menuOpen)}>
                        <MoreVertIcon sx={{ fontSize: '24px' }}/>
                    </button>
                    
                    {menuOpen && (
                        <div className="amazon__menu">
                            <Link to="/" className="menu__item">Home</Link>
                            <Link to="/shop" className="menu__item">Shop</Link>
                            <hr className="menu__divider" />
                            <a href="#settings" className="menu__item">Settings</a>
                            <a href="#help" className="menu__item">Help</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default Control;