// 菜品分类接口
export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

// 菜品接口
export interface Dish {
  id: string;
  name: string;
  description?: string;
  image?: string;
  category_id: string;
  tags?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  cooking_time?: number; // 分钟
  ingredients?: string[];
  instructions?: string;
  is_preset: boolean; // 是否为预设菜品
  created_at: string;
  updated_at: string;
}

// 用户菜品接口
export interface UserDish {
  id: string;
  dish_id: string;
  user_id?: string;
  is_favorite: boolean;
  personal_rating?: number; // 1-5星评分
  personal_notes?: string;
  last_cooked?: string;
  cook_count: number;
  added_at: string;
}

// 菜品详情（包含分类信息）
export interface DishWithCategory extends Dish {
  category: Category;
  is_custom?: boolean;
}

// 用户菜品详情（包含菜品和分类信息）
export interface UserDishWithDetails extends UserDish {
  dish: DishWithCategory;
}

// 随机推荐结果
export interface RandomRecommendation {
  dish: DishWithCategory;
  reason?: string; // 推荐理由
  timestamp: string;
}

// 筛选条件
export interface FilterOptions {
  category_id?: string;
  categories?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  difficulties?: ('easy' | 'medium' | 'hard')[];
  cooking_time_max?: number;
  cookingTimeRange?: [number, number];
  tags?: string[];
  search_query?: string;
  is_favorite?: boolean;
}

// 排序选项
export type SortOption = 
  | 'name_asc' 
  | 'name_desc' 
  | 'name'
  | 'created_at_asc' 
  | 'created_at_desc'
  | 'cooking_time_asc'
  | 'cooking_time_desc'
  | 'rating_desc';

// 页面路由类型
export type PageRoute = 
  | '/'
  | '/manage'
  | '/library'
  | '/my-dishes';

// 应用状态接口
export interface AppState {
  // 菜品相关
  dishes: Dish[];
  categories: Category[];
  userDishes: UserDish[];
  
  // UI状态
  loading: boolean;
  error: string | null;
  
  // 筛选和排序
  filters: FilterOptions;
  sortBy: SortOption;
  
  // 随机推荐
  currentRecommendation: RandomRecommendation | null;
  recommendationHistory: RandomRecommendation[];
}

// 表单数据接口
export interface DishFormData {
  name: string;
  description: string;
  category_id: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  cooking_time?: number;
  ingredients: string[];
  instructions: string;
  image?: string;
}

// API响应接口
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 统计数据接口
export interface DishStats {
  total_dishes: number;
  favorite_dishes: number;
  categories_count: number;
  most_cooked_dish?: DishWithCategory;
  recent_additions: DishWithCategory[];
}