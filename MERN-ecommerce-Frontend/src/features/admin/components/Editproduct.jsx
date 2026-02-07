'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from '../../product/productSlice';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../common/Modal';
import { useAlert } from 'react-alert';

function EditProduct() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const alert = useAlert();

  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const selectedProduct = useSelector(selectProductById);

  const [openModal, setOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      price: '',
      discountPercentage: '0',
      stock: '',
      thumbnail: '',
      brand: '',
      category: '',
      image1: '',
      image2: '',
      image3: '',
      highlight1: '',
      highlight2: '',
      highlight3: '',
      highlight4: '',
      colors: [],
      sizes: [],
    }
  });

  const colors = [
    { id: 'white', name: 'White', hex: '#FFFFFF' },
    { id: 'beige', name: 'Beige', hex: '#F5F5DC' },
    { id: 'gray', name: 'Gray', hex: '#808080' },
    { id: 'black', name: 'Black', hex: '#000000' },
    { id: 'red', name: 'Red', hex: '#EF4444' },
    { id: 'blue', name: 'Blue', hex: '#3B82F6' },
    { id: 'green', name: 'Green', hex: '#10B981' },
    { id: 'yellow', name: 'Yellow', hex: '#F59E0B' },
    { id: 'pink', name: 'Pink', hex: '#EC4899' },
    { id: 'purple', name: 'Purple', hex: '#8B5CF6' },
  ];

  const sizes = [
    'XXS',
    'XS',
    'S',
    'M',
    'L',
    'XL',
    '2XL',
    '3XL',
  ].map((s) => ({ id: s.toLowerCase(), name: s }));

  // Watch thumbnail for preview
  const thumbnailUrl = watch('thumbnail');

  /* ---------------- effects ---------------- */

  // Fetch product on mount
  useEffect(() => {
    if (params.id) {
      setIsLoading(true);
      dispatch(fetchProductByIdAsync(params.id));
    }
    
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [params.id, dispatch]);

  // Populate form when product is loaded
  useEffect(() => {
    if (!selectedProduct) return;

    const p = selectedProduct;
    
    // Images - handle both array and missing images
    const images = Array.isArray(p.images) ? p.images : [];
    
    // Highlights - filter out null/undefined values
    const highlights = Array.isArray(p.highlights) 
      ? p.highlights.filter(h => h != null && h !== '') 
      : [];
    
    // Colors - handle both empty arrays and arrays with objects
    const colorIds = Array.isArray(p.colors) && p.colors.length > 0
      ? p.colors.map((c) => c?.id).filter(id => id != null)
      : [];
    
    // Sizes - handle both empty arrays and arrays with objects
    const sizeIds = Array.isArray(p.sizes) && p.sizes.length > 0
      ? p.sizes.map((s) => s?.id).filter(id => id != null)
      : [];
    
    const formData = {
      title: p.title || '',
      description: p.description || '',
      price: p.price || '',
      discountPercentage: p.discountPercentage || 0,
      stock: p.stock || '',
      thumbnail: p.thumbnail || '',
      brand: p.brand || '',
      category: p.category || '',
      image1: images[0] || '',
      image2: images[1] || '',
      image3: images[2] || '',
      highlight1: highlights[0] || '',
      highlight2: highlights[1] || '',
      highlight3: highlights[2] || '',
      highlight4: highlights[3] || '',
      colors: colorIds,
      sizes: sizeIds,
    };
    
    reset(formData);
    setIsLoading(false);
  }, [selectedProduct, reset]);

  /* ---------------- submit ---------------- */

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Filter out empty/null images
      const imageUrls = [data.image1, data.image2, data.image3]
        .filter(url => url && url.trim() !== '');
      
      // Always include thumbnail if it exists, and add other images
      const allImages = data.thumbnail 
        ? [data.thumbnail, ...imageUrls]
        : imageUrls;
      
      // Filter out empty/null highlights
      const highlights = [
        data.highlight1,
        data.highlight2,
        data.highlight3,
        data.highlight4,
      ].filter(h => h && h.trim() !== '');
      
      // Map colors and sizes, filtering out any invalid entries
      const productColors = Array.isArray(data.colors)
        ? data.colors
            .map((id) => colors.find((c) => c.id === id))
            .filter(c => c != null)
        : [];
      
      const productSizes = Array.isArray(data.sizes)
        ? data.sizes
            .map((id) => sizes.find((s) => s.id === id))
            .filter(s => s != null)
        : [];

      const product = {
        id: params.id,
        title: data.title,
        description: data.description,
        brand: data.brand,
        category: data.category,
        price: +data.price,
        stock: +data.stock,
        discountPercentage: +data.discountPercentage || 0,
        thumbnail: data.thumbnail,
        images: allImages.length > 0 ? allImages : [data.thumbnail],
        highlights: highlights,
        rating: selectedProduct?.rating || 0,
        colors: productColors,
        sizes: productSizes,
      };

      await dispatch(updateProductAsync(product)).unwrap();
      alert.success('Product updated successfully');
      navigate('/admin');
    } catch (error) {
      alert.error(error?.message || 'Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(updateProductAsync({ ...selectedProduct, id: params.id, deleted: true })).unwrap();
      alert.success('Product deleted successfully');
      setOpenModal(false);
      navigate('/admin');
    } catch (error) {
      alert.error('Failed to delete product');
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/admin');
      }
    } else {
      navigate('/admin');
    }
  };

  /* ---------------- ui helpers ---------------- */

  const Section = ({ title, subtitle, children }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );

  const Input = React.forwardRef(({ label, error, helpText, required, ...props }, ref) => (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        ref={ref}
        {...props}
        className={`w-full rounded-lg border ${
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
        } px-4 py-2.5 text-sm transition-colors focus:ring-2 focus:outline-none`}
      />
      {helpText && !error && <p className="text-xs text-gray-500">{helpText}</p>}
      {error && <p className="text-xs text-red-600 flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>}
    </div>
  ));

  const Select = React.forwardRef(({ label, error, required, children, ...props }, ref) => (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        ref={ref}
        {...props}
        className={`w-full rounded-lg border ${
          error ? 'border-red-300' : 'border-gray-300'
        } px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors`}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-600 flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>}
    </div>
  ));

  const Textarea = React.forwardRef(({ label, error, required, helpText, ...props }, ref) => (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        ref={ref}
        {...props}
        className={`w-full rounded-lg border ${
          error ? 'border-red-300' : 'border-gray-300'
        } px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors resize-none`}
      />
      {helpText && !error && <p className="text-xs text-gray-500">{helpText}</p>}
      {error && <p className="text-xs text-red-600 flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>}
    </div>
  ));

  /* ---------------- render ---------------- */

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/admin')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                type="button"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                <p className="text-sm text-gray-500 mt-0.5">Update product information</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {selectedProduct && !selectedProduct.deleted && (
                <button
                  type="button"
                  onClick={() => setOpenModal(true)}
                  className="px-4 py-2 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 font-medium transition-colors text-sm"
                >
                  Delete Product
                </button>
              )}
              
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors text-sm"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                form="product-form"
                disabled={isSubmitting}
                className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Updating...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update Product
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <form id="product-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Section title="Basic Information" subtitle="Essential product details">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Input
                  label="Product Name"
                  required
                  {...register('title', { 
                    required: 'Product name is required',
                    minLength: { value: 3, message: 'Name must be at least 3 characters' }
                  })}
                  error={errors.title?.message}
                  placeholder="e.g., Premium Cotton T-Shirt"
                />

                <Textarea
                  label="Description"
                  required
                  rows={5}
                  {...register('description', { 
                    required: 'Description is required',
                    minLength: { value: 10, message: 'Description must be at least 10 characters' }
                  })}
                  error={errors.description?.message}
                  helpText="Provide a detailed description of the product"
                  placeholder="Describe the product features, materials, and benefits..."
                />

                <div className="grid sm:grid-cols-2 gap-6">
                  <Select
                    label="Brand"
                    required
                    {...register('brand', { required: 'Brand is required' })}
                    error={errors.brand?.message}
                  >
                    <option value="">Select a brand</option>
                    {brands.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </Select>

                  <Select
                    label="Category"
                    required
                    {...register('category', { required: 'Category is required' })}
                    error={errors.category?.message}
                  >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Thumbnail Preview */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Preview
                </label>
                <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden">
                  {thumbnailUrl ? (
                    <img 
                      src={thumbnailUrl} 
                      alt="Product preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.querySelector('.placeholder-content')?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`placeholder-content flex flex-col items-center justify-center p-6 text-center ${thumbnailUrl ? 'hidden' : ''}`}>
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs text-gray-500">Enter thumbnail URL to see preview</p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Pricing & Inventory */}
          <Section title="Pricing & Inventory" subtitle="Set pricing and stock levels">
            <div className="grid sm:grid-cols-3 gap-6">
              <Input
                label="Price"
                type="number"
                required
                step="0.01"
                min="0"
                {...register('price', { 
                  required: 'Price is required',
                  min: { value: 0.01, message: 'Price must be greater than 0' }
                })}
                error={errors.price?.message}
                placeholder="0.00"
                helpText="Base price in your currency"
              />
              
              <Input
                label="Discount Percentage"
                type="number"
                step="1"
                min="0"
                max="99"
                {...register('discountPercentage', {
                  min: { value: 0, message: 'Discount cannot be negative' },
                  max: { value: 99, message: 'Discount cannot exceed 99%' }
                })}
                error={errors.discountPercentage?.message}
                placeholder="0"
                helpText="0-99%"
              />
              
              <Input
                label="Stock Quantity"
                type="number"
                required
                min="0"
                {...register('stock', { 
                  required: 'Stock quantity is required',
                  min: { value: 0, message: 'Stock cannot be negative' }
                })}
                error={errors.stock?.message}
                placeholder="0"
                helpText="Available quantity"
              />
            </div>
          </Section>

          {/* Product Images */}
          <Section title="Product Images" subtitle="Add product photos (URL links)">
            <div className="grid sm:grid-cols-2 gap-6">
              <Input 
                label="Thumbnail Image" 
                required
                {...register('thumbnail', { required: 'Thumbnail is required' })}
                error={errors.thumbnail?.message}
                placeholder="https://example.com/image.jpg"
                helpText="Main product image (required)"
              />
              <Input 
                label="Image 1" 
                {...register('image1')}
                placeholder="https://example.com/image1.jpg"
                helpText="Additional product view"
              />
              <Input 
                label="Image 2" 
                {...register('image2')}
                placeholder="https://example.com/image2.jpg"
                helpText="Additional product view"
              />
              <Input 
                label="Image 3" 
                {...register('image3')}
                placeholder="https://example.com/image3.jpg"
                helpText="Additional product view"
              />
            </div>
          </Section>

          {/* Product Variants */}
          <Section title="Product Variants" subtitle="Select available colors and sizes">
            {/* Colors */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Available Colors</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {colors.map((c) => (
                  <label
                    key={c.id}
                    className="relative flex items-center gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all hover:border-indigo-300 hover:bg-indigo-50 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50"
                  >
                    <input
                      type="checkbox"
                      value={c.id}
                      {...register('colors')}
                      className="sr-only"
                    />
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-sm font-medium text-gray-700">{c.name}</span>
                    <svg className="absolute top-2 right-2 w-5 h-5 text-indigo-600 opacity-0 has-[:checked]:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </label>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Available Sizes</p>
              <div className="flex flex-wrap gap-3">
                {sizes.map((s) => (
                  <label
                    key={s.id}
                    className="relative px-6 py-2.5 rounded-lg border-2 cursor-pointer transition-all hover:border-indigo-300 hover:bg-indigo-50 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 has-[:checked]:font-semibold min-w-[80px] text-center"
                  >
                    <input
                      type="checkbox"
                      value={s.id}
                      {...register('sizes')}
                      className="sr-only"
                    />
                    <span className="text-sm text-gray-700">{s.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </Section>

          {/* Product Highlights */}
          <Section title="Product Highlights" subtitle="Key features and benefits (optional)">
            <div className="grid sm:grid-cols-2 gap-6">
              <Input 
                label="Highlight 1" 
                {...register('highlight1')}
                placeholder="e.g., 100% organic cotton"
              />
              <Input 
                label="Highlight 2" 
                {...register('highlight2')}
                placeholder="e.g., Machine washable"
              />
              <Input 
                label="Highlight 3" 
                {...register('highlight3')}
                placeholder="e.g., Eco-friendly dyes"
              />
              <Input 
                label="Highlight 4" 
                {...register('highlight4')}
                placeholder="e.g., Free shipping"
              />
            </div>
          </Section>
        </form>
      </div>

      {/* Delete Confirmation Modal */}
      {selectedProduct && (
        <Modal
          title={`Delete ${selectedProduct.title}?`}
          message="This action cannot be undone. The product will be marked as deleted and hidden from customers."
          dangerOption="Delete Product"
          cancelOption="Cancel"
          dangerAction={handleDelete}
          cancelAction={() => setOpenModal(false)}
          showModal={openModal}
        />
      )}
    </div>
  );
}

export default EditProduct;