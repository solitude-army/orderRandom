import { create } from 'zustand';
import { 
  Dish, 
  Category, 
  UserDish, 
  FilterOptions, 
  SortOption, 
  RandomRecommendation,
  DishWithCategory,
  UserDishWithDetails,
  DishStats
} from '../types';

interface AppStore {
  // 数据状态
  dishes: Dish[];
  categories: Category[];
  userDishes: UserDish[];
  
  // UI状态
  loading: boolean;
  error: string | null;
  
  // 筛选和排序
  filters: FilterOptions;
  filterOptions: FilterOptions;
  searchQuery: string;
  sortBy: SortOption;
  
  // 随机推荐
  currentRecommendation: RandomRecommendation | null;
  recommendationHistory: RandomRecommendation[];
  
  // Actions - 基础数据操作
  setDishes: (dishes: Dish[]) => void;
  setCategories: (categories: Category[]) => void;
  setUserDishes: (userDishes: UserDish[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Actions - 菜品操作
  addDish: (dish: Omit<Dish, 'id' | 'created_at' | 'updated_at'>) => void;
  updateDish: (id: string, updates: Partial<Dish>) => void;
  deleteDish: (id: string) => void;
  
  // Actions - 用户菜品操作
  addToMyDishes: (dishId: string) => void;
  removeFromMyDishes: (dishId: string) => void;
  toggleFavorite: (dishId: string) => void;
  updateUserDish: (dishId: string, updates: Partial<UserDish>) => void;
  incrementCookCount: (dishId: string) => void;
  
  // Actions - 筛选和排序
  setFilters: (filters: Partial<FilterOptions>) => void;
  setFilterOptions: (filterOptions: Partial<FilterOptions>) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
  setSortBy: (sortBy: SortOption) => void;
  
  // Actions - 随机推荐
  generateRandomRecommendation: () => void;
  addToRecommendationHistory: (recommendation: RandomRecommendation) => void;
  clearRecommendationHistory: () => void;
  
  // Getters - 计算属性
  getFilteredDishes: () => DishWithCategory[];
  getMyDishes: () => UserDishWithDetails[];
  getFavoriteDishes: () => UserDishWithDetails[];
  getDishById: (id: string) => DishWithCategory | undefined;
  getUserDishByDishId: (dishId: string) => UserDish | undefined;
  getDishStats: () => DishStats;
  getDishesByCategory: (categoryId: string) => DishWithCategory[];
}

const useAppStore = create<AppStore>((set, get) => ({
  // 初始状态
  dishes: [],
  categories: [],
  userDishes: [],
  loading: false,
  error: null,
  filters: {},
  filterOptions: {},
  searchQuery: '',
  sortBy: 'name_asc',
  currentRecommendation: null,
  recommendationHistory: [],
  
  // 基础数据操作
  setDishes: (dishes) => set({ dishes }),
  setCategories: (categories) => set({ categories }),
  setUserDishes: (userDishes) => set({ userDishes }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  // 菜品操作
  addDish: (dishData) => {
    const newDish: Dish = {
      ...dishData,
      id: `dish_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    set((state) => ({ dishes: [...state.dishes, newDish] }));
  },
  
  updateDish: (id, updates) => {
    set((state) => ({
      dishes: state.dishes.map((dish) =>
        dish.id === id
          ? { ...dish, ...updates, updated_at: new Date().toISOString() }
          : dish
      ),
    }));
  },
  
  deleteDish: (id) => {
    set((state) => ({
      dishes: state.dishes.filter((dish) => dish.id !== id),
      userDishes: state.userDishes.filter((userDish) => userDish.dish_id !== id),
    }));
  },
  
  // 用户菜品操作
  addToMyDishes: (dishId) => {
    const existingUserDish = get().getUserDishByDishId(dishId);
    if (existingUserDish) return;
    
    const newUserDish: UserDish = {
      id: `user_dish_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      dish_id: dishId,
      is_favorite: false,
      cook_count: 0,
      added_at: new Date().toISOString(),
    };
    
    set((state) => ({ userDishes: [...state.userDishes, newUserDish] }));
  },
  
  removeFromMyDishes: (dishId) => {
    set((state) => ({
      userDishes: state.userDishes.filter((userDish) => userDish.dish_id !== dishId),
    }));
  },
  
  toggleFavorite: (dishId) => {
    set((state) => ({
      userDishes: state.userDishes.map((userDish) =>
        userDish.dish_id === dishId
          ? { ...userDish, is_favorite: !userDish.is_favorite }
          : userDish
      ),
    }));
  },
  
  updateUserDish: (dishId, updates) => {
    set((state) => ({
      userDishes: state.userDishes.map((userDish) =>
        userDish.dish_id === dishId ? { ...userDish, ...updates } : userDish
      ),
    }));
  },
  
  incrementCookCount: (dishId) => {
    set((state) => ({
      userDishes: state.userDishes.map((userDish) =>
        userDish.dish_id === dishId
          ? {
              ...userDish,
              cook_count: userDish.cook_count + 1,
              last_cooked: new Date().toISOString(),
            }
          : userDish
      ),
    }));
  },
  
  // 筛选和排序
  setFilters: (newFilters) => {
    set((state) => ({ filters: { ...state.filters, ...newFilters } }));
  },
  
  setFilterOptions: (newFilterOptions) => {
    set((state) => ({ filterOptions: { ...state.filterOptions, ...newFilterOptions } }));
  },
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  clearFilters: () => set({ filters: {}, filterOptions: {}, searchQuery: '' }),
  
  setSortBy: (sortBy) => set({ sortBy }),
  
  // 随机推荐
  generateRandomRecommendation: () => {
    const { dishes, categories, userDishes } = get();
    if (dishes.length === 0) return;
    
    // 优先推荐用户菜品库中的菜品
    const myDishIds = userDishes.map(ud => ud.dish_id);
    const availableDishes = myDishIds.length > 0 
      ? dishes.filter(dish => myDishIds.includes(dish.id))
      : dishes;
    
    const randomDish = availableDishes[Math.floor(Math.random() * availableDishes.length)];
    const category = categories.find(cat => cat.id === randomDish.category_id);
    
    if (randomDish && category) {
      const recommendation: RandomRecommendation = {
        dish: { ...randomDish, category },
        reason: myDishIds.includes(randomDish.id) ? '来自您的菜品库' : '系统推荐',
        timestamp: new Date().toISOString(),
      };
      
      set({ currentRecommendation: recommendation });
      get().addToRecommendationHistory(recommendation);
    }
  },
  
  addToRecommendationHistory: (recommendation) => {
    set((state) => ({
      recommendationHistory: [recommendation, ...state.recommendationHistory.slice(0, 9)], // 保留最近10条
    }));
  },
  
  clearRecommendationHistory: () => set({ recommendationHistory: [] }),
  
  // Getters
  getFilteredDishes: () => {
    const { dishes, categories, filters, sortBy } = get();
    
    let filtered = dishes.map(dish => {
      const category = categories.find(cat => cat.id === dish.category_id);
      return { ...dish, category: category! };
    }).filter(dish => dish.category);
    
    // 应用筛选条件
    if (filters.category_id) {
      filtered = filtered.filter(dish => dish.category_id === filters.category_id);
    }
    
    if (filters.difficulty) {
      filtered = filtered.filter(dish => dish.difficulty === filters.difficulty);
    }
    
    if (filters.cooking_time_max) {
      filtered = filtered.filter(dish => 
        !dish.cooking_time || dish.cooking_time <= filters.cooking_time_max!
      );
    }
    
    if (filters.search_query) {
      const query = filters.search_query.toLowerCase();
      filtered = filtered.filter(dish =>
        dish.name.toLowerCase().includes(query) ||
        dish.description?.toLowerCase().includes(query) ||
        dish.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // 应用排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'created_at_asc':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'created_at_desc':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'cooking_time_asc':
          return (a.cooking_time || 0) - (b.cooking_time || 0);
        case 'cooking_time_desc':
          return (b.cooking_time || 0) - (a.cooking_time || 0);
        default:
          return 0;
      }
    });
    
    return filtered;
  },
  
  getMyDishes: () => {
    const { userDishes, dishes, categories } = get();
    
    return userDishes.map(userDish => {
      const dish = dishes.find(d => d.id === userDish.dish_id);
      const category = categories.find(c => c.id === dish?.category_id);
      
      if (dish && category) {
        return {
          ...userDish,
          dish: { ...dish, category },
        };
      }
      return null;
    }).filter(Boolean) as UserDishWithDetails[];
  },
  
  getFavoriteDishes: () => {
    return get().getMyDishes().filter(userDish => userDish.is_favorite);
  },
  
  getDishById: (id) => {
    const { dishes, categories } = get();
    const dish = dishes.find(d => d.id === id);
    if (dish) {
      const category = categories.find(c => c.id === dish.category_id);
      if (category) {
        return { ...dish, category };
      }
    }
    return undefined;
  },
  
  getUserDishByDishId: (dishId) => {
    const { userDishes } = get();
    return userDishes.find(ud => ud.dish_id === dishId);
  },
  
  getDishStats: () => {
    const { dishes, userDishes, categories } = get();
    const myDishes = get().getMyDishes();
    
    const mostCookedDish = myDishes
      .sort((a, b) => b.cook_count - a.cook_count)[0]?.dish;
    
    const recentAdditions = myDishes
      .sort((a, b) => new Date(b.added_at).getTime() - new Date(a.added_at).getTime())
      .slice(0, 5)
      .map(ud => ud.dish);
    
    return {
      total_dishes: dishes.length,
      favorite_dishes: get().getFavoriteDishes().length,
      categories_count: categories.length,
      most_cooked_dish: mostCookedDish,
      recent_additions: recentAdditions,
    };
  },
  
  getDishesByCategory: (categoryId) => {
    return get().getFilteredDishes().filter(dish => dish.category_id === categoryId);
  },
}));

export default useAppStore;