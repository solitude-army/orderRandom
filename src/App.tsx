import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import useAppStore from './store';
import Layout from './components/Layout';
import Home from './pages/Home';
import ManageDishes from './pages/ManageDishes';
import DishLibrary from './pages/DishLibrary';
import MyDishes from './pages/MyDishes';
import { initializeData } from './utils/initData';

function App() {
  const { setDishes, setCategories, setUserDishes } = useAppStore();

  useEffect(() => {
    // 初始化预设数据
    const { dishes, categories, userDishes } = initializeData();
    setDishes(dishes);
    setCategories(categories);
    setUserDishes(userDishes);
  }, [setDishes, setCategories, setUserDishes]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manage" element={<ManageDishes />} />
          <Route path="/library" element={<DishLibrary />} />
          <Route path="/my-dishes" element={<MyDishes />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
