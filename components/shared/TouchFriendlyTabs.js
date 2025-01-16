import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function TouchFriendlyTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto hide-scrollbar mb-4">
        <div className="flex space-x-2 p-1">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`
                px-4 py-2 rounded-full whitespace-nowrap min-w-[100px]
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-colors duration-200
                ${activeTab === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        {tabs[activeTab].content}
      </motion.div>
    </div>
  );
}
