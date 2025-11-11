import './Landing.css'
import land from '../../asset/brand/men2.png'
import { Link } from "react-router-dom"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const Landing = () => {
    return ( 
        <>
            {/* Amazon-style Hero Section */}
            <div className="landing__hero">
                <div className="landing__hero__content">
                    <h1 className="landing__hero__title">
                        Welcome to ShopEase
                    </h1>
                    <p className="landing__hero__subtitle">
                        Discover millions of products at great prices
                    </p>
                    <Link to="/shop" className="landing__hero__cta">
                        Shop Now
                    </Link>
                </div>
                <img src={land} alt="Hero Banner" className="landing__hero__image" />
            </div>

            {/* Trust Badges Section */}
            <div className="landing__trust">
                <div className="trust__item">
                    <LocalShippingIcon />
                    <h3>Fast Delivery</h3>
                    <p>Free shipping on orders over $50</p>
                </div>
                <div className="trust__item">
                    <CheckCircleIcon />
                    <h3>Easy Returns</h3>
                    <p>30-day money-back guarantee</p>
                </div>
                <div className="trust__item">
                    <VerifiedUserIcon />
                    <h3>Secure Shopping</h3>
                    <p>100% secure checkout</p>
                </div>
            </div>
        </>
     );
}
 
export default Landing;