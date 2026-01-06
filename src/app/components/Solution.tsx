import { Search, HelpCircle, Play, Terminal, RefreshCw, MonitorPlay, Zap, ArrowRight, Layout, CheckCircle2, Clock, RotateCw, Sparkles, Command, CalendarDays, ChevronRight, Activity, Radio, Signal, Film } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { cn } from "./ui/utils";
import { motion, AnimatePresence, useAnimation } from "motion/react";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { AnalogTimePicker } from "./AnalogTimePicker";

const RadarrIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3L19 12L5 21V3Z" fill="#facc15" stroke="#facc15" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

const SonarrIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="#0ea5e9" />
    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" fill="white" fillOpacity="0.2" />
    <circle cx="12" cy="12" r="2" fill="white" />
    <path d="M16.95 7.05a7 7 0 0 0-9.9 0" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M19.07 4.93a10 10 0 0 0-14.14 0" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

interface JobCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  defaultEnabled?: boolean;
  color?: string;
}

function JobCard({ title, description, icon, defaultEnabled = false, color = "text-yellow-400" }: JobCardProps) {
  const [enabled, setEnabled] = useState(defaultEnabled);
  const [isRunning, setIsRunning] = useState(false);
  const [frequency, setFrequency] = useState('daily');
  const [time, setTime] = useState("03:00");
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const controls = useAnimation();

  const handleCardClick = async () => {
    await controls.start({
      boxShadow: [
        "0 0 0px rgba(250, 204, 21, 0)",
        "0 0 30px rgba(250, 204, 21, 0.5)",
        "0 0 0px rgba(250, 204, 21, 0)",
        "0 0 30px rgba(250, 204, 21, 0.5)",
        "0 0 0px rgba(250, 204, 21, 0)",
        "0 0 30px rgba(250, 204, 21, 0.5)",
        "0 0 0px rgba(250, 204, 21, 0)"
      ],
      transition: { duration: 1.5, ease: "easeInOut" }
    });
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  };

  const formatTimeDisplay = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
  };

  return (
    <motion.div 
      layout
      animate={controls}
      onClick={handleCardClick}
      className="group relative overflow-hidden rounded-[32px] bg-[#1a1625]/60 backdrop-blur-xl border border-white/5 transition-all duration-300 hover:bg-[#1a1625]/80 cursor-pointer"
    >
      <div className="absolute top-0 right-0 p-32 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl rounded-full pointer-events-none" />
      
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center relative z-10">
        {/* Icon Box */}
        <div className={`w-16 h-16 rounded-2xl bg-[#0F0B15] border border-white/10 flex items-center justify-center shadow-inner shrink-0 ${color}`}>
          {icon}
        </div>

        <div className="flex-1 space-y-2 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-white tracking-tight truncate">{title}</h3>
            {enabled && (
               <Badge className="bg-emerald-500/20 text-emerald-400 border-0 px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold animate-in fade-in zoom-in duration-300 shrink-0">
                 Active
               </Badge>
            )}
          </div>
          <p className="text-gray-400 leading-relaxed font-medium text-sm md:text-base max-w-lg">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-4 self-end md:self-center w-full md:w-auto justify-between md:justify-end shrink-0">
           <div className="flex flex-col items-center gap-2">
             <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Auto-Run</span>
             <Switch 
              checked={enabled} 
              onCheckedChange={setEnabled}
              onClick={(e) => e.stopPropagation()}
              className="data-[state=checked]:bg-[#facc15] border-2 border-transparent data-[state=unchecked]:bg-[#2a2438] data-[state=unchecked]:border-white/10"
            />
           </div>
           
           <div className="w-px h-10 bg-white/5 hidden md:block" />

           <div className="flex gap-2">
             <Button 
              size="icon"
              variant="outline"
              onClick={(e) => e.stopPropagation()}
              className="w-12 h-12 rounded-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white transition-all hover:rotate-12"
              title="Dry Run"
            >
              <Terminal className="w-5 h-5" />
            </Button>
            <Button 
              onClick={(e) => { e.stopPropagation(); handleRun(); }}
              className={`h-12 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(250,204,21,0.2)] transition-all duration-300 overflow-hidden relative ${isRunning ? 'bg-emerald-500 text-white w-12 px-0' : 'bg-[#facc15] text-black w-32 px-6 hover:bg-[#facc15] hover:scale-105'}`}
            >
              <AnimatePresence mode="wait">
                {isRunning ? (
                   <motion.div
                    key="loading"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                   >
                     <RotateCw className="w-5 h-5 animate-spin" />
                   </motion.div>
                ) : (
                  <motion.div 
                    key="idle"
                    className="flex items-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                  >
                    <Play className="w-4 h-4 mr-2 fill-current" />
                    Run Now
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
           </div>
        </div>
      </div>

      {/* Scheduler Drawer */}
      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden bg-[#0F0B15]/30 border-t border-white/5"
          >
            <div className="p-6 md:p-8 pt-0">
               <div className="p-6 rounded-2xl bg-[#0F0B15]/50 border border-white/5 flex flex-col md:flex-row gap-8 md:items-center justify-between">
                  {/* Frequency Selector */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                      <CalendarDays className="w-3 h-3" />
                      Repeat
                    </label>
                    <div className="flex bg-[#1a1625] p-1 rounded-xl border border-white/5 w-fit" onClick={(e) => e.stopPropagation()}>
                      {['Daily', 'Weekly', 'Monthly'].map((freq) => (
                        <button
                          key={freq}
                          onClick={() => setFrequency(freq.toLowerCase())}
                          className={cn(
                            "px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300",
                            frequency === freq.toLowerCase() 
                              ? "bg-[#facc15] text-black shadow-lg shadow-yellow-500/20" 
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          )}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="w-px h-12 bg-white/5 hidden md:block" />

                  {/* Time Picker */}
                  <div className="space-y-3 flex-1 max-w-xs">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      Time
                    </label>
                    <Popover open={isTimePickerOpen} onOpenChange={setIsTimePickerOpen}>
                      <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <button className="relative group/input w-full">
                          <div className="w-full bg-[#1a1625] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono text-sm text-left focus:outline-none border-transparent ring-offset-0 focus:ring-1 focus:ring-[#facc15]/50 transition-all hover:bg-[#1a1625]/80">
                            {time}
                          </div>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover/input:text-[#facc15] transition-colors">
                            <ChevronRight className="w-4 h-4 rotate-90" />
                          </div>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-[#0F0B15] border-white/10 text-white shadow-2xl" align="center">
                         <AnalogTimePicker 
                            value={time} 
                            onChange={setTime} 
                            onClose={() => setIsTimePickerOpen(false)} 
                         />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="w-px h-12 bg-white/5 hidden md:block" />

                  {/* Next Run Info */}
                  <div className="flex items-center gap-4 bg-white/5 px-5 py-3 rounded-xl border border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Next Run</span>
                      <span className="text-sm font-mono text-emerald-400 font-medium">Tomorrow, {formatTimeDisplay(time)}</span>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500/50" />
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Progress/Status Bar Decorative */}
      {enabled && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#facc15]/50 to-transparent opacity-30 animate-pulse" />
      )}
    </motion.div>
  );
}

function FunSlider({ value, onChange, max = 100 }: { value: number, onChange: (val: number) => void, max?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    // Apply constraint
    const constrained = Math.min(percentage, max);
    onChange(constrained);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleMove(e.clientX);
      }
    };
    const onMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      onMouseDown={onMouseDown}
      className="relative h-16 w-full rounded-2xl bg-[#0F0B15] cursor-pointer overflow-visible border border-white/10 group select-none touch-none shadow-inner"
    >
        {/* Fill Bar (Released) - British Racing Green */}
        <div 
            className="absolute top-0 right-0 h-full rounded-r-2xl overflow-hidden shadow-[-4px_0_24px_rgba(0,0,0,0.5)] z-10"
            style={{ left: `${value}%`, transition: isDragging ? 'none' : 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
             {/* Gradient: Dark (Right) -> Light (Left/Knob) - Darker "British Racing Green" */}
             <div className="absolute inset-0 bg-gradient-to-l from-[#002010] via-[#064e3b] to-[#16a34a]" />
             
             {/* Dreamy clouds/noise texture - matching purple side */}
             <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
             
             {/* Pattern */}
             <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'right center' }}></div>
             
             {/* Inner Highlight */}
             <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />

             <div className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#bbf7d0] uppercase tracking-widest pointer-events-none whitespace-nowrap overflow-hidden drop-shadow-md">
               Released
             </div>
        </div>

        {/* Fill Bar (Upcoming) - Dreamy Purple */}
        <div 
            className="absolute top-0 left-0 h-full rounded-l-2xl overflow-hidden shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-10"
            style={{ width: `${value}%`, transition: isDragging ? 'none' : 'width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
             <div className="absolute inset-0 bg-gradient-to-r from-[#240046] via-[#7b2cbf] to-[#c77dff]" />
             
             {/* Dreamy clouds/noise texture */}
             <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
             
             {/* Pattern */}
             <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
             
             {/* Inner Highlight */}
             <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />

             <div className="absolute left-5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#e0aaff] uppercase tracking-widest pointer-events-none whitespace-nowrap overflow-hidden drop-shadow-md">
               Upcoming
             </div>
        </div>

        {/* The Handle / Separator Line - Hidden in favor of the big 3D knob, or kept subtle */}
        <div 
            className="absolute top-0 bottom-0 w-px bg-white/20 z-10"
            style={{ left: `${value}%`, transform: 'translateX(-50%)', transition: isDragging ? 'none' : 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />

        {/* 3D Floating Knob */}
        <div
            className="absolute top-1/2 -translate-y-1/2 z-30 pointer-events-none perspective-1000"
            style={{ left: `${value}%`, transform: 'translate(-50%, -50%)', transition: isDragging ? 'none' : 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
            <div className={cn(
              "relative bg-black/40 backdrop-blur-2xl backdrop-saturate-200 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ease-out border border-white/10",
              isDragging ? "w-14 h-14 shadow-[0_15px_30px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)] scale-110 -translate-y-2" : "w-12 h-12 shadow-[0_8px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] scale-100"
            )}>
                {/* Content */}
                <div className="flex flex-col items-center z-10">
                   <span className="text-xl font-black text-[#facc15] leading-none tracking-tighter drop-shadow-md">
                     {Math.round(value)}<span className="text-[10px] align-top opacity-70 ml-0.5">%</span>
                   </span>
                </div>
            </div>
        </div>
    </div>
  );
}

function RecommendationCard() {
  const [count, setCount] = useState(5);
  const [upcomingPercent, setUpcomingPercent] = useState(64);

  // Enforce max 75% for upcoming (at least 25% released)
  const handleSliderChange = (val: number) => {
    if (val <= 75) {
      setUpcomingPercent(val);
    }
  };

  const upcomingTarget = Math.round(count * (upcomingPercent / 100));
  const releasedTarget = count - upcomingTarget;

  return (
    <div className="group relative overflow-hidden rounded-[32px] bg-[#1a1625]/60 backdrop-blur-xl border border-white/5 p-6 md:p-8 transition-all duration-300 hover:bg-[#1a1625]/80">
       <div className="absolute top-0 right-0 p-32 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl rounded-full pointer-events-none" />

       {/* Header */}
       <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-[#0F0B15] border border-white/10 flex items-center justify-center shadow-inner shrink-0 text-purple-400">
             <Film className="w-6 h-6" />
          </div>
          <div>
             <h3 className="text-xl font-bold text-white tracking-tight">Recommendations</h3>
          </div>
       </div>

       <p className="text-gray-400 leading-relaxed font-medium text-sm md:text-base mb-8 max-w-3xl relative z-10">
         Controls how many recommendations are generated per run, plus how many are <span className="text-white font-bold">upcoming</span> vs already released. Released is always at least 25%.
       </p>

       <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-2 relative z-10">
          {/* Count Input */}
          <div className="md:col-span-4 space-y-3">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Recommendation Count</label>
             <div className="relative">
               <Input 
                 type="number" 
                 value={count} 
                 onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 0))}
                 className="bg-[#1a1625] border-white/10 h-12 text-lg font-mono text-white focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50"
               />
             </div>
             <p className="text-xs text-gray-500 leading-relaxed pt-2">
               Used by Immaculate Taste + Based on your recently watched movie.
             </p>
          </div>

          {/* Slider Section */}
          <div className="md:col-span-8 space-y-6">
             <div className="flex justify-between items-end">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Distribution Split</label>
             </div>
             
             <div className="py-2">
                <FunSlider 
                  value={upcomingPercent} 
                  max={75} 
                  onChange={handleSliderChange}
                />
             </div>

             <div className="flex gap-3 pt-1">
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-0 h-8 px-3 rounded-lg transition-all duration-300">
                   Released target: {releasedTarget}
                </Badge>
                <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border-0 h-8 px-3 rounded-lg transition-all duration-300">
                   Upcoming target: {upcomingTarget}
                </Badge>
             </div>
          </div>
       </div>
    </div>
  );
}

export function Solution() {
  return (
    <div className="relative min-h-screen w-full bg-[#0F0B15] text-white font-sans selection:bg-[#facc15] selection:text-black overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          alt="Abstract Background"
          className="w-full h-full object-cover opacity-20 mix-blend-color-dodge"
        />
        <div className="absolute inset-0 bg-[#0F0B15]/90" />
        
        {/* Animated Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-600/20 blur-[150px] rounded-full mix-blend-screen animate-pulse duration-1000" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-yellow-500/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      {/* Navbar */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex items-center justify-between px-2 py-2 bg-[#1a1625]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl"
        >
          <div className="flex items-center">
            <div className="flex items-center gap-3 pl-3 pr-6">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#facc15] shadow-[0_0_15px_rgba(250,204,21,0.4)]">
                 <Command className="w-5 h-5 text-black" />
              </div>
              <span className="font-bold text-white tracking-tight hidden sm:block">Immaculaterr</span>
            </div>

            <div className="hidden md:flex items-center bg-white/5 rounded-full p-1 border border-white/5">
              <button className="px-4 py-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10">Overview</button>
              <button className="px-4 py-1.5 text-xs font-bold text-[#facc15] bg-white/10 rounded-full shadow-sm">Jobs</button>
              <button className="px-4 py-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10">Logs</button>
            </div>
          </div>

          <div className="flex items-center gap-2 pr-2">
            <Button size="icon" variant="ghost" className="w-9 h-9 text-gray-400 hover:text-white hover:bg-white/5 rounded-full">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" className="w-9 h-9 text-gray-400 hover:text-white hover:bg-white/5 rounded-full p-0">
               <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border border-white/20" />
            </Button>
          </div>
        </motion.nav>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-36 pb-20 max-w-4xl">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-200">
              <Sparkles className="w-3 h-3 text-[#facc15]" />
              <span>System Status: All Systems Operational</span>
            </div>
            
            <div className="flex items-center gap-5">
              <div className="relative group">
                <div className="absolute inset-0 bg-[#facc15] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative p-3 md:p-4 bg-[#facc15] rounded-2xl -rotate-6 shadow-[0_0_30px_rgba(250,204,21,0.3)] border border-white/20 group-hover:rotate-0 transition-transform duration-300 ease-spring">
                  <Terminal className="w-8 h-8 md:w-10 md:h-10 text-black" strokeWidth={2.5} />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter drop-shadow-2xl">
                Engine Room
              </h1>
            </div>

            <p className="text-xl text-gray-400 font-medium max-w-lg leading-relaxed pl-1">
              Automate your media empire. <br/>
              <span className="text-white/60 text-sm">Schedule workflows, run diagnostics, and keep the lights on.</span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-2 items-end"
          >
             <div className="text-right">
                <div className="text-3xl font-mono font-bold text-white">14</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-bold">Jobs Executed Today</div>
             </div>
             <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[70%] bg-[#facc15]" />
             </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <JobCard 
              title="Radarr Indexer" 
              description="Scans for new movie releases, updates metadata, and synchronizes library with the central database."
              icon={<RadarrIcon className="w-8 h-8" />}
              color="text-[#facc15]"
              defaultEnabled={true}
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <RecommendationCard />
          </motion.div>


        </div>

        <div className="mt-20 flex justify-center">
          <div className="p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <button className="px-6 py-3 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all flex items-center gap-3 group">
              <Clock className="w-4 h-4 group-hover:text-[#facc15] transition-colors" />
              <span className="text-sm font-medium">View Execution History</span>
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
