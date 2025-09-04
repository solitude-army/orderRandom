import { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  HeartIcon,
  ClockIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import useAppStore from '../store';
import type { SortOption } from '../types';

export default function DishLibrary() {
  const { 
    dishes, 
    categories, 
    userDishes,
    filterOptions,
    sortBy,
    searchQuery,
    getFilteredDishes,
    setSearchQuery,
    setFilterOptions,
    setSortBy,
    addToMyDishes,
    removeFromMyDishes,
    toggleFavorite,
    getUserDishByDishId
  } = useAppStore();
  
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredDishes = getFilteredDishes();
  
  const handleCategoryFilter = (categoryId: string) => {
    const newCategories = filterOptions.categories.includes(categoryId)
      ? filterOptions.categories.filter(id => id !== categoryId)
      : [...filterOptions.categories, categoryId];
    
    setFilterOptions({ ...filterOptions, categories: newCategories });
  };
  
  const handleDifficultyFilter = (difficulty: 'easy' | 'medium' | 'hard') => {
    const newDifficulties = filterOptions.difficulties.includes(difficulty)
      ? filterOptions.difficulties.filter(d => d !== difficulty)
      : [...filterOptions.difficulties, difficulty];
    
    setFilterOptions({ ...filterOptions, difficulties: newDifficulties });
  };
  
  const handleToggleFavorite = (dishId: string) => {
    const userDish = getUserDishByDishId(dishId);
    if (userDish) {
      // 如果已在我的菜品中，切换收藏状态
      toggleFavorite(dishId);
    } else {
      // 如果不在我的菜品中，先添加到我的菜品，然后设为收藏
      addToMyDishes(dishId);
      // 使用setTimeout确保添加操作完成后再切换收藏状态
      setTimeout(() => toggleFavorite(dishId), 0);
    }
  };
  
  const clearFilters = () => {
    setFilterOptions({
      categories: [],
      difficulties: [],
      cookingTimeRange: [0, 120]
    });
    setSearchQuery('');
    setSortBy('name');
  };
  
  const getDifficultyText = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return '简单';
      case 'medium': return '中等';
      case 'hard': return '困难';
    }
  };
  
  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">菜品库</h1>
          <p className="text-gray-600">发现更多美味菜品</p>
        </div>
        <div className="text-sm text-gray-500">
          共 {filteredDishes.length} 道菜品
        </div>
      </div>
      
      {/* 搜索和筛选 */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 搜索框 */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索菜品名称或食材..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          {/* 排序 */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="name">按名称排序</option>
            <option value="difficulty">按难度排序</option>
            <option value="cooking_time">按时间排序</option>
            <option value="created_at">按创建时间</option>
          </select>
          
          {/* 筛选按钮 */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              showFilters 
                ? 'bg-orange-50 border-orange-300 text-orange-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FunnelIcon className="w-4 h-4" />
            <span>筛选</span>
          </button>
        </div>
        
        {/* 筛选面板 */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 分类筛选 */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">菜品分类</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterOptions.categories.includes(category.id)}
                        onChange={() => handleCategoryFilter(category.id)}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">
                        {category.icon} {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* 难度筛选 */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">难度等级</h4>
                <div className="space-y-2">
                  {(['easy', 'medium', 'hard'] as const).map(difficulty => (
                    <label key={difficulty} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterOptions.difficulties.includes(difficulty)}
                        onChange={() => handleDifficultyFilter(difficulty)}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">
                        {getDifficultyText(difficulty)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* 制作时间 */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">制作时间</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      最长时间: {filterOptions.cookingTimeRange[1]} 分钟
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="120"
                      value={filterOptions.cookingTimeRange[1]}
                      onChange={(e) => setFilterOptions({
                        ...filterOptions,
                        cookingTimeRange: [filterOptions.cookingTimeRange[0], parseInt(e.target.value)]
                      })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* 清除筛选 */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                清除所有筛选
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* 菜品网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDishes.map(dish => {
          const userDish = getUserDishByDishId(dish.id);
          const isFavorite = userDish?.is_favorite || false;
          
          return (
            <div key={dish.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* 菜品图片 */}
              <div className="relative h-48">
                <img 
                  src={dish.image || '/placeholder-dish.jpg'} 
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleToggleFavorite(dish.id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                
                {/* 分类标签 */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                  {dish.category.icon} {dish.category.name}
                </div>
              </div>
              
              {/* 菜品信息 */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{dish.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{dish.description}</p>
                
                {/* 菜品属性 */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-3">
                    {dish.cooking_time && (
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-3 h-3" />
                        <span>{dish.cooking_time}分钟</span>
                      </div>
                    )}
                    <span className={`px-2 py-1 rounded-full ${getDifficultyColor(dish.difficulty)}`}>
                      {getDifficultyText(dish.difficulty)}
                    </span>
                  </div>
                </div>
                
                {/* 食材预览 */}
                {dish.ingredients.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">主要食材:</div>
                    <div className="flex flex-wrap gap-1">
                      {dish.ingredients.slice(0, 3).map((ingredient, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {ingredient}
                        </span>
                      ))}
                      {dish.ingredients.length > 3 && (
                        <span className="text-xs text-gray-400">+{dish.ingredients.length - 3}</span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* 操作按钮 */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      if (!userDish) {
                        addToMyDishes(dish.id);
                      }
                    }}
                    disabled={!!userDish}
                    className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      userDish 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span>{userDish ? '已添加' : '添加到我的菜品'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 空状态 */}
      {filteredDishes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到匹配的菜品</h3>
          <p className="text-gray-600 mb-4">试试调整搜索条件或筛选选项</p>
          <button
            onClick={clearFilters}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            清除筛选条件
          </button>
        </div>
      )}
    </div>
  );
}