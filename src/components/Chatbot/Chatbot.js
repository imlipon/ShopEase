import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MinimizeIcon from '@mui/icons-material/Minimize';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "👋 Hello! I'm your ShopEase AI Assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to latest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // AI Response Generator
    const generateBotResponse = (userMessage) => {
        const message = userMessage.toLowerCase();

        // Product-related responses
        if (message.includes('price') || message.includes('cost')) {
            return "💰 Our products range from $29 to $199. You can filter by price in the shop to find items that fit your budget. Would you like help finding something in a specific price range?";
        }
        if (message.includes('shipping') || message.includes('deliver')) {
            return "🚚 We offer FREE SHIPPING on orders over $50! Standard delivery takes 5-7 business days. Express shipping is also available.";
        }
        if (message.includes('return') || message.includes('refund')) {
            return "↩️ We have a hassle-free 30-day return policy. If you're not satisfied with your purchase, simply return it in original condition for a full refund!";
        }
        if (message.includes('size') || message.includes('fit')) {
            return "📏 Check our detailed size guide available on each product page. We also offer free size exchanges if your first choice doesn't fit perfectly!";
        }
        if (message.includes('track') || message.includes('order')) {
            return "📦 You can track your order in real-time from your account dashboard. You'll also receive email updates at each stage of delivery.";
        }

        // Customer service responses
        if (message.includes('hello') || message.includes('hi')) {
            return "👋 Hi there! Welcome to ShopEase. I'm here to help with product info, orders, shipping, returns, and more. What can I assist you with?";
        }
        if (message.includes('thank')) {
            return "😊 You're welcome! Is there anything else I can help you with today?";
        }
        if (message.includes('help')) {
            return "🤝 I can help you with:\n• Product information & recommendations\n• Pricing & discounts\n• Shipping & delivery\n• Returns & refunds\n• Size guides\n• Order tracking\n\nJust ask!";
        }

        // Shopping-related responses
        if (message.includes('bestseller') || message.includes('popular') || message.includes('trending')) {
            return "⭐ Our trending products right now include:\n• Classic Navy Shirts\n• Premium Cotton Blends\n• Designer Jackets\n• Comfortable Hoodies\n\nCheck the 'Trending' section to see all our best sellers!";
        }
        if (message.includes('sale') || message.includes('discount')) {
            return "🎉 Great news! We have seasonal sales and promotions running throughout the month. Subscribe to our newsletter to get exclusive discount codes!";
        }
        if (message.includes('wishlist') || message.includes('save')) {
            return "❤️ You can save items to your wishlist by clicking the heart icon on any product. This helps you keep track of items you want to buy later!";
        }
        if (message.includes('category') || message.includes('collection')) {
            return "🛍️ We have a wide range of categories:\n• Men's Fashion\n• Women's Fashion\n• Kids' Clothing\n• Accessories\n\nVisit our Shop to browse by category!";
        }

        // Account-related responses
        if (message.includes('account') || message.includes('login')) {
            return "👤 You can create an account or log in from the top right corner. Having an account helps you:\n• Track orders\n• Save wishlist\n• Quick checkout\n• View order history";
        }
        if (message.includes('password') || message.includes('forgot')) {
            return "🔐 If you forgot your password, click 'Forgot Password' on the login page. We'll send you a reset link to your email.";
        }

        // Payment responses
        if (message.includes('payment') || message.includes('credit card') || message.includes('secure')) {
            return "💳 We accept all major credit cards, debit cards, and digital wallets. Your payment is 100% secure with SSL encryption. 🔒";
        }

        // Default response
        return "🤖 That's a great question! For more detailed information, please visit our FAQ page or contact our customer support team. Is there anything else I can help with?";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages([...messages, userMessage]);
        setInputValue('');
        setIsLoading(true);

        // Simulate bot thinking delay
        setTimeout(() => {
            const botResponse = {
                id: messages.length + 2,
                text: generateBotResponse(inputValue),
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsLoading(false);
        }, 600);
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const closeChat = () => {
        setIsOpen(false);
    };

    return (
        <div className="chatbot__container">
            {/* Floating Chat Button */}
            {!isOpen && (
                <button 
                    className="chatbot__floating__button"
                    onClick={toggleChat}
                    title="Open AI Chat Assistant"
                >
                    <SmartToyIcon sx={{ fontSize: '28px' }} />
                    <span className="chatbot__button__pulse"></span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot__window">
                    {/* Header */}
                    <div className="chatbot__header">
                        <div className="chatbot__header__content">
                            <SmartToyIcon sx={{ fontSize: '24px', marginRight: '10px' }} />
                            <div className="chatbot__header__text">
                                <h3>ShopEase AI Assistant</h3>
                                <p className="chatbot__status">Always here to help</p>
                            </div>
                        </div>
                        <div className="chatbot__header__actions">
                            <button 
                                className="chatbot__minimize__btn"
                                onClick={closeChat}
                                title="Close chat"
                            >
                                <MinimizeIcon sx={{ fontSize: '20px' }} />
                            </button>
                            <button 
                                className="chatbot__close__btn"
                                onClick={closeChat}
                                title="Close chat"
                            >
                                <CloseIcon sx={{ fontSize: '20px' }} />
                            </button>
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div className="chatbot__messages">
                        {messages.map((msg) => (
                            <div 
                                key={msg.id} 
                                className={`chatbot__message chatbot__message--${msg.sender}`}
                            >
                                <div className="chatbot__message__bubble">
                                    {msg.text}
                                </div>
                                <span className="chatbot__message__time">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        ))}
                        
                        {isLoading && (
                            <div className="chatbot__message chatbot__message--bot">
                                <div className="chatbot__message__bubble chatbot__typing">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Form */}
                    <form className="chatbot__input__form" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            className="chatbot__input"
                            placeholder="Ask me anything..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            disabled={isLoading}
                        />
                        <button 
                            type="submit" 
                            className="chatbot__send__btn"
                            disabled={!inputValue.trim() || isLoading}
                        >
                            <SendIcon sx={{ fontSize: '20px' }} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
