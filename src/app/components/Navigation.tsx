import { useState } from 'react';
import { Search, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavItem {
  label: string;
  dropdown?: string[];
}

const navItems: NavItem[] = [
  { 
    label: 'Overview',
    dropdown: ['Company', 'Team', 'Careers', 'News']
  },
  { 
    label: 'Solution',
    dropdown: ['For Business', 'For Individuals', 'For Developers', 'Enterprise']
  },
  { 
    label: 'Service',
    dropdown: ['Lab Space', 'Build a Lab', 'Innovation Facilitation', 'Office Space']
  }
];

export function Navigation() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* Search backdrop - closes search when clicked */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 z-40"
          />
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-50 justify-center pt-8">
        {/* Curved Cutout Container */}
        <div className="relative">
          {/* Main dark glassy overlay with curved bottom */}
          <div className="relative px-12 pt-6 pb-12">
            {/* Backdrop blur overlay with smooth curved bottom */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden"
                 style={{
                   borderRadius: '3rem 3rem 50% 50%'
                 }} 
            />
            
            {/* Navigation content */}
            <div className="relative flex items-center gap-8">
              {/* Logo */}
              <div className="flex items-center gap-2 mr-8">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  {/* Screen/Monitor */}
                  <rect x="3" y="4" width="18" height="13" rx="2" fill="none" stroke="#facc15" strokeWidth="2"/>
                  <path d="M8 20h8M12 17v3" stroke="#facc15" strokeWidth="2" strokeLinecap="round"/>
                  {/* Magnifying Glass */}
                  <circle cx="10" cy="10" r="3" fill="none" stroke="#facc15" strokeWidth="1.5"/>
                  <path d="M12.5 12.5L15 15" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="text-white text-lg font-semibold tracking-tight">Immaculaterr</span>
              </div>

              {/* Navigation Items */}
              <div className="flex items-center gap-1">
                {navItems.map((item, index) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <button className="relative px-5 py-2.5 text-sm text-white/90 hover:text-white transition-all duration-300 rounded-2xl overflow-hidden group">
                      {/* Glassy button background */}
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl border border-white/10" />
                      <span className="relative z-10">{item.label}</span>
                    </button>

                    {/* Dropdown Card */}
                    <AnimatePresence>
                      {hoveredIndex === index && item.dropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 min-w-[220px] rounded-2xl overflow-hidden shadow-2xl"
                        >
                          <div className="bg-white/95 backdrop-blur-xl border border-white/20 p-2">
                            {item.dropdown.map((subItem, subIndex) => (
                              <button
                                key={subIndex}
                                className="w-full text-left px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                              >
                                {subItem}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Right side buttons */}
              <div className="flex items-center gap-3 ml-8 overflow-visible">
                <div className="relative flex items-center">
                  {/* Search bar that slides open */}
                  <AnimatePresence>
                    {isSearchOpen && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 200, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ 
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className="overflow-hidden mr-1"
                      >
                        <input
                          type="text"
                          placeholder="Search..."
                          autoFocus
                          className="w-full px-4 py-2 text-sm text-white placeholder-white/60 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 focus:outline-none focus:border-white/40 transition-colors"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <motion.button
                    animate={{ x: isSearchOpen ? 0 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="p-2.5 text-white/80 hover:text-white transition-colors duration-300 rounded-full hover:bg-white/10 backdrop-blur-sm relative z-10"
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                  >
                    <Search size={20} />
                  </motion.button>
                </div>
                
                <button 
                  className="px-5 py-2.5 text-sm text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 border border-white/20"
                >
                  Help
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}