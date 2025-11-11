import { useContext, useState } from 'react';
import './Detail.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Chip, Rating } from '@mui/material';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ShareIcon from '@mui/icons-material/Share';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import VerifiedIcon from '@mui/icons-material/Verified';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoritedIcon from '@mui/icons-material/Favorite';
import { CartItemsContext } from '../../../Context/CartItemsContext';
import { WishItemsContext } from '../../../Context/WishItemsContext';

const Detail = (props) => {
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(props.item.size[0]);
    const [shareSuccess, setShareSuccess] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const cartItems = useContext(CartItemsContext)
    const wishItems = useContext(WishItemsContext)

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    
    const handelQuantityIncrement = (event) => {
        setQuantity((prev) => prev+=1);
    };

    const handelQuantityDecrement = (event) => {
        if(quantity >1){
            setQuantity((prev) => prev-=1);
        }
    };

    const handelAddToCart = () => {
        cartItems.addItem(props.item, quantity, size)
    }

    const handelAddToWish = () => {
        wishItems.addItem(props.item)
        setIsWishlisted(!isWishlisted)
    }

    const handleShare = async () => {
        const shareData = {
            title: props.item.name,
            text: `Check out this amazing product: ${props.item.name} - $${props.item.price}. ${props.item.description}`,
            url: `${window.location.origin}/item/${props.item._id}`
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Error sharing:', err);
                }
            }
        } else {
            // Fallback: Copy to clipboard
            const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
            navigator.clipboard.writeText(shareText).then(() => {
                setShareSuccess(true);
                setTimeout(() => setShareSuccess(false), 2000);
            }).catch(err => {
                console.error('Failed to copy to clipboard:', err);
            });
        }
    };
    
    return ( 
        <div className="product__detail__container">
            <div className="product__detail">
                <div className="product__badge__container">
                    {/* Trending Badge */}
                    <div className="product__trending__badge">
                        <LocalFireDepartmentIcon sx={{fontSize: '18px', marginRight: '4px'}} />
                        TRENDING NOW
                    </div>
                    {/* Verified Badge */}
                    <div className="product__verified__badge">
                        <VerifiedIcon sx={{fontSize: '16px', marginRight: '4px'}} />
                        Verified
                    </div>
                </div>

                <div className="product__main__detail">
                    <div className="product__name__main">{props.item.name}</div>
                    
                    <div className="product__rating__container">
                        <Rating value={4} readOnly size="small" />
                        <span className="product__rating__count">(128 reviews)</span>
                    </div>

                    <div className="product__detail__description">{props.item.description}</div>
                    
                    <div className="product__color">
                        <div className="product-color-label">COLOR:</div>
                        <div className="product-color" style={{backgroundColor: `${props.item.color}`}}></div>
                    </div>

                    <div className="product__price__detail__container">
                        <div className="product__price__detail">${props.item.price}</div>
                        <div className="product__price__original">$89.99</div>
                        <div className="product__discount__badge">-25%</div>
                    </div>

                    <div className="product__stock__info">
                        <TrendingUpIcon sx={{fontSize: '16px', marginRight: '8px', color: '#FFE26E'}} />
                        <span>Only 3 left in stock - Order soon!</span>
                    </div>
                </div>

                <form onSubmit={handelAddToCart} className="product__form">
                    <div className="product__quantity__and__size">
                        <div className="product__quantity">
                            <div className="quantity__label">Quantity:</div>
                            <IconButton onClick={handelQuantityIncrement} size="small">
                                <AddCircleIcon />
                            </IconButton>
                            <div className="quantity__input">{quantity}</div>
                            <IconButton onClick={handelQuantityDecrement} size="small">
                                <RemoveCircleIcon fontSize='medium'/>
                            </IconButton>
                        </div>
                            
                        <div className="product size">
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Size</InputLabel>
                                    <Select
                                    value={size}
                                    label="size"
                                    onChange={handleSizeChange}
                                    >
                                    {props.item.size.map((size) => <MenuItem value={size}>{size}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>  

                    <div className="collect__item__actions">
                        <div className="add__cart__add__wish">
                            <div className="add__cart">
                                <Button 
                                    variant="contained" 
                                    size="large" 
                                    onClick={handelAddToCart}
                                    className="btn-add-to-bag"
                                >
                                    🛍️ ADD TO BAG
                                </Button>
                            </div>
                            
                            <div className="action__buttons">
                                <IconButton 
                                    className="wish-btn"
                                    onClick={handelAddToWish}
                                    title="Add to Wishlist"
                                >
                                    {isWishlisted ? 
                                        <FavoritedIcon sx={{color: '#FFE26E'}} /> : 
                                        <FavoriteBorderIcon />
                                    }
                                </IconButton>

                                <IconButton 
                                    className="share-btn"
                                    onClick={handleShare}
                                    title="Share this product"
                                >
                                    <ShareIcon />
                                </IconButton>
                            </div>

                            {shareSuccess && <span className="share__feedback__detail">✓ Copied!</span>}
                        </div>
                    </div>  
                </form>

                <div className="product__features__container">
                    <div className="feature__item">
                        <span className="feature__icon">🚚</span>
                        <span className="feature__text">Free Shipping</span>
                    </div>
                    <div className="feature__item">
                        <span className="feature__icon">↩️</span>
                        <span className="feature__text">Easy Returns</span>
                    </div>
                    <div className="feature__item">
                        <span className="feature__icon">🔒</span>
                        <span className="feature__text">Secure Payment</span>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Detail;