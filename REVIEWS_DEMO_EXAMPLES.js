// Example: How the Reviews System Works
// This file demonstrates the structure and functionality

// ============================================
// EXAMPLE PRODUCT REVIEW DATA
// ============================================

const exampleReviews = [
    {
        id: 1699728945123,
        name: "Sarah Anderson",
        email: "sarah@example.com",
        rating: 5,
        title: "Absolutely Love This Product!",
        comment: "This is exactly what I was looking for. The quality is outstanding and the fit is perfect. Shipping was fast and the packaging was excellent. Highly recommend to anyone considering this product!",
        date: "11/11/2025",
        helpful: 0
    },
    {
        id: 1699728945124,
        name: "Michael Chen",
        email: "michael@example.com",
        rating: 4,
        title: "Great Quality, Minor Issue",
        comment: "The product arrived quickly and the quality is impressive. The only minor issue is that the color is slightly different from the pictures online, but it's actually better in person. Would definitely purchase again!",
        date: "11/10/2025",
        helpful: 0
    },
    {
        id: 1699728945125,
        name: "Emily Johnson",
        email: "emily@example.com",
        rating: 5,
        title: "Perfect Purchase!",
        comment: "Exceeded my expectations! The craftsmanship is incredible and it arrived in perfect condition. Customer service was also very helpful when I had questions. This is my second purchase and I'll definitely be ordering more!",
        date: "11/9/2025",
        helpful: 0
    },
    {
        id: 1699728945126,
        name: "David Martinez",
        email: "david@example.com",
        rating: 3,
        title: "Good, But Could Be Better",
        comment: "The product is decent and works as described. The price is reasonable but there are better alternatives. Shipping took longer than expected. Still satisfied with my purchase overall.",
        date: "11/8/2025",
        helpful: 0
    },
    {
        id: 1699728945127,
        name: "Jessica Lee",
        email: "jessica@example.com",
        rating: 5,
        title: "Best Purchase Ever!",
        comment: "I've tried similar products before and this one is definitely the best. The attention to detail is amazing. Worth every penny. Thank you ShopEase team!",
        date: "11/7/2025",
        helpful: 0
    }
];

// ============================================
// FEATURE DEMONSTRATIONS
// ============================================

// 1. RATING SUMMARY CALCULATION
// ====================================
function getAverageRating(reviews) {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
}

console.log("Average Rating:", getAverageRating(exampleReviews)); // Output: 4.4


// 2. RATING DISTRIBUTION
// ====================================
function getRatingDistribution(reviews) {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
        distribution[review.rating]++;
    });
    return distribution;
}

const distribution = getRatingDistribution(exampleReviews);
console.log("Rating Distribution:", distribution);
// Output: { 5: 3, 4: 1, 3: 1, 2: 0, 1: 0 }


// 3. FILTER BY RATING
// ====================================
function filterByRating(reviews, rating) {
    return reviews.filter(review => review.rating === rating);
}

console.log("5-Star Reviews:", filterByRating(exampleReviews, 5).length); // Output: 3


// 4. HELPFUL TRACKING
// ====================================
const helpful = {};

function markHelpful(reviewId, type) {
    helpful[reviewId] = type; // 'yes' or 'no'
    console.log(`Review ${reviewId} marked as ${type}`);
}

markHelpful(1699728945123, 'yes');


// 5. ADDING NEW REVIEW
// ====================================
function addReview(name, email, rating, title, comment, reviews) {
    const newReview = {
        id: Date.now(),
        name,
        email,
        rating,
        title,
        comment,
        date: new Date().toLocaleDateString(),
        helpful: 0
    };
    
    const updatedReviews = [newReview, ...reviews];
    
    // Save to localStorage (in actual app)
    localStorage.setItem('reviews_productId', JSON.stringify(updatedReviews));
    
    return updatedReviews;
}

// Usage example:
/*
const updatedReviews = addReview(
    "John Smith",
    "john@example.com",
    5,
    "Amazing Quality!",
    "This product exceeded all my expectations...",
    exampleReviews
);
*/


// ============================================
// LOCALSTORAGE IMPLEMENTATION
// ============================================

// Saving reviews (Automatically done in component)
function saveReviews(productId, reviews) {
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(reviews));
}

// Loading reviews (Automatically done in component)
function loadReviews(productId) {
    const storedReviews = localStorage.getItem(`reviews_${productId}`);
    return storedReviews ? JSON.parse(storedReviews) : [];
}

// Example usage:
/*
const productId = "507f1f77bcf86cd799439011"; // Product ID
saveReviews(productId, exampleReviews);
const loadedReviews = loadReviews(productId);
*/


// ============================================
// UI STATE MANAGEMENT EXAMPLE
// ============================================

const reviewsComponentState = {
    reviews: exampleReviews,
    newReview: {
        name: '',
        email: '',
        rating: 5,
        title: '',
        comment: ''
    },
    tabValue: 0, // 0 = All, 1 = 5 stars, 2 = 4 stars, etc.
    helpful: {}, // { reviewId: 'yes'/'no' }
    showForm: false // Toggle form visibility
};


// ============================================
// FORM VALIDATION
// ============================================

function validateReview(review) {
    const errors = [];
    
    if (!review.name.trim()) {
        errors.push('Name is required');
    }
    
    if (!review.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push('Valid email is required');
    }
    
    if (!review.rating || review.rating < 1 || review.rating > 5) {
        errors.push('Rating must be between 1 and 5');
    }
    
    if (!review.title.trim()) {
        errors.push('Review title is required');
    }
    
    if (!review.comment.trim()) {
        errors.push('Review comment is required');
    }
    
    return errors;
}

// Example:
const errors = validateReview({
    name: '',
    email: 'invalid-email',
    rating: 6,
    title: '',
    comment: 'Good product'
});
console.log("Validation Errors:", errors);


// ============================================
// RESPONSIVE BREAKPOINTS
// ============================================

const responsiveBreakpoints = {
    desktop: '1024px', // Full grid layout
    tablet: '768px',   // Adjusted grid
    mobile: '480px',   // Single column
    small: '320px'     // Optimized spacing
};


// ============================================
// ANIMATION KEYFRAMES
// ============================================

const animations = {
    slideInDown: `
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `,
    hover: `
        transition: all 0.3s ease;
        &:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
    `
};


// ============================================
// COLOR PALETTE
// ============================================

const colorPalette = {
    primary: '#FFE26E',      // Gold
    secondary: '#000',       // Black
    lightBg: '#f9f9f9',      // Light background
    white: '#ffffff',        // White
    darkText: '#333',        // Dark text
    mediumText: '#666',      // Medium text
    lightText: '#999',       // Light text
    border: '#e0e0e0',       // Border color
    success: '#4caf50',      // Success (if needed)
    error: '#f44336'         // Error (if needed)
};


// ============================================
// STATS CALCULATED FROM EXAMPLE DATA
// ============================================

console.log("=== REVIEW STATISTICS ===");
console.log("Total Reviews:", exampleReviews.length);          // 5
console.log("Average Rating:", getAverageRating(exampleReviews)); // 4.4
console.log("Distribution:", getRatingDistribution(exampleReviews));
console.log("5-Star %:", (3/5)*100 + "%");                     // 60%
console.log("4-Star %:", (1/5)*100 + "%");                     // 20%
console.log("3-Star %:", (1/5)*100 + "%");                     // 20%


// ============================================
// EXPORT FOR USE IN COMPONENTS
// ============================================

export {
    exampleReviews,
    getAverageRating,
    getRatingDistribution,
    filterByRating,
    markHelpful,
    addReview,
    saveReviews,
    loadReviews,
    validateReview,
    colorPalette,
    responsiveBreakpoints
};
