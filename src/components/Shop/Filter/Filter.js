import React, { useState } from 'react';
import './Filter.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';

const Filter = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        category: [],
        priceRange: { min: 0, max: 1000 },
        color: [],
        size: [],
        rating: 0,
        availability: 'all'
    });

    const [expandedSections, setExpandedSections] = useState({
        category: true,
        price: true,
        color: true,
        size: true,
        rating: true,
        availability: true
    });

    // Toggle filter section expansion
    const toggleSection = (section) => {
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section]
        });
    };

    // Handle category filter
    const handleCategoryChange = (category) => {
        const updatedCategories = filters.category.includes(category)
            ? filters.category.filter(c => c !== category)
            : [...filters.category, category];

        const newFilters = { ...filters, category: updatedCategories };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    // Handle price range
    const handlePriceChange = (type, value) => {
        const newPrice = { ...filters.priceRange, [type]: parseFloat(value) };
        const newFilters = { ...filters, priceRange: newPrice };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    // Handle color filter
    const handleColorChange = (color) => {
        const updatedColors = filters.color.includes(color)
            ? filters.color.filter(c => c !== color)
            : [...filters.color, color];

        const newFilters = { ...filters, color: updatedColors };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    // Handle size filter
    const handleSizeChange = (size) => {
        const updatedSizes = filters.size.includes(size)
            ? filters.size.filter(s => s !== size)
            : [...filters.size, size];

        const newFilters = { ...filters, size: updatedSizes };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    // Handle rating filter
    const handleRatingChange = (rating) => {
        const newFilters = { ...filters, rating: rating };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    // Handle availability
    const handleAvailabilityChange = (availability) => {
        const newFilters = { ...filters, availability: availability };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    // Clear all filters
    const clearAllFilters = () => {
        const clearedFilters = {
            category: [],
            priceRange: { min: 0, max: 1000 },
            color: [],
            size: [],
            rating: 0,
            availability: 'all'
        };
        setFilters(clearedFilters);
        onFilterChange(clearedFilters);
    };

    const categories = ['Men', 'Women', 'Kids'];
    const colors = [
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Navy', hex: '#001F3F' },
        { name: 'Red', hex: '#FF4136' },
        { name: 'Blue', hex: '#0074D9' },
        { name: 'Green', hex: '#2ECC40' }
    ];
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    return (
        <div className="filter__container">
            <div className="filter__header">
                <div className="filter__title">
                    <FilterAltIcon sx={{ fontSize: '24px', marginRight: '8px' }} />
                    <h3>Filters</h3>
                </div>
                {(filters.category.length > 0 || filters.color.length > 0 || 
                  filters.size.length > 0 || filters.rating > 0 || 
                  filters.availability !== 'all' || 
                  filters.priceRange.min !== 0 || 
                  filters.priceRange.max !== 1000) && (
                    <button className="filter__clear__btn" onClick={clearAllFilters} title="Clear all filters">
                        <ClearIcon sx={{ fontSize: '20px' }} />
                    </button>
                )}
            </div>

            {/* Category Filter */}
            <div className="filter__section">
                <button 
                    className="filter__section__header"
                    onClick={() => toggleSection('category')}
                >
                    <span className="filter__section__title">Category</span>
                    {expandedSections.category ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </button>
                {expandedSections.category && (
                    <div className="filter__section__content">
                        {categories.map((category) => (
                            <label key={category} className="filter__checkbox">
                                <input
                                    type="checkbox"
                                    checked={filters.category.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                />
                                <span className="filter__checkbox__label">{category}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Filter */}
            <div className="filter__section">
                <button 
                    className="filter__section__header"
                    onClick={() => toggleSection('price')}
                >
                    <span className="filter__section__title">Price</span>
                    {expandedSections.price ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </button>
                {expandedSections.price && (
                    <div className="filter__section__content">
                        <div className="price__range__container">
                            <div className="price__input__group">
                                <label>Min</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="1000"
                                    value={filters.priceRange.min}
                                    onChange={(e) => handlePriceChange('min', e.target.value)}
                                    className="price__input"
                                />
                            </div>
                            <div className="price__separator">-</div>
                            <div className="price__input__group">
                                <label>Max</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="1000"
                                    value={filters.priceRange.max}
                                    onChange={(e) => handlePriceChange('max', e.target.value)}
                                    className="price__input"
                                />
                            </div>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={filters.priceRange.max}
                            onChange={(e) => handlePriceChange('max', e.target.value)}
                            className="price__slider"
                        />
                        <div className="price__display">
                            ${filters.priceRange.min} - ${filters.priceRange.max}
                        </div>
                    </div>
                )}
            </div>

            {/* Color Filter */}
            <div className="filter__section">
                <button 
                    className="filter__section__header"
                    onClick={() => toggleSection('color')}
                >
                    <span className="filter__section__title">Color</span>
                    {expandedSections.color ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </button>
                {expandedSections.color && (
                    <div className="filter__section__content">
                        <div className="color__grid">
                            {colors.map((color) => (
                                <button
                                    key={color.name}
                                    className={`color__option ${filters.color.includes(color.name) ? 'selected' : ''}`}
                                    style={{ backgroundColor: color.hex }}
                                    onClick={() => handleColorChange(color.name)}
                                    title={color.name}
                                >
                                    {filters.color.includes(color.name) && <span className="color__checkmark">✓</span>}
                                </button>
                            ))}
                        </div>
                        {filters.color.length > 0 && (
                            <div className="selected__colors">
                                {filters.color.map(color => (
                                    <span key={color} className="color__tag">{color}</span>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Size Filter */}
            <div className="filter__section">
                <button 
                    className="filter__section__header"
                    onClick={() => toggleSection('size')}
                >
                    <span className="filter__section__title">Size</span>
                    {expandedSections.size ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </button>
                {expandedSections.size && (
                    <div className="filter__section__content">
                        <div className="size__grid">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    className={`size__option ${filters.size.includes(size) ? 'selected' : ''}`}
                                    onClick={() => handleSizeChange(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Rating Filter */}
            <div className="filter__section">
                <button 
                    className="filter__section__header"
                    onClick={() => toggleSection('rating')}
                >
                    <span className="filter__section__title">Rating</span>
                    {expandedSections.rating ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </button>
                {expandedSections.rating && (
                    <div className="filter__section__content">
                        {[5, 4, 3, 2, 1].map((star) => (
                            <label key={star} className="filter__radio">
                                <input
                                    type="radio"
                                    name="rating"
                                    value={star}
                                    checked={filters.rating === star}
                                    onChange={() => handleRatingChange(star)}
                                />
                                <span className="filter__radio__label">
                                    {'⭐'.repeat(star)} {star}+ Stars
                                </span>
                            </label>
                        ))}
                        {filters.rating > 0 && (
                            <button 
                                className="filter__radio__clear"
                                onClick={() => handleRatingChange(0)}
                            >
                                Clear Rating
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Availability Filter */}
            <div className="filter__section">
                <button 
                    className="filter__section__header"
                    onClick={() => toggleSection('availability')}
                >
                    <span className="filter__section__title">Availability</span>
                    {expandedSections.availability ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </button>
                {expandedSections.availability && (
                    <div className="filter__section__content">
                        <label className="filter__radio">
                            <input
                                type="radio"
                                name="availability"
                                value="all"
                                checked={filters.availability === 'all'}
                                onChange={() => handleAvailabilityChange('all')}
                            />
                            <span className="filter__radio__label">All Products</span>
                        </label>
                        <label className="filter__radio">
                            <input
                                type="radio"
                                name="availability"
                                value="in-stock"
                                checked={filters.availability === 'in-stock'}
                                onChange={() => handleAvailabilityChange('in-stock')}
                            />
                            <span className="filter__radio__label">In Stock</span>
                        </label>
                        <label className="filter__radio">
                            <input
                                type="radio"
                                name="availability"
                                value="on-sale"
                                checked={filters.availability === 'on-sale'}
                                onChange={() => handleAvailabilityChange('on-sale')}
                            />
                            <span className="filter__radio__label">On Sale</span>
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filter;
