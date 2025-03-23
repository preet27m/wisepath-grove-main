import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { CreditCard, Check, ArrowRight, Info, CreditCardIcon, ChevronDown, ChevronRight } from 'lucide-react';

// Interface for course details
interface CourseDetails {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  thumbnailAlt: string;
  features: string[];
}

// Payment step indicators
const steps = [
  { title: 'Course Selection', completed: true },
  { title: 'Payment Details', completed: false },
  { title: 'Confirmation', completed: false },
];

const CourseEnrollment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId') || '1'; // Default to 1 if not specified

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  
  // Form fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Load course details
  useEffect(() => {
    // Simulate API call to fetch course details
    const fetchCourse = async () => {
      setLoading(true);
      
      // Sample course data (in a real app, fetch from API)
      const sampleCourses: CourseDetails[] = [
        {
          id: '1',
          title: 'Machine Learning Fundamentals: From Zero to Hero',
          instructor: 'Dr. Sarah Johnson',
          rating: 4.8,
          reviewCount: 2547,
          price: 89.99,
          discountPrice: 49.99,
          imageUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          thumbnailAlt: "Neural network visualization with blue nodes and connections",
          features: [
            'Lifetime access to 45+ lectures',
            'Hands-on projects with real data',
            'Certificate of completion',
            'Access to private community',
            'Monthly live Q&A sessions',
          ]
        },
        {
          id: '2',
          title: 'Web Development Bootcamp 2023: Full Stack Mastery',
          instructor: 'Michael Smith',
          rating: 4.9,
          reviewCount: 3254,
          price: 99.99,
          discountPrice: 69.99,
          imageUrl: 'https://images.unsplash.com/photo-1552308995-2baac1ad5490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          thumbnailAlt: "Laptop with HTML and CSS code displayed on screen",
          features: [
            'Lifetime access to 75+ lectures',
            '15 real-world projects',
            'Certificate of completion',
            'Access to developer community',
            'Weekly code reviews',
          ]
        },
      ];
      
      // Find the course by ID
      const course = sampleCourses.find(c => c.id === courseId) || sampleCourses[0];
      setCourseDetails(course);
      setLoading(false);
    };
    
    fetchCourse();
  }, [courseId]);

  // Check form validity
  useEffect(() => {
    if (paymentMethod === 'credit-card') {
      setFormIsValid(
        cardNumber.replace(/\s/g, '').length === 16 &&
        cardName.length > 3 &&
        expiryDate.length === 5 &&
        cvv.length === 3
      );
    } else {
      // UPI, net banking, etc. would have different validation
      setFormIsValid(true);
    }
  }, [paymentMethod, cardNumber, cardName, expiryDate, cvv]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format card number with spaces every 4 digits
    const value = e.target.value.replace(/\s/g, '');
    if (/^\d*$/.test(value) && value.length <= 16) {
      const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
      setCardNumber(formatted);
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      let formatted = value;
      if (value.length > 2) {
        formatted = value.slice(0, 2) + '/' + value.slice(2);
      }
      setExpiryDate(formatted);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const applyCoupon = () => {
    // In a real app, you would validate the coupon with an API
    if (couponCode.toLowerCase() === 'welcome20') {
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code');
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessingPayment(false);
      setStep(2); // Move to confirmation
    }, 2000);
  };

  const handleEnrollmentComplete = () => {
    navigate('/enrollment-success', { 
      state: { course: courseDetails } 
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="py-20 px-4 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Calculate prices
  const originalPrice = courseDetails.price;
  const discountPrice = courseDetails.discountPrice || originalPrice;
  const couponDiscount = couponApplied ? discountPrice * 0.2 : 0; // 20% off with coupon
  const finalPrice = discountPrice - couponDiscount;
  
  // Format price in INR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price * 82.5); // Convert USD to INR
  };

  return (
    <MainLayout>
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {/* Progress steps */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="flex justify-between">
              {steps.map((s, i) => (
                <div key={i} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        i < step ? 'bg-primary border-primary text-white' : 
                        i === step ? 'border-primary text-primary' : 
                        'border-gray-300 dark:border-gray-700 text-gray-400'
                      }`}
                    >
                      {i < step ? <Check className="h-5 w-5" /> : i + 1}
                    </div>
                    <div className="text-xs mt-2 text-center">
                      {s.title}
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`absolute top-5 left-1/2 w-full h-0.5 ${
                      i < step ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {step === 1 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Payment Form */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-800">
                  <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
                  
                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Payment Method</div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('credit-card')}
                        className={`border rounded-lg p-4 flex flex-col items-center justify-center transition-colors ${
                          paymentMethod === 'credit-card' 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                        }`}
                      >
                        <CreditCard className={`h-5 w-5 mb-2 ${paymentMethod === 'credit-card' ? 'text-primary' : 'text-gray-500'}`} />
                        <span className="text-sm font-medium">Credit Card</span>
                      </button>
                      
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`border rounded-lg p-4 flex flex-col items-center justify-center transition-colors ${
                          paymentMethod === 'paypal' 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                        }`}
                      >
                        <div className={`h-5 w-5 mb-2 text-center ${paymentMethod === 'paypal' ? 'text-primary' : 'text-gray-500'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M7.996 0h8.008C21.26 0 24 2.744 24 6.996v10.008C24 21.26 21.256 24 16.004 24H7.996C3.74 24 0 21.256 0 16.004V6.996C0 2.74 2.744 0 7.996 0zm6.002 9.32c.197-.005.444.006.58.025.137.025.562.114.778.532.184.36.226.809.155 1.212-.132.747-.6 1.2-1.122 1.512-.43.256-.96.424-1.578.486-.152.014-.362.02-.582.02-.142 0-.278-.003-.414-.008-.01 0-.02 0-.03-.001a6.37 6.37 0 0 0-.075-.001 2.28 2.28 0 0 1-.17-.004l-.176.948a.262.262 0 0 1-.257.218h-.945l.013-.07c.021-.107.174-.936.38-2.01.203-1.066.368-1.943.38-2.012h1.646c.15 0 .33.004.533.018.204.013.379.035.526.066.054.011.104.022.152.034.046.01.09.022.133.036zm-8.368.026h1.834c.44.5.805.018 1.179.146.479.166.786.488.869.97.05.285-.011.59-.134.934-.132.369-.32.683-.572.946-.243.247-.56.434-.931.57-.351.13-.736.19-1.155.19h-.509c-.103 0-.206.075-.228.182l-.273 1.454h-1.031c-.103 0-.149-.074-.124-.166l.988-5.153c.025-.09.134-.164.237-.164h.001c0-.002 0-.002 0 0h-.15l-.001.09zm3.07 7.95c.103 0 .212-.072.237-.164l.138-.729c.025-.092-.027-.166-.13-.166h-.999c-.103 0-.211.076-.236.166l-.137.729c-.25.09.027.164.129.164h.999zm8.955-7.976c-.21 0-.264.127-.288.215-.024.09-.732 3.85-.752 3.96-.2.111.068.229.18.229h.546c.104 0 .211-.076.236-.166l.214-1.165h.432c.786 0 1.357-.166 1.703-.498.305-.291.458-.701.512-1.067.026-.176.024-.337-.006-.483-.03-.144-.092-.27-.181-.374a.702.702 0 0 0-.329-.228c-.198-.075-.457-.112-.773-.112l-.1.001-.099.001c-.022 0-.043 0-.061-.001h-1.235l.001-.012zm-4.908.024c-.098 0-.208.073-.232.162l-.194 1.574h.302c.305 0 .55-.077.746-.237.177-.145.296-.364.349-.629.04-.2.01-.36-.084-.478-.095-.117-.26-.175-.499-.175h-.389v-.217h.001z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">PayPal</span>
                      </button>
                      
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('google-pay')}
                        className={`border rounded-lg p-4 flex flex-col items-center justify-center transition-colors ${
                          paymentMethod === 'google-pay' 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                        }`}
                      >
                        <div className={`h-5 w-5 mb-2 text-center ${paymentMethod === 'google-pay' ? 'text-primary' : 'text-gray-500'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M22.285 10.38a7.717 7.717 0 0 0-.252-1.97H12v3.628h5.777a4.884 4.884 0 0 1-2.144 3.264v2.684h3.464c2.032-1.872 3.188-4.632 3.188-7.606z" fill="#4285F4"/>
                            <path d="M12 23c2.887 0 5.321-.963 7.096-2.606l-3.464-2.684c-.962.647-2.201 1.03-3.632 1.03-2.787 0-5.146-1.884-5.983-4.41H2.464v2.77A10.66 10.66 0 0 0 12 23z" fill="#34A853"/>
                            <path d="M5.45 13.47c-.216-.644-.334-1.332-.334-2.034s.118-1.39.333-2.035V6.632H2.464a10.657 10.657 0 0 0 0 9.6l2.987-2.763z" fill="#FBBC05"/>
                            <path d="M12 5.66c1.57 0 2.986.54 4.097 1.6l3.064-3.064A10.66 10.66 0 0 0 12 1C7.698 1 3.94 3.55 2.464 7.23l2.987 2.764C6.301 7.468 8.66 5.66 12 5.66z" fill="#EA4335"/>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Google Pay</span>
                      </button>

                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('apple-pay')}
                        className={`border rounded-lg p-4 flex flex-col items-center justify-center transition-colors ${
                          paymentMethod === 'apple-pay' 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                        }`}
                      >
                        <div className={`h-5 w-5 mb-2 text-center ${paymentMethod === 'apple-pay' ? 'text-primary' : 'text-gray-500'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M14.698 4.212c.974 0 2.203-.776 2.873-1.793.6-.912.998-2.17.998-3.419 0-.165-.015-.33-.045-.494-1.012.045-2.233.854-2.947 1.936-.569.837-1.022 2.078-1.022 3.326 0 .15.15.299.3.449.75.015.12.015.195.015zm.088 1.754c-1.602 0-2.902.93-3.676.93-.828 0-1.993-.899-3.3-.899-1.691 0-3.472 1.036-4.359 2.638-1.877 3.254-.48 8.063 1.319 10.701.899 1.274 1.947 2.683 3.3 2.638 1.319-.06 1.832-.854 3.434-.854 1.587 0 2.056.854 3.435.824 1.438-.03 2.338-1.274 3.208-2.564.989-1.409 1.393-2.788 1.408-2.863-.03-.015-2.731-1.05-2.761-4.2-.03-2.623 2.146-3.883 2.233-3.958-1.23-1.799-3.132-1.993-3.797-2.023-.854-.044-2.091.465-3.434.465l.03.015z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Apple Pay</span>
                      </button>
                      
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`border rounded-lg p-4 flex flex-col items-center justify-center transition-colors ${
                          paymentMethod === 'upi' 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                        }`}
                      >
                        <div className={`h-5 w-5 mb-2 text-center font-bold ${paymentMethod === 'upi' ? 'text-primary' : 'text-gray-500'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M21.5 6c-4.059 0-9.381 2.159-11.59 4.369L4.061 16.218l1.968 1.968 5.85-5.85c2.21-2.21 4.369-7.55 4.369-11.59L21.5 6z" />
                            <path d="M3.5 22c4.059 0 9.381-2.159 11.59-4.369l5.85-5.85-1.969-1.968-5.85 5.85c-2.21 2.21-4.369 7.55-4.369 11.59L3.5 22z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">UPI</span>
                      </button>
                      
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('stripe')}
                        className={`border rounded-lg p-4 flex flex-col items-center justify-center transition-colors ${
                          paymentMethod === 'stripe' 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                        }`}
                      >
                        <div className={`h-5 w-5 mb-2 text-center ${paymentMethod === 'stripe' ? 'text-primary' : 'text-gray-500'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M13.479 9.883c-1.626-.604-2.512-.931-2.512-1.618 0-.559.445-.931 1.26-.931 1.469 0 2.97.604 3.988 1.14l.586-3.68c-.817-.373-2.512-.977-4.757-.977-1.655 0-3.032.42-3.988 1.213-1 .838-1.528 2.05-1.528 3.496 0 2.61 1.587 3.73 4.16 4.684 1.656.605 2.213 1.046 2.213 1.712 0 .652-.557 1.046-1.528 1.046-1.214 0-3.275-.605-4.618-1.4l-.587 3.776c1.144.652 3.246 1.306 5.432 1.306 1.754 0 3.208-.42 4.195-1.232 1.115-.838 1.684-2.092 1.684-3.636 0-2.65-1.616-3.776-4-4.666zm-12.28 5.52l3.013-18.224h4.042l-3.013 18.223h-4.042zm20.813-12.006c-1.002-.746-2.275-1.116-3.8-1.116-1.704 0-3.16.56-3.976 1.493l-.299-1.229h-3.516l.015-.142c.274-1.83 1.205-3.557 4.452-3.207l.324-3.406c-5.339-.605-7.425 2.321-8.227 5.318l-.072.467h-1.072l-.628 3.556h1.758l-1.809 10.9h4.043l1.949-11.695h2.525l.586-3.458h-2.512l.055-.308c.23-1.296.932-1.9 2.312-1.9.746 0 1.45.225 1.903.467l.687-3.721z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Stripe</span>
                      </button>
                    </div>
                  </div>
                  
                  {paymentMethod === 'credit-card' && (
                    <form onSubmit={handlePaymentSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="card-number"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 text-gray-700 dark:text-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CreditCardIcon className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          id="card-name"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 text-gray-700 dark:text-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 text-gray-700 dark:text-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            value={cvv}
                            onChange={handleCvvChange}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 text-gray-700 dark:text-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full neo-btn flex items-center justify-center py-3"
                          disabled={!formIsValid || processingPayment}
                        >
                          {processingPayment ? (
                            <span className="inline-flex items-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing Payment...
                            </span>
                          ) : (
                            <>
                              <span>Complete Payment</span>
                              <span className="ml-2">{formatPrice(finalPrice)}</span>
                            </>
                          )}
                        </button>
                      </div>
                      
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center mt-4">
                        <Info className="h-3 w-3 mr-1" />
                        <span>Your payment information is securely processed</span>
                      </div>
                    </form>
                  )}
                  
                  {paymentMethod === 'upi' && (
                    <div className="text-center py-8">
                      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6 inline-block">
                        <div className="text-3xl font-mono mb-2">curiocity@ybl</div>
                        <div className="text-sm text-gray-500">Scan using any UPI app</div>
                      </div>
                      
                      <button
                        onClick={() => setStep(2)}
                        className="w-full neo-btn flex items-center justify-center py-3"
                      >
                        <span>I've Made the Payment</span>
                      </button>
                    </div>
                  )}
                  
                  {paymentMethod === 'net-banking' && (
                    <div className="space-y-5 py-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Select Your Bank
                        </label>
                        <div className="relative">
                          <select className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 text-gray-700 dark:text-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                            <option value="">Select a bank</option>
                            <option value="sbi">State Bank of India</option>
                            <option value="hdfc">HDFC Bank</option>
                            <option value="icici">ICICI Bank</option>
                            <option value="axis">Axis Bank</option>
                            <option value="pnb">Punjab National Bank</option>
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setStep(2)}
                        className="w-full neo-btn flex items-center justify-center py-3 mt-4"
                      >
                        <span>Continue to Net Banking</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="text-center py-8">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6 inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-24 h-24 mx-auto text-blue-500 dark:text-blue-400">
                          <path d="M7.996 0h8.008C21.26 0 24 2.744 24 6.996v10.008C24 21.26 21.256 24 16.004 24H7.996C3.74 24 0 21.256 0 16.004V6.996C0 2.74 2.744 0 7.996 0zm6.002 9.32c.197-.005.444.006.58.025.137.025.562.114.778.532.184.36.226.809.155 1.212-.132.747-.6 1.2-1.122 1.512-.43.256-.96.424-1.578.486-.152.014-.362.02-.582.02-.142 0-.278-.003-.414-.008-.01 0-.02 0-.03-.001a6.37 6.37 0 0 0-.075-.001 2.28 2.28 0 0 1-.17-.004l-.176.948a.262.262 0 0 1-.257.218h-.945l.013-.07c.021-.107.174-.936.38-2.01.203-1.066.368-1.943.38-2.012h1.646c.15 0 .33.004.533.018.204.013.379.035.526.066.054.011.104.022.152.034.046.01.09.022.133.036zm-8.368.026h1.834c.44.5.805.018 1.179.146.479.166.786.488.869.97.05.285-.011.59-.134.934-.132.369-.32.683-.572.946-.243.247-.56.434-.931.57-.351.13-.736.19-1.155.19h-.509c-.103 0-.206.075-.228.182l-.273 1.454h-1.031c-.103 0-.149-.074-.124-.166l.988-5.153c.025-.09.134-.164.237-.164h.001c0-.002 0-.002 0 0h-.15l-.001.09zm3.07 7.95c.103 0 .212-.072.237-.164l.138-.729c.025-.092-.027-.166-.13-.166h-.999c-.103 0-.211.076-.236.166l-.137.729c-.25.09.027.164.129.164h.999zm8.955-7.976c-.21 0-.264.127-.288.215-.024.09-.732 3.85-.752 3.96-.2.111.068.229.18.229h.546c.104 0 .211-.076.236-.166l.214-1.165h.432c.786 0 1.357-.166 1.703-.498.305-.291.458-.701.512-1.067.026-.176.024-.337-.006-.483-.03-.144-.092-.27-.181-.374a.702.702 0 0 0-.329-.228c-.198-.075-.457-.112-.773-.112l-.1.001-.099.001c-.022 0-.043 0-.061-.001h-1.235l.001-.012zm-4.908.024c-.098 0-.208.073-.232.162l-.194 1.574h.302c.305 0 .55-.077.746-.237.177-.145.296-.364.349-.629.04-.2.01-.36-.084-.478-.095-.117-.26-.175-.499-.175h-.389v-.217h.001z" />
                        </svg>
                        <div className="text-sm text-gray-500 mt-4">Click the button below to continue to PayPal</div>
                      </div>
                      
                      <button
                        onClick={() => setStep(2)}
                        className="w-full neo-btn flex items-center justify-center py-3"
                      >
                        <span>Continue with PayPal</span>
                      </button>
                    </div>
                  )}

                  {paymentMethod === 'google-pay' && (
                    <div className="text-center py-8">
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-6 inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-24 h-24 mx-auto">
                          <path d="M22.285 10.38a7.717 7.717 0 0 0-.252-1.97H12v3.628h5.777a4.884 4.884 0 0 1-2.144 3.264v2.684h3.464c2.032-1.872 3.188-4.632 3.188-7.606z" fill="#4285F4"/>
                          <path d="M12 23c2.887 0 5.321-.963 7.096-2.606l-3.464-2.684c-.962.647-2.201 1.03-3.632 1.03-2.787 0-5.146-1.884-5.983-4.41H2.464v2.77A10.66 10.66 0 0 0 12 23z" fill="#34A853"/>
                          <path d="M5.45 13.47c-.216-.644-.334-1.332-.334-2.034s.118-1.39.333-2.035V6.632H2.464a10.657 10.657 0 0 0 0 9.6l2.987-2.763z" fill="#FBBC05"/>
                          <path d="M12 5.66c1.57 0 2.986.54 4.097 1.6l3.064-3.064A10.66 10.66 0 0 0 12 1C7.698 1 3.94 3.55 2.464 7.23l2.987 2.764C6.301 7.468 8.66 5.66 12 5.66z" fill="#EA4335"/>
                        </svg>
                        <div className="text-sm text-gray-500 mt-4">Click the button below to pay with Google Pay</div>
                      </div>
                      
                      <button
                        onClick={() => setStep(2)}
                        className="w-full neo-btn flex items-center justify-center py-3"
                      >
                        <span>Continue with Google Pay</span>
                      </button>
                    </div>
                  )}

                  {paymentMethod === 'apple-pay' && (
                    <div className="text-center py-8">
                      <div className="bg-black p-6 rounded-lg mb-6 inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-24 h-24 mx-auto text-white">
                          <path fill="currentColor" d="M14.698 4.212c.974 0 2.203-.776 2.873-1.793.6-.912.998-2.17.998-3.419 0-.165-.015-.33-.045-.494-1.012.045-2.233.854-2.947 1.936-.569.837-1.022 2.078-1.022 3.326 0 .15.15.299.3.449.75.015.12.015.195.015zm.088 1.754c-1.602 0-2.902.93-3.676.93-.828 0-1.993-.899-3.3-.899-1.691 0-3.472 1.036-4.359 2.638-1.877 3.254-.48 8.063 1.319 10.701.899 1.274 1.947 2.683 3.3 2.638 1.319-.06 1.832-.854 3.434-.854 1.587 0 2.056.854 3.435.824 1.438-.03 2.338-1.274 3.208-2.564.989-1.409 1.393-2.788 1.408-2.863-.03-.015-2.731-1.05-2.761-4.2-.03-2.623 2.146-3.883 2.233-3.958-1.23-1.799-3.132-1.993-3.797-2.023-.854-.044-2.091.465-3.434.465l.03.015z" />
                        </svg>
                        <div className="text-sm text-white mt-4">Click the button below to pay with Apple Pay</div>
                      </div>
                      
                      <button
                        onClick={() => setStep(2)}
                        className="w-full neo-btn flex items-center justify-center py-3"
                      >
                        <span>Continue with Apple Pay</span>
                      </button>
                    </div>
                  )}

                  {paymentMethod === 'stripe' && (
                    <div className="text-center py-8">
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg mb-6 inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-24 h-24 mx-auto text-purple-500">
                          <path fill="currentColor" d="M13.479 9.883c-1.626-.604-2.512-.931-2.512-1.618 0-.559.445-.931 1.26-.931 1.469 0 2.97.604 3.988 1.14l.586-3.68c-.817-.373-2.512-.977-4.757-.977-1.655 0-3.032.42-3.988 1.213-1 .838-1.528 2.05-1.528 3.496 0 2.61 1.587 3.73 4.16 4.684 1.656.605 2.213 1.046 2.213 1.712 0 .652-.557 1.046-1.528 1.046-1.214 0-3.275-.605-4.618-1.4l-.587 3.776c1.144.652 3.246 1.306 5.432 1.306 1.754 0 3.208-.42 4.195-1.232 1.115-.838 1.684-2.092 1.684-3.636 0-2.65-1.616-3.776-4-4.666zm-12.28 5.52l3.013-18.224h4.042l-3.013 18.223h-4.042zm20.813-12.006c-1.002-.746-2.275-1.116-3.8-1.116-1.704 0-3.16.56-3.976 1.493l-.299-1.229h-3.516l.015-.142c.274-1.83 1.205-3.557 4.452-3.207l.324-3.406c-5.339-.605-7.425 2.321-8.227 5.318l-.072.467h-1.072l-.628 3.556h1.758l-1.809 10.9h4.043l1.949-11.695h2.525l.586-3.458h-2.512l.055-.308c.23-1.296.932-1.9 2.312-1.9.746 0 1.45.225 1.903.467l.687-3.721z" />
                        </svg>
                        <div className="text-sm text-gray-500 mt-4">Click the button below to pay with Stripe</div>
                      </div>
                      
                      <button
                        onClick={() => setStep(2)}
                        className="w-full neo-btn flex items-center justify-center py-3"
                      >
                        <span>Continue with Stripe</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 sticky top-24">
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                    
                    {/* Add AI learning image */}
                    <div className="mb-4 text-center">
                      <img 
                        src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80"
                        alt="AI Learning Visualization" 
                        className="w-full h-40 object-cover rounded-lg mb-2"
                      />
                      <div className="text-xs text-gray-500 dark:text-gray-400">CurioCity - Elevate Your Learning</div>
                    </div>
                    
                    <div className="flex items-start mb-4">
                      <img 
                        src={courseDetails.imageUrl} 
                        alt={courseDetails.thumbnailAlt} 
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="ml-4">
                        <h4 className="font-medium text-base">{courseDetails.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">by {courseDetails.instructor}</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-800 my-4 pt-4">
                      <div className="text-sm mb-3">What you'll get:</div>
                      <ul className="space-y-2 text-sm">
                        {courseDetails.features.map((feature: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-800 my-4 pt-4">
                      {/* Coupon code */}
                      {!couponApplied && (
                        <div className="flex mb-4">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 rounded-l-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 text-sm text-gray-700 dark:text-gray-300 focus:border-primary focus:outline-none"
                            placeholder="Enter coupon code"
                          />
                          <button
                            onClick={applyCoupon}
                            className="rounded-r-lg bg-primary text-white py-2 px-4 text-sm font-medium"
                          >
                            Apply
                          </button>
                        </div>
                      )}
                      
                      {couponApplied && (
                        <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-sm p-2 rounded-lg flex items-center mb-4">
                          <Check className="h-4 w-4 mr-2" />
                          <span>Coupon "WELCOME20" applied (20% off)</span>
                        </div>
                      )}
                      
                      {/* Price breakdown */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Original Price</span>
                          <span className="text-gray-600 dark:text-gray-400">{formatPrice(originalPrice)}</span>
                        </div>
                        
                        {originalPrice !== discountPrice && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Discount</span>
                            <span className="text-green-600 dark:text-green-400">-{formatPrice(originalPrice - discountPrice)}</span>
                          </div>
                        )}
                        
                        {couponApplied && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Coupon (WELCOME20)</span>
                            <span className="text-green-600 dark:text-green-400">-{formatPrice(couponDiscount)}</span>
                          </div>
                        )}
                        
                        <div className="border-t border-gray-200 dark:border-gray-800 pt-2 flex justify-between font-bold">
                          <span>Total</span>
                          <span>{formatPrice(finalPrice)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-800">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-6">
                  <Check className="h-8 w-8" />
                </div>
                
                {/* Add AI learning image */}
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
                    alt="AI Learning Journey" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">CurioCity - Begin Your Learning Adventure</div>
                </div>
                
                <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  You have successfully enrolled in the course.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-2">{courseDetails.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Thank you for your payment of {formatPrice(finalPrice)}
                  </p>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  A confirmation email has been sent to your registered email address with all the details.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={handleEnrollmentComplete}
                    className="neo-btn flex-1 flex items-center justify-center"
                  >
                    <span>Start Learning</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => navigate('/courses')}
                    className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Browse More Courses
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default CourseEnrollment; 