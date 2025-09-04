import { Dish, Category, UserDish } from '../types';

// 预设分类数据
const categories: Category[] = [
  {
    id: 'cat_1',
    name: '家常菜',
    description: '日常家庭料理',
    icon: '🏠',
  },
  {
    id: 'cat_2',
    name: '川菜',
    description: '麻辣鲜香的川式料理',
    icon: '🌶️',
  },
  {
    id: 'cat_3',
    name: '粤菜',
    description: '清淡鲜美的广式料理',
    icon: '🦐',
  },
  {
    id: 'cat_4',
    name: '素食',
    description: '健康营养的素食料理',
    icon: '🥬',
  },
  {
    id: 'cat_5',
    name: '汤品',
    description: '营养滋补的汤类',
    icon: '🍲',
  },
  {
    id: 'cat_6',
    name: '面食',
    description: '各式面条和面点',
    icon: '🍜',
  },
];

// 预设菜品数据
const dishes: Dish[] = [
  // 家常菜
  {
    id: 'dish_1',
    name: '红烧肉',
    description: '肥瘦相间，软糯香甜的经典家常菜',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=braised%20pork%20belly%20in%20brown%20sauce%2C%20glossy%20red%20color%2C%20appetizing%20food%20photography&image_size=square',
    category_id: 'cat_1',
    tags: ['甜味', '下饭菜', '节日菜'],
    difficulty: 'medium',
    cooking_time: 90,
    ingredients: ['五花肉', '生抽', '老抽', '冰糖', '料酒', '葱', '姜'],
    is_preset: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'dish_2',
    name: '番茄鸡蛋',
    description: '酸甜开胃，营养丰富的经典搭配',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=tomato%20scrambled%20eggs%2C%20bright%20red%20tomatoes%20and%20fluffy%20yellow%20eggs%2C%20home%20cooking%20style&image_size=square',
    category_id: 'cat_1',
    tags: ['酸甜', '快手菜', '营养'],
    difficulty: 'easy',
    cooking_time: 15,
    ingredients: ['鸡蛋', '番茄', '糖', '盐', '葱花'],
    is_preset: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'dish_3',
    name: '土豆丝',
    description: '爽脆可口的经典素菜',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=stir%20fried%20potato%20shreds%2C%20golden%20crispy%20thin%20strips%2C%20Chinese%20home%20cooking&image_size=square',
    category_id: 'cat_1',
    tags: ['爽脆', '素菜', '下饭'],
    difficulty: 'easy',
    cooking_time: 20,
    ingredients: ['土豆', '青椒', '醋', '生抽', '蒜'],
    is_preset: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  
  // 川菜
  {
    id: 'dish_4',
    name: '麻婆豆腐',
    description: '麻辣鲜香，嫩滑爽口的经典川菜',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=mapo%20tofu%2C%20spicy%20red%20sauce%20with%20white%20tofu%20cubes%2C%20Sichuan%20cuisine%20style&image_size=square',
    category_id: 'cat_2',
    tags: ['麻辣', '嫩滑', '经典'],
    difficulty: 'medium',
    cooking_time: 25,
    ingredients: ['嫩豆腐', '牛肉末', '豆瓣酱', '花椒', '葱花'],
    is_preset: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'dish_5',
    name: '宫保鸡丁',
    description: '酸甜微辣，花生香脆的宫廷名菜',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=kung%20pao%20chicken%2C%20diced%20chicken%20with%20peanuts%20and%20dried%20chilies%2C%20glossy%20sauce&image_size=square',
    category_id: 'cat_2',
    tags: ['酸甜', '微辣', '花生'],
    difficulty: 'medium',
    cooking_time: 30,
    ingredients: ['鸡胸肉', '花生米', '干辣椒', '花椒', '葱白'],
    is_preset: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  
  // 粤菜
  {
    id: 'dish_6',
    name: '白切鸡',
    description: '鲜嫩清香，原汁原味的粤式经典',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=white%20cut%20chicken%2C%20tender%20sliced%20chicken%20with%20ginger%20scallion%20sauce%2C%20Cantonese%20style&image_size=square',
    category_id: 'cat_3',
    tags: ['清淡', '鲜嫩', '原味'],
    difficulty: 'medium',
    cooking_time: 45,
    ingredients: ['土鸡', '姜', '葱', '料酒', '盐'],
    is_preset: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'dish_7',
    name: '蒜蓉蒸扇贝',
    description: '鲜美嫩滑，蒜香浓郁的海鲜佳肴',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=steamed%20scallops%20with%20garlic%2C%20fresh%20shellfish%20with%20minced%20garlic%20and%20green%20onions&image_size=square',
    category_id: 'cat_3',
    tags: ['鲜美', '蒜香', '海鲜'],
    difficulty: 'easy',
    cooking_time: 20,
    ingredients: ['扇贝', '蒜蓉', '粉丝', '蒸鱼豉油', '葱花'],
    is_preset: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  
  // 素食
  {
    id: 'dish_8',
    name: '地三鲜',
    description: '茄子、土豆、青椒的经典组合',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=di%20san%20xian%2C%20fried%20eggplant%20potato%20and%20green%20pepper%2C%20glossy%20brown%20sauce&image_size=square',
    category_id: 'cat_4',
    tags: ['素食', '下饭', '经典'],
    difficulty: 'medium',
    cooking_time: 35,
    ingredients: ['茄子', '土豆', '青椒', '生抽', '糖'],
    is_preset: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  
  // 汤品
  {
    id: 'dish_9',
    name: '冬瓜排骨汤',
    description: '清淡滋补，去火降燥的养生汤品',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=winter%20melon%20and%20pork%20rib%20soup%2C%20clear%20broth%20with%20tender%20meat%20and%20translucent%20melon&image_size=square',
    category_id: 'cat_5',
    tags: ['清淡', '滋补', '去火'],
    difficulty: 'easy',
    cooking_time: 60,
    ingredients: ['冬瓜', '排骨', '姜片', '盐', '胡椒粉'],
    is_preset: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  
  // 面食
  {
    id: 'dish_10',
    name: '西红柿鸡蛋面',
    description: '酸甜开胃的经典面条',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=tomato%20egg%20noodles%2C%20fresh%20noodles%20in%20red%20tomato%20broth%20with%20scrambled%20eggs&image_size=square',
    category_id: 'cat_6',
    tags: ['酸甜', '面条', '快手'],
    difficulty: 'easy',
    cooking_time: 20,
    ingredients: ['挂面', '番茄', '鸡蛋', '葱花', '盐'],
    is_preset: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

// 预设用户菜品数据（示例用户已添加的菜品）
const userDishes: UserDish[] = [
  {
    id: 'user_dish_1',
    dish_id: 'dish_1',
    is_favorite: true,
    personal_rating: 5,
    personal_notes: '家里人都很喜欢，甜度刚好',
    last_cooked: '2024-01-15T00:00:00Z',
    cook_count: 3,
    added_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user_dish_2',
    dish_id: 'dish_2',
    is_favorite: true,
    personal_rating: 4,
    cook_count: 5,
    added_at: '2024-01-02T00:00:00Z',
  },
  {
    id: 'user_dish_3',
    dish_id: 'dish_4',
    is_favorite: false,
    personal_rating: 4,
    personal_notes: '有点辣，下次少放点辣椒',
    cook_count: 1,
    added_at: '2024-01-10T00:00:00Z',
  },
];

export function initializeData() {
  return {
    dishes,
    categories,
    userDishes,
  };
}