import { Link } from 'react-router-dom';
import { 
  PlusCircleIcon, 
  BookOpenIcon, 
  HeartIcon,
  ArrowPathIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import useAppStore from '../store';

export default function Home() {
  const { 
    currentRecommendation, 
    generateRandomRecommendation, 
    incrementCookCount,
    addToMyDishes,
    getUserDishByDishId,
    getDishStats
  } = useAppStore();
  
  const stats = getDishStats();
  
  const handleRandomRecommendation = () => {
    generateRandomRecommendation();
  };
  
  const handleCookThis = () => {
    if (currentRecommendation) {
      incrementCookCount(currentRecommendation.dish.id);
      // 如果还没有添加到我的菜品，则自动添加
      const userDish = getUserDishByDishId(currentRecommendation.dish.id);
      if (!userDish) {
        addToMyDishes(currentRecommendation.dish.id);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* 欢迎区域 */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">今天吃什么？</h1>
        <p className="text-gray-600">让选择变得简单，让用餐更有惊喜</p>
      </div>
      
      {/* 随机推荐区域 */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          {currentRecommendation ? (
            <div className="space-y-6">
              <div className="relative">
                <img 
                  src={currentRecommendation.dish.image || '/placeholder-dish.jpg'} 
                  alt={currentRecommendation.dish.name}
                  className="w-48 h-48 mx-auto rounded-2xl object-cover shadow-md"
                />
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentRecommendation.reason}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentRecommendation.dish.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {currentRecommendation.dish.description}
                </p>
                
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-1">
                    <span className="text-lg">{currentRecommendation.dish.category.icon}</span>
                    <span>{currentRecommendation.dish.category.name}</span>
                  </div>
                  {currentRecommendation.dish.cooking_time && (
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{currentRecommendation.dish.cooking_time}分钟</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      currentRecommendation.dish.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      currentRecommendation.dish.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentRecommendation.dish.difficulty === 'easy' ? '简单' :
                       currentRecommendation.dish.difficulty === 'medium' ? '中等' : '困难'}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={handleCookThis}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
                  >
                    就做这个！
                  </button>
                  <button 
                    onClick={handleRandomRecommendation}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
                  >
                    <ArrowPathIcon className="w-4 h-4" />
                    <span>换一个</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-6xl">🍽️</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">开始你的美食之旅</h2>
                <button 
                  onClick={handleRandomRecommendation}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105"
                >
                  随机推荐
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 统计信息 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.total_dishes}</div>
          <div className="text-sm text-gray-600">总菜品数</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.favorite_dishes}</div>
          <div className="text-sm text-gray-600">收藏菜品</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.categories_count}</div>
          <div className="text-sm text-gray-600">菜品分类</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.recent_additions.length}</div>
          <div className="text-sm text-gray-600">最近添加</div>
        </div>
      </div>
      
      {/* 快速操作 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          to="/manage"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-105 group"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
              <PlusCircleIcon className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">添加菜品</h3>
            <p className="text-gray-600 text-sm">创建属于你的专属菜谱</p>
          </div>
        </Link>
        
        <Link 
          to="/library"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-105 group"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <BookOpenIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">菜品库</h3>
            <p className="text-gray-600 text-sm">浏览丰富的菜品资源</p>
          </div>
        </Link>
        
        <Link 
          to="/my-dishes"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-105 group"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <HeartIcon className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">我的菜品</h3>
            <p className="text-gray-600 text-sm">管理你的收藏和记录</p>
          </div>
        </Link>
      </div>
      
      {/* 最常做的菜品 */}
      {stats.most_cooked_dish && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <StarIcon className="w-5 h-5 text-yellow-500" />
            <span>最常做的菜品</span>
          </h3>
          <div className="flex items-center space-x-4">
            <img 
              src={stats.most_cooked_dish.image || '/placeholder-dish.jpg'} 
              alt={stats.most_cooked_dish.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-medium text-gray-900">{stats.most_cooked_dish.name}</h4>
              <p className="text-sm text-gray-600">{stats.most_cooked_dish.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}