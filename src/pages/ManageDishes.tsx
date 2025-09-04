import { useState, useRef } from 'react';
import { 
  PhotoIcon, 
  PlusIcon,
  XMarkIcon,
  ClockIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import useAppStore from '../store';
import type { DishFormData } from '../types';

export default function ManageDishes() {
  const { categories, addDish } = useAppStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<DishFormData>({
    name: '',
    description: '',
    category_id: '',
    image: '',
    ingredients: [],
    cooking_time: undefined,
    difficulty: 'easy',
    instructions: '',
    tags: []
  });
  
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (field: keyof DishFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleAddIngredient = () => {
    if (currentIngredient.trim() && !formData.ingredients.includes(currentIngredient.trim())) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, currentIngredient.trim()]
      }));
      setCurrentIngredient('');
    }
  };
  
  const handleRemoveIngredient = (ingredient: string) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(i => i !== ingredient)
    }));
  };
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 在实际应用中，这里应该上传到服务器或云存储
      // 现在我们使用本地预览
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.category_id) {
      alert('请填写菜品名称和选择分类');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      addDish({
        name: formData.name.trim(),
        description: formData.description.trim(),
        category_id: formData.category_id,
        image: formData.image,
        ingredients: formData.ingredients,
        cooking_time: formData.cooking_time,
        difficulty: formData.difficulty,
        instructions: formData.instructions.trim(),
        tags: formData.tags,
        is_preset: false
      });
      
      // 重置表单
      setFormData({
        name: '',
        description: '',
        category_id: '',
        image: '',
        ingredients: [],
        cooking_time: undefined,
        difficulty: 'easy',
        instructions: '',
        tags: []
      });
      setImagePreview('');
      setCurrentIngredient('');
      
      alert('菜品添加成功！');
    } catch (error) {
      alert('添加失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">添加新菜品</h1>
        <p className="text-gray-600">创建属于你的专属菜谱</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 菜品图片 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            菜品图片
          </label>
          
          <div className="flex flex-col items-center">
            {imagePreview ? (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="预览" 
                  className="w-48 h-48 rounded-xl object-cover shadow-md"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview('');
                    setFormData(prev => ({ ...prev, image: '' }));
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div 
                onClick={triggerImageUpload}
                className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors"
              >
                <PhotoIcon className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">点击上传图片</span>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            {!imagePreview && (
              <button
                type="button"
                onClick={triggerImageUpload}
                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                选择图片
              </button>
            )}
          </div>
        </div>
        
        {/* 基本信息 */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              菜品名称 *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="请输入菜品名称"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              菜品描述
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="简单描述这道菜的特色..."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                菜品分类 *
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => handleInputChange('category_id', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                <option value="">选择分类</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ClockIcon className="w-4 h-4 inline mr-1" />
                制作时间（分钟）
              </label>
              <input
                type="number"
                value={formData.cooking_time || ''}
                onChange={(e) => handleInputChange('cooking_time', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="30"
                min="1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SparklesIcon className="w-4 h-4 inline mr-1" />
                难度等级
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => handleInputChange('difficulty', e.target.value as 'easy' | 'medium' | 'hard')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="easy">简单</option>
                <option value="medium">中等</option>
                <option value="hard">困难</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* 食材清单 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">食材清单</h3>
          
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddIngredient())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="输入食材名称"
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-1"
            >
              <PlusIcon className="w-4 h-4" />
              <span>添加</span>
            </button>
          </div>
          
          {formData.ingredients.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                >
                  <span>{ingredient}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(ingredient)}
                    className="text-orange-600 hover:text-orange-800"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* 制作步骤 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">制作步骤</h3>
          <textarea
            value={formData.instructions}
            onChange={(e) => handleInputChange('instructions', e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="详细描述制作步骤...\n\n例如：\n1. 准备食材，洗净切好\n2. 热锅下油，爆香蒜蓉\n3. 下主料炒制..."
          />
        </div>
        
        {/* 提交按钮 */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => {
              setFormData({
                name: '',
                description: '',
                category_id: '',
                image: '',
                ingredients: [],
                cooking_time: undefined,
                difficulty: 'easy',
                instructions: '',
                tags: []
              });
              setImagePreview('');
              setCurrentIngredient('');
            }}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            重置
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? '添加中...' : '添加菜品'}
          </button>
        </div>
      </form>
    </div>
  );
}