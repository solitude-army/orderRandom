import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  PlusIcon, 
  BookOpenIcon, 
  HeartIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon,
  PlusCircleIcon 
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid, 
  PlusCircleIcon as PlusCircleIconSolid, 
  BookOpenIcon as BookOpenIconSolid, 
  HeartIcon as HeartIconSolid 
} from '@heroicons/react/24/solid';

interface LayoutProps {
  children: ReactNode;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  activeIcon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    path: '/',
    label: '首页',
    icon: HomeIcon,
    activeIcon: HomeIconSolid,
  },
  {
    path: '/manage',
    label: '添加菜品',
    icon: PlusCircleIcon,
    activeIcon: PlusCircleIconSolid,
  },
  {
    path: '/library',
    label: '菜品库',
    icon: BookOpenIcon,
    activeIcon: BookOpenIconSolid,
  },
  {
    path: '/my-dishes',
    label: '我的菜品',
    icon: HeartIcon,
    activeIcon: HeartIconSolid,
  },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <UserIcon className="w-8 h-8 text-orange-600" />
              <h1 className="text-xl font-bold text-gray-900">随机点菜系统</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = isActive ? item.activeIcon : item.icon;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-orange-100 shadow-lg">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = isActive ? item.activeIcon : item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'text-orange-600'
                    : 'text-gray-600'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Bottom Padding */}
      <div className="md:hidden h-20"></div>
    </div>
  );
}