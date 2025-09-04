import { useState } from 'react';
import { 
  HeartIcon,
  TrashIcon,
  ClockIcon,
  PencilIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import useAppStore from '../store';
import type { UserDish } from '../types';

export default function MyDishes() {
  const { 
    userDishes,
    dishes,
    getMyDishes,
    removeFromMyDishes,
    toggleFavorite,
    incrementCookCount
  } = useAppStore();
  
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterTab, setFilterTab] = useState<'all' | 'favorites' | 'custom'>('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  const userDishesWithDetails = getMyDishes();
  
  // 根据筛选标签过滤菜品
  const filteredDishes = userDishesWithDetails.filter(dish => {
    switch (filterTab) {
      case 'favorites':
        return dish.is_favorite;
      case 'custom':
        return dish.dish.is_custom;
      default:
        return true;
    }
  });
  
  const handleSelectDish = (dishId: string) => {
    setSelectedDishes(prev => 
      prev.includes(dishId) 
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedDishes.length === filteredDishes.length) {
      setSelectedDishes([]);
    } else {
      setSelectedDishes(filteredDishes.map(dish => dish.dish_id));
    }
  };
  
  const handleBatchDelete = () => {
    selectedDishes.forEach(dishId => {
      removeFromMyDishes(dishId);
    });
    setSelectedDishes([]);
  };
  
  const handleBatchToggleFavorite = () => {
    selectedDishes.forEach(dishId => {
      toggleFavorite(dishId);
    });
    setSelectedDishes([]);
  };
  
  const handleDeleteDish = (dishId: string) => {
    removeFromMyDishes(dishId);
    setShowDeleteConfirm(null);
    setSelectedDishes(prev => prev.filter(id => id !== dishId));
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
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和统计 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">我的菜品库</h1>
          <p className="text-gray-600">管理你收藏和添加的菜品</p>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>共 {userDishesWithDetails.length} 道菜品</span>
          <span>收藏 {userDishesWithDetails.filter(d => d.is_favorite).length} 道</span>
        </div>
      </div>
      
      {/* 筛选标签和操作栏 */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* 筛选标签 */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterTab === 'all' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              全部 ({userDishesWithDetails.length})
            </button>
            <button
              onClick={() => setFilterTab('favorites')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterTab === 'favorites' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              收藏 ({userDishesWithDetails.filter(d => d.is_favorite).length})
            </button>
            <button
              onClick={() => setFilterTab('custom')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterTab === 'custom' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              自定义 ({userDishesWithDetails.filter(d => d.dish.is_custom).length})
            </button>
          </div>
          
          {/* 视图切换和批量操作 */}
          <div className="flex items-center space-x-3">
            {selectedDishes.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  已选择 {selectedDishes.length} 项
                </span>
                <button
                  onClick={handleBatchToggleFavorite}
                  className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
                  title="批量切换收藏"
                >
                  <HeartIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={handleBatchDelete}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  title="批量删除"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            )}
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="w-4 h-4 flex flex-col space-y-1">
                  <div className="h-0.5 bg-current rounded"></div>
                  <div className="h-0.5 bg-current rounded"></div>
                  <div className="h-0.5 bg-current rounded"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* 全选操作 */}
        {filteredDishes.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDishes.length === filteredDishes.length && filteredDishes.length > 0}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">全选</span>
            </label>
          </div>
        )}
      </div>
      
      {/* 菜品列表 */}
      {filteredDishes.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {filteredDishes.map(userDish => (
            <div 
              key={userDish.dish_id} 
              className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* 选择框 */}
              <div className="absolute top-3 left-3 z-10">
                <input
                  type="checkbox"
                  checked={selectedDishes.includes(userDish.dish_id)}
                  onChange={() => handleSelectDish(userDish.dish_id)}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 bg-white/80 backdrop-blur-sm"
                />
              </div>
              
              {/* 菜品图片 */}
              <div className={`relative ${viewMode === 'list' ? 'w-32 h-32' : 'h-48'}`}>
                <img 
                  src={userDish.dish.image || '/placeholder-dish.jpg'} 
                  alt={userDish.dish.name}
                  className="w-full h-full object-cover"
                />
                
                {/* 收藏按钮 */}
                <button
                  onClick={() => toggleFavorite(userDish.dish_id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  {userDish.is_favorite ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                
                {/* 自定义标签 */}
                {userDish.dish.is_custom && (
                  <div className="absolute bottom-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    自定义
                  </div>
                )}
              </div>
              
              {/* 菜品信息 */}
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{userDish.dish.name}</h3>
                  <div className="flex items-center space-x-1">
                    {userDish.dish.is_custom && (
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => setShowDeleteConfirm(userDish.dish_id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{userDish.dish.description}</p>
                
                {/* 菜品属性 */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-3">
                    {userDish.dish.cooking_time && (
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-3 h-3" />
                        <span>{userDish.dish.cooking_time}分钟</span>
                      </div>
                    )}
                    <span className={`px-2 py-1 rounded-full ${getDifficultyColor(userDish.dish.difficulty)}`}>
                      {getDifficultyText(userDish.dish.difficulty)}
                    </span>
                  </div>
                </div>
                
                {/* 统计信息 */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>制作了 {userDish.cook_count} 次</span>
                  <span>添加于 {formatDate(userDish.added_at)}</span>
                </div>
                
                {/* 操作按钮 */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => incrementCookCount(userDish.dish_id)}
                    className="flex-1 bg-orange-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                  >
                    制作这道菜
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors">
                    <EyeIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* 空状态 */
        <div className="text-center py-12">
          <div className="text-6xl mb-4">
            {filterTab === 'favorites' ? '💝' : filterTab === 'custom' ? '👨‍🍳' : '📝'}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filterTab === 'favorites' 
              ? '还没有收藏的菜品' 
              : filterTab === 'custom' 
              ? '还没有自定义菜品'
              : '还没有添加任何菜品'
            }
          </h3>
          <p className="text-gray-600 mb-4">
            {filterTab === 'favorites' 
              ? '去菜品库收藏一些喜欢的菜品吧' 
              : filterTab === 'custom' 
              ? '去菜品管理页面添加你的专属菜品'
              : '从菜品库添加菜品或创建自定义菜品'
            }
          </p>
        </div>
      )}
      
      {/* 删除确认对话框 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">确认删除</h3>
            <p className="text-gray-600 mb-4">确定要从我的菜品库中删除这道菜吗？</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => handleDeleteDish(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}