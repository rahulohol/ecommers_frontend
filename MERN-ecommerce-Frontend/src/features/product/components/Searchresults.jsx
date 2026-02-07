import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import {
  searchProductsAsync,
  selectSearchResults,
  selectSearchStatus,
  selectSearchNextCursor,
  selectSearchHasMore,
  selectSearchError,
  selectCurrentQuery,
  clearSearchResults,
} from '../Searchslice';
import { StarIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { FunnelIcon } from '@heroicons/react/24/outline';

// Convert USD to INR
function formatINRR(usdPrice) {
  const inrPrice = Math.round(usdPrice * 83);
  return inrPrice.toLocaleString('en-IN');
}

// Product Skeleton
function ProductSkeleton() {
  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="relative w-full bg-gray-200 h-64 sm:h-72 md:h-80 lg:h-72" />
      <div className="p-4 sm:p-5">
        <div className="mb-2 sm:mb-3">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <div className="h-6 bg-gray-200 rounded w-20" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading Spinner
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}

// Product Card
const ProductCard = React.memo(function ProductCard({ product }) {
  return (
    <Link 
      to={`/product-detail/${product._id}`} 
      className="block will-change-transform"
    >
      <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1">
        <div className="relative w-full overflow-hidden bg-gray-100 h-64 sm:h-72 md:h-80 lg:h-72">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            style={{ contentVisibility: 'auto' }}
          />
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="text-white font-semibold text-sm px-4 py-2 bg-red-500 rounded-lg">
                Out of Stock
              </span>
            </div>
          )}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <StarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-xs sm:text-sm font-semibold text-gray-900">
                {product.rating}
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <div className="mb-2 sm:mb-3">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
              {product.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {product.brand} • {product.category}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                ₹
                {
                  product?.discountPrice ||
                    Math.round(
                      product?.price *
                        (1 - product?.discountPercentage / 100)
                    )
                }
              </p>
              <p className="text-xs sm:text-sm line-through font-medium text-gray-400">
                ₹{product?.price}
              </p>
            </div>
            <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-50 group-hover:bg-indigo-600 transition-all duration-200">
              <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:text-white transition-colors duration-200" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default function SearchResults() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  
  const searchQuery = searchParams.get('q') || '';
  const searchResults = useSelector(selectSearchResults);
  const status = useSelector(selectSearchStatus);
  const nextCursor = useSelector(selectSearchNextCursor);
  const hasMore = useSelector(selectSearchHasMore);
  const error = useSelector(selectSearchError);
  const currentQuery = useSelector(selectCurrentQuery);
  
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  
  const loaderRef = useRef(null);
  const isInitialLoad = useRef(true);

  // Initial search when query changes
  useEffect(() => {
    if (searchQuery) {
      dispatch(clearSearchResults());
      dispatch(
        searchProductsAsync({
          query: searchQuery,
          filter,
          sort,
          cursor: null,
        })
      );
      isInitialLoad.current = false;
    }
  }, [searchQuery, filter, sort, dispatch]);

  // Infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current || isInitialLoad.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasMore &&
          status !== 'loading' &&
          !error
        ) {
          dispatch(
            searchProductsAsync({
              query: searchQuery,
              filter,
              sort,
              cursor: nextCursor,
            })
          );
        }
      },
      {
        rootMargin: '600px',
        threshold: 0.1,
      }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [nextCursor, hasMore, status, searchQuery, filter, sort, error, dispatch]);

  const isInitialLoading = status === 'loading' && searchResults.length === 0;
  const isLoadingMore = status === 'loading' && searchResults.length > 0;

  if (!searchQuery) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Search for Products
            </h2>
            <p className="text-gray-600">
              Enter a search term to find products
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Search Results for "{searchQuery}"
          </h1>
          {searchResults.length > 0 && (
            <p className="text-sm text-gray-600">
              Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''}
              {hasMore && ' (showing partial results)'}
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-lg bg-red-50 p-4 mb-6">
            <p className="text-sm text-red-800">
              Error: {error}
            </p>
          </div>
        )}

        {/* Loading State */}
        {isInitialLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
            {[...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Results Grid */}
        {!isInitialLoading && searchResults.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
              {searchResults.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Loading More Indicator */}
            {isLoadingMore && (
              <div className="mt-8">
                <LoadingSpinner />
              </div>
            )}

            {/* End of Results */}
            {!hasMore && searchResults.length > 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">
                  You've reached the end of the results
                </p>
              </div>
            )}

            {/* Infinite Scroll Trigger */}
            <div ref={loaderRef} className="h-10" />
          </>
        )}

        {/* No Results */}
        {!isInitialLoading && searchResults.length === 0 && !error && (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-24 w-24 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              No products found
            </h3>
            <p className="mt-2 text-gray-600">
              Try searching with different keywords or browse our categories
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
              >
                Browse All Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}