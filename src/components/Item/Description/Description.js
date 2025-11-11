import './Description.css';
import { Card, CardContent, Grid, Chip, Box } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const Description = (props) => {
    return ( 
        <div className="product__description__product">
            <div className="product__info__section">
                <div className="section__header">
                    <h3>Product Information</h3>
                </div>
                <Grid container spacing={2} className="product__info__grid">
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="info__card">
                            <CardContent className="info__card__content">
                                <LocalShippingIcon className="info__icon" />
                                <h4>Free Shipping</h4>
                                <p>On orders over $50</p>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="info__card">
                            <CardContent className="info__card__content">
                                <AssignmentReturnIcon className="info__icon" />
                                <h4>Easy Returns</h4>
                                <p>30-day return policy</p>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="info__card">
                            <CardContent className="info__card__content">
                                <VerifiedUserIcon className="info__icon" />
                                <h4>Secure Payment</h4>
                                <p>100% secure checkout</p>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="info__card">
                            <CardContent className="info__card__content">
                                <SupportAgentIcon className="info__icon" />
                                <h4>24/7 Support</h4>
                                <p>Dedicated support team</p>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>

            <div className="product__specs__section">
                <div className="section__header">
                    <h3>Specifications</h3>
                </div>
                <div className="specs__grid">
                    <div className="spec__item">
                        <span className="spec__label">Category:</span>
                        <span className="spec__value">{props.item.category}</span>
                    </div>
                    <div className="spec__item">
                        <span className="spec__label">Color:</span>
                        <div className="color__display">
                            <div 
                                className="color__box" 
                                style={{backgroundColor: `${props.item.color}`}}
                            ></div>
                            <span className="spec__value">{props.item.color}</span>
                        </div>
                    </div>
                    {props.item.size && (
                        <div className="spec__item">
                            <span className="spec__label">Available Sizes:</span>
                            <Box className="sizes__chips">
                                {props.item.size.map((size, index) => (
                                    <Chip key={index} label={size} variant="outlined" />
                                ))}
                            </Box>
                        </div>
                    )}
                    <div className="spec__item">
                        <span className="spec__label">Price:</span>
                        <span className="spec__value price">${props.item.price}</span>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Description;