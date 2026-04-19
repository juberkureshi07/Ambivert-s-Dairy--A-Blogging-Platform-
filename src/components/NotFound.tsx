import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, Compass } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative mb-8 select-none">
          <span className="text-[140px] font-black text-gray-100 leading-none tracking-tighter">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-900 bg-white shadow-xl px-6 py-2 rounded-2xl transform rotate-3">
              Oops!
            </span>
          </div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Page Not Found
        </h2>
        <p className="text-gray-500 max-w-sm mb-12 mx-auto leading-relaxed">
          The page you're searching for seems to have drifted away. It might have been deleted or moved to a different part of the diary.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 group"
          >
            <Home size={20} className="mr-2 group-hover:-translate-y-0.5 transition-transform" />
            Back to Home
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95 group"
          >
            <Compass size={20} className="mr-2 group-hover:rotate-12 transition-transform" />
            Discover Posts
          </Link>
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/4 -z-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-1/4 right-1/4 -z-10 w-48 h-48 bg-purple-50 rounded-full blur-3xl opacity-60"></div>
    </div>
  );
};
