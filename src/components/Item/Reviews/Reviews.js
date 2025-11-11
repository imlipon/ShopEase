import { useState, useEffect } from 'react';
import { Rating, TextField, Button, Card, CardContent, Avatar, Box, Divider, Tab, Tabs } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import './Reviews.css';

const Reviews = (props) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        name: '',
        email: '',
        rating: 5,
        title: '',
        comment: ''
    });
    const [tabValue, setTabValue] = useState(0);
    const [helpful, setHelpful] = useState({});
    const [showForm, setShowForm] = useState(false);

    // Initialize reviews from localStorage
    useEffect(() => {
        const storedReviews = localStorage.getItem(`reviews_${props.productId}`);
        if (storedReviews) {
            setReviews(JSON.parse(storedReviews));
        }
    }, [props.productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRatingChange = (e, value) => {
        setNewReview(prev => ({
            ...prev,
            rating: value
        }));
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();

        if (!newReview.name || !newReview.email || !newReview.comment) {
            alert('Please fill in all fields');
            return;
        }

        const review = {
            id: Date.now(),
            ...newReview,
            date: new Date().toLocaleDateString(),
            helpful: 0
        };

        const updatedReviews = [review, ...reviews];
        setReviews(updatedReviews);
        localStorage.setItem(`reviews_${props.productId}`, JSON.stringify(updatedReviews));

        setNewReview({
            name: '',
            email: '',
            rating: 5,
            title: '',
            comment: ''
        });
        setShowForm(false);
    };

    const handleHelpful = (reviewId, type) => {
        setHelpful(prev => ({
            ...prev,
            [reviewId]: type
        }));
    };

    const getAverageRating = () => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    };

    const getRatingDistribution = () => {
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach(review => {
            distribution[review.rating]++;
        });
        return distribution;
    };

    const filteredReviews = tabValue === 0 ? 
        reviews : 
        reviews.filter(review => review.rating === (6 - tabValue));

    const ratingDistribution = getRatingDistribution();

    return (
        <div className="reviews__container">
            <div className="reviews__header">
                <h2>Customer Reviews</h2>
            </div>

            <div className="reviews__summary">
                <div className="rating__summary">
                    <div className="average__rating">
                        <div className="large__rating">{getAverageRating()}</div>
                        <div className="star__display">
                            <Rating value={Math.round(getAverageRating())} readOnly size="large" />
                        </div>
                        <div className="review__count">Based on {reviews.length} reviews</div>
                    </div>

                    <div className="rating__distribution">
                        {[5, 4, 3, 2, 1].map(stars => (
                            <div key={stars} className="rating__bar">
                                <span className="stars__label">{stars} ★</span>
                                <div className="progress__bar">
                                    <div 
                                        className="progress__fill"
                                        style={{ width: `${reviews.length > 0 ? (ratingDistribution[stars] / reviews.length) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <span className="count">{ratingDistribution[stars]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="write__review__btn">
                    <Button 
                        variant="contained" 
                        size="large"
                        onClick={() => setShowForm(!showForm)}
                        sx={{
                            backgroundColor: '#FFE26E',
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            padding: '10px 30px',
                            '&:hover': {
                                backgroundColor: '#ffdb3d'
                            }
                        }}
                    >
                        {showForm ? 'Cancel' : 'Write a Review'}
                    </Button>
                </div>
            </div>

            {showForm && (
                <div className="review__form__container">
                    <Card className="review__form__card">
                        <CardContent>
                            <h3>Share Your Experience</h3>
                            <form onSubmit={handleSubmitReview} className="review__form">
                                <div className="form__row">
                                    <TextField
                                        fullWidth
                                        label="Your Name"
                                        name="name"
                                        value={newReview.name}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        size="small"
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={newReview.email}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        size="small"
                                        required
                                    />
                                </div>

                                <div className="rating__input">
                                    <label>Rating:</label>
                                    <Rating
                                        value={newReview.rating}
                                        onChange={handleRatingChange}
                                        size="large"
                                        icon={<StarIcon sx={{ color: '#FFE26E' }} />}
                                        emptyIcon={<StarIcon sx={{ color: '#ddd' }} />}
                                    />
                                </div>

                                <TextField
                                    fullWidth
                                    label="Review Title"
                                    name="title"
                                    value={newReview.title}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    size="small"
                                    required
                                    placeholder="Summarize your experience"
                                />

                                <TextField
                                    fullWidth
                                    label="Your Review"
                                    name="comment"
                                    value={newReview.comment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    multiline
                                    rows={5}
                                    required
                                    placeholder="Share your experience with this product..."
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        backgroundColor: '#000',
                                        color: '#FFE26E',
                                        fontWeight: 'bold',
                                        padding: '10px',
                                        marginTop: '15px',
                                        '&:hover': {
                                            backgroundColor: '#333'
                                        }
                                    }}
                                >
                                    Submit Review
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}

            <Divider sx={{ margin: '30px 0' }} />

            <div className="reviews__tabs">
                <Tabs value={tabValue} onChange={(e, value) => setTabValue(value)}>
                    <Tab label={`All Reviews (${reviews.length})`} />
                    <Tab label={`5 Stars (${ratingDistribution[5]})`} />
                    <Tab label={`4 Stars (${ratingDistribution[4]})`} />
                    <Tab label={`3 Stars (${ratingDistribution[3]})`} />
                    <Tab label={`2 Stars (${ratingDistribution[2]})`} />
                    <Tab label={`1 Star (${ratingDistribution[1]})`} />
                </Tabs>
            </div>

            <div className="reviews__list">
                {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => (
                        <Card key={review.id} className="review__card">
                            <CardContent>
                                <div className="review__header__item">
                                    <div className="reviewer__info">
                                        <Avatar className="reviewer__avatar">
                                            <PersonIcon />
                                        </Avatar>
                                        <div className="reviewer__details">
                                            <h4>{review.name}</h4>
                                            <p className="review__date">{review.date}</p>
                                        </div>
                                    </div>
                                    <div className="review__rating">
                                        <Rating value={review.rating} readOnly size="small" />
                                        <span className="rating__value">{review.rating}.0</span>
                                    </div>
                                </div>

                                <div className="review__content">
                                    <h5 className="review__title">{review.title}</h5>
                                    <p className="review__text">{review.comment}</p>
                                </div>

                                <div className="review__actions">
                                    <div className="helpful__section">
                                        <span>Was this helpful?</span>
                                        <button 
                                            className={`helpful__btn ${helpful[review.id] === 'yes' ? 'active' : ''}`}
                                            onClick={() => handleHelpful(review.id, 'yes')}
                                        >
                                            <ThumbUpIcon fontSize="small" />
                                            Yes
                                        </button>
                                        <button 
                                            className={`helpful__btn ${helpful[review.id] === 'no' ? 'active' : ''}`}
                                            onClick={() => handleHelpful(review.id, 'no')}
                                        >
                                            <ThumbDownIcon fontSize="small" />
                                            No
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Box sx={{ textAlign: 'center', padding: '40px 20px' }}>
                        <p className="no__reviews">No reviews yet. Be the first to review this product!</p>
                    </Box>
                )}
            </div>
        </div>
    );
};

export default Reviews;
