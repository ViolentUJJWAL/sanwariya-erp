import React, { useState } from 'react';
import { X, Plus, Trash2, Tag, ImagePlus } from 'lucide-react';

const AddProductPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [label, setLabel] = useState('');
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [varieties, setVarieties] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 8 - images.length);
    
    const imagePromises = newImages.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(base64Images => {
      setImages(prev => [...prev, ...base64Images]);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleTagInput = (e) => {
    const value = e.target.value;
    if (value.endsWith(' ') && currentTag.trim()) {
      setTags(prev => [...prev, currentTag.trim()]);
      setCurrentTag('');
    } else {
      setCurrentTag(value);
    }
  };

  const removeTag = (index) => {
    setTags(prev => prev.filter((_, i) => i !== index));
  };

  const addVariety = () => {
    setVarieties(prev => [...prev, {
      additionalDesc: {
        weightInGrams: '',
        color: '',
        size: ''
      },
      stock: '',
      price: {
        mrp: '',
        sellingPrice: ''
      }
    }]);
  };

  const updateVariety = (index, field, value) => {
    const newVarieties = [...varieties];
    const keys = field.split('.');
    if (keys.length === 1) {
      newVarieties[index][field] = value;
    } else {
      newVarieties[index][keys[0]][keys[1]] = value;
    }
    setVarieties(newVarieties);
  };

  const removeVariety = (index) => {
    setVarieties(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement product submission logic
    console.log({
      title, description, category, label, 
      images, tags, varieties
    });
  };

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-4xl font-bold my-4 mb-4">Add New Product</h2>
        
        {/* Basic Product Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
            required
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home</option>
          </select>
        </div>

        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
          rows={4}
          required
        />

        <select
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
          required
        >
          <option value="">Select Label</option>
          <option value="best seller">Best Seller</option>
          <option value="people's choice">People's Choice</option>
          <option value="trending">Trending</option>
        </select>

        {/* Image Upload */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ImagePlus className="text-orange-600" />
            <label className="text-orange-600">Upload Images (Max 8)</label>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img 
                  src={image} 
                  alt={`Product ${index + 1}`} 
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            {images.length < 8 && (
              <label className="cursor-pointer">
                <div className="w-24 h-24 border-2 border-dashed border-orange-500 flex items-center justify-center rounded">
                  <Plus className="text-orange-700" />
                </div>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Tag className="text-orange-600" />
            <label className="text-orange-600">Add Tags</label>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            <input
              type="text"
              value={currentTag}
              onChange={handleTagInput}
              placeholder="Type tag and press space"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
            />
            {tags.map((tag, index) => (
              <div 
                key={index} 
                className="bg-orange-100 px-2 py-1 rounded flex items-center gap-1"
              >
                {tag}
                <button 
                  type="button" 
                  onClick={() => removeTag(index)}
                  className="text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Product Varieties */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Plus className="text-orange-600" />
              <label className="text-orange-600">Product Varieties</label>
            </div>
            <button
              type="button"
              onClick={addVariety}
              className="bg-orange-500 text-white px-3 py-1 rounded flex items-center gap-1"
            >
              <Plus size={16} /> Add Variety
            </button>
          </div>

          {varieties.map((variety, index) => (
            <div 
              key={index} 
              className="bg-orange-50 border border-orange-200 p-4 rounded mb-4 relative"
            >
              <button
                type="button"
                onClick={() => removeVariety(index)}
                className="absolute top-2 right-2 text-red-500"
              >
                <Trash2 size={20} />
              </button>
              <div className="grid md:grid-cols-3 gap-4 mr-4">
                <input
                  type="number"
                  placeholder="Weight (grams)"
                  value={variety.additionalDesc.weightInGrams}
                  onChange={(e) => updateVariety(index, 'additionalDesc.weightInGrams', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                />
                <input
                  type="text"
                  placeholder="Color"
                  value={variety.additionalDesc.color}
                  onChange={(e) => updateVariety(index, 'additionalDesc.color', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                />
                <input
                  type="text"
                  placeholder="Size"
                  value={variety.additionalDesc.size}
                  onChange={(e) => updateVariety(index, 'additionalDesc.size', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={variety.stock}
                  onChange={(e) => updateVariety(index, 'stock', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                />
                <input
                  type="number"
                  placeholder="MRP"
                  value={variety.price.mrp}
                  onChange={(e) => updateVariety(index, 'price.mrp', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                />
                <input
                  type="number"
                  placeholder="Selling Price"
                  value={variety.price.sellingPrice}
                  onChange={(e) => updateVariety(index, 'price.sellingPrice', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded hover:bg-orange-700 transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;