import { useState } from 'react';
import { Star, Clock, BookOpen, Users, ChevronRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  duration: string;
  level: string;
  students: number;
  imageUrl: string;
  mobileThumbnailUrl?: string;
  thumbnailAlt?: string;
  price: number;
  discountPrice?: number;
  tags: string[];
  featured?: boolean;
}

const CourseCard = ({
  id,
  title,
  instructor,
  rating,
  reviewCount,
  duration,
  level,
  students,
  imageUrl,
  mobileThumbnailUrl,
  thumbnailAlt,
  price,
  discountPrice,
  tags,
  featured,
}: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatPrice = (amount: number) => {
    // Convert USD to INR (approximate exchange rate)
    const inrAmount = amount * 82.5;
    
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(inrAmount);
  };
  
  const discountPercentage = discountPrice 
    ? Math.round(((price - discountPrice) / price) * 100) 
    : 0;

  return (
    <div 
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200/40 dark:border-gray-800/40 bg-white dark:bg-gray-900/60 backdrop-blur-sm ${featured ? 'ring-2 ring-primary/30 dark:ring-primary/20' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Course image */}
      <div className="aspect-video w-full overflow-hidden relative group-hover:shadow-inner">
        <picture>
          <source media="(max-width: 640px)" srcSet={mobileThumbnailUrl || imageUrl} />
          <img 
            src={imageUrl} 
            alt={thumbnailAlt || title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:filter group-hover:brightness-105"
            loading="lazy"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
        {/* Level tag */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
          {level}
        </span>
        
        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 right-4 flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/90 text-white backdrop-blur-sm shadow-md">
            <Award className="h-3 w-3 mr-1" />
            <span>Featured</span>
          </div>
        )}
      </div>
      
      {/* Course content */}
      <div className="p-6 relative bg-white dark:bg-gray-900/90 backdrop-blur-sm transition-colors duration-300">
        {/* Discount badge */}
        {discountPrice && (
          <span className="absolute -top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white shadow-md animate-pulse-soft">
            {discountPercentage}% OFF
          </span>
        )}
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.slice(0, 2).map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/10"
            >
              {tag}
            </span>
          ))}
          {tags.length > 2 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
              +{tags.length - 2} more
            </span>
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-medium mb-2 line-clamp-2 transition-colors group-hover:text-primary">
          {title}
        </h3>
        
        {/* Instructor */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          by {instructor}
        </p>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(rating) 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {rating.toFixed(1)}
          </span>
          <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
            ({reviewCount})
          </span>
        </div>
        
        {/* Meta info */}
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {duration}
          </div>
          <div className="flex items-center">
            <BookOpen className="h-3.5 w-3.5 mr-1" />
            {level}
          </div>
          <div className="flex items-center">
            <Users className="h-3.5 w-3.5 mr-1" />
            {students.toLocaleString()} students
          </div>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            {discountPrice ? (
              <div className="flex items-center">
                <span className="text-lg font-bold text-primary">
                  {formatPrice(discountPrice)}
                </span>
                <span className="ml-2 text-sm line-through text-gray-500 dark:text-gray-400">
                  {formatPrice(price)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-primary">
                {formatPrice(price)}
              </span>
            )}
          </div>
          
          <Link 
            to={`/courses/${id}`}
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            <span>View Course</span>
            <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      
      {/* Hover overlay with preview button */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/80 to-black/50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Link
          to={`/courses/${id}`}
          className="neo-btn transform transition-transform duration-300 hover:scale-105"
        >
          Explore Course
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
