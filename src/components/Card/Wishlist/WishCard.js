import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ShareIcon from '@mui/icons-material/Share';
import { IconButton } from '@mui/material';
import './WishCard.css'
import { Button } from '@mui/material';
import { WishItemsContext } from '../../../Context/WishItemsContext';

const WishCard = (props) => {

    const wishItems = useContext(WishItemsContext)
    const [shareSuccess, setShareSuccess] = useState(false)

    const handelRemoveItem = () => {
        wishItems.removeItem(props.item)
    }

    const handelAddToCart = () => {
        wishItems.addToCart(props.item)
    };

    const handleShare = async () => {
        const shareData = {
            title: props.item.name,
            text: `Check out this amazing product: ${props.item.name} - $${props.item.price}`,
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
        <div className="wishcard">
             <div className="wish__remove__item__icon">
                <IconButton>
                    <HighlightOffIcon onClick={handelRemoveItem}/>
                </IconButton>
            </div>
            <Link to={`/item/${props.item.category}/${props.item._id}`} className="wish__item__image__link">
                <div className="wish__item__image">
                    <img src={`https://shema-ecommerce.herokuapp.com/${props.item.category}/${props.item.image[0].filename}`} alt="item" className="wish__image"/>
                </div>
            </Link>
            <div className="wish__item__name">{props.item.name}</div>
            <div className="wish__item__price">${props.item.price}</div>
            <div className="wish__actions">
                <Button variant='outlined' onClick={handelAddToCart} sx={[{'&:hover': { backgroundColor: '#FFE26E', borderColor: '#FFE26E', color: 'black'}, borderColor: 'black', backgroundColor: "black" , color: "#FFE26E"}]}>Add to cart</Button>
                <IconButton 
                    onClick={handleShare} 
                    title="Share this item"
                    sx={[{'&:hover': { color: '#FFE26E'}, color: 'black'}]}
                    className={shareSuccess ? 'share-success' : ''}
                >
                    <ShareIcon />
                </IconButton>
                {shareSuccess && <span className="share__feedback">Copied!</span>}
            </div>
        </div>
     );
}
 
export default WishCard;