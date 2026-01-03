import { Settings2, Zap, Cloud, Shield, Save, RefreshCw, Database, Bell } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Solution() {
  const [radarrEnabled, setRadarrEnabled] = useState(true);
  const [sonarrEnabled, setSonarrEnabled] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0f] text-white overflow-hidden font-sans">
       {/* Background Image with Purple Overlay */}
       <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlcnMlMjB3YWxsJTIwZGlhZ29uYWx8ZW58MXx8fHwxNzY3MzY5MDYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2e1065]/90 via-[#1e1b4b]/95 to-[#0f172a]/90 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 lg:px-8 max-w-6xl pt-32">
        {/* Header - Fun Theme */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#facc15] rounded-2xl -rotate-6 shadow-[0_0_20px_rgba(250,204,21,0.4)] border-2 border-white/10 hover:rotate-0 transition-transform duration-300">
                <Settings2 className="w-8 h-8 text-black" strokeWidth={2.5} />
              </div>
              <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-white drop-shadow-xl">
                Command Center
              </h1>
            </div>
            <p className="text-purple-200/70 text-lg font-medium max-w-lg leading-relaxed ml-1">
              Tweak, tune, and <span className="text-[#facc15] font-bold">turbocharge</span> your setup.
              <br/>
              <span className="text-sm opacity-60 font-normal">Remember: With great power comes great uptime.</span>
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white rounded-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button className="bg-[#facc15] text-black hover:bg-[#facc15]/90 rounded-full font-bold px-8 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full space-y-8">
          <TabsList className="bg-white/5 border border-white/10 p-1 rounded-full w-full sm:w-auto overflow-x-auto justify-start">
            <TabsTrigger value="general" className="rounded-full px-6 py-2.5 data-[state=active]:bg-[#facc15] data-[state=active]:text-black text-purple-200">General</TabsTrigger>
            <TabsTrigger value="library" className="rounded-full px-6 py-2.5 data-[state=active]:bg-[#facc15] data-[state=active]:text-black text-purple-200">Library</TabsTrigger>
            <TabsTrigger value="connections" className="rounded-full px-6 py-2.5 data-[state=active]:bg-[#facc15] data-[state=active]:text-black text-purple-200">Connections</TabsTrigger>
            <TabsTrigger value="danger" className="rounded-full px-6 py-2.5 data-[state=active]:bg-red-500 data-[state=active]:text-white text-purple-200">Danger Zone</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Identity Card */}
              <div className="rounded-3xl border border-white/10 bg-[#1a1625]/60 backdrop-blur-md p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Server Identity</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-gray-400 text-xs uppercase tracking-wider font-bold">Server Name</Label>
                    <Input defaultValue="Immaculaterr Prime" className="bg-black/20 border-white/10 text-white h-12 rounded-xl focus-visible:ring-[#facc15]" />
                    <p className="text-xs text-gray-500">The cool name your friends will see.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-gray-400 text-xs uppercase tracking-wider font-bold">Public URL</Label>
                    <div className="flex gap-2">
                      <span className="flex items-center justify-center px-4 bg-white/5 border border-white/10 rounded-xl text-gray-400 font-mono text-sm">https://</span>
                      <Input defaultValue="media.immaculaterr.com" className="bg-black/20 border-white/10 text-white h-12 rounded-xl focus-visible:ring-[#facc15] font-mono text-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Card */}
              <div className="rounded-3xl border border-white/10 bg-[#1a1625]/60 backdrop-blur-md p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-300 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Performance</h3>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-white">Turbo Fetch</Label>
                      <p className="text-sm text-gray-400">Aggressively cache metadata.</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-[#facc15]" defaultChecked />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label className="text-gray-400 text-xs uppercase tracking-wider font-bold">Scan Interval</Label>
                      <span className="text-[#facc15] text-xs font-mono">15 min</span>
                    </div>
                    <Slider defaultValue={[15]} max={120} step={5} className="py-2" />
                    <p className="text-xs text-gray-500 text-right">Lower impact on CPU, higher impact on patience.</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-white">Debug Mode</Label>
                      <p className="text-sm text-gray-400">Log everything. And we mean everything.</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-purple-500" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="connections" className="space-y-6">
             <div className="grid grid-cols-1 gap-6">
              <div className="rounded-3xl border border-white/10 bg-[#1a1625]/60 backdrop-blur-md p-8 shadow-xl">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300">
                      <Cloud className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white">External Services</h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Radarr Card */}
                    <div className={`space-y-0 p-6 rounded-2xl border transition-all duration-300 ${radarrEnabled ? 'bg-black/20 border-white/5' : 'bg-black/10 border-white/5 opacity-75'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-white">Radarr</h4>
                          <Badge className={`${radarrEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-gray-400'} transition-colors`}>
                            {radarrEnabled ? 'Active' : 'Disabled'}
                          </Badge>
                        </div>
                        <Switch 
                          checked={radarrEnabled} 
                          onCheckedChange={setRadarrEnabled}
                          className="data-[state=checked]:bg-emerald-500" 
                        />
                      </div>
                      
                      <AnimatePresence initial={false}>
                        {radarrEnabled && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 space-y-6">
                              <div className="space-y-3">
                                <Label className="text-gray-400 text-xs">API Key</Label>
                                <Input type="password" value="••••••••••••••••••••" className="bg-black/40 border-white/10 text-gray-400 font-mono text-sm" readOnly />
                              </div>
                              <div className="space-y-3">
                                <Label className="text-gray-400 text-xs">Host</Label>
                                <Input value="192.168.1.5:7878" className="bg-black/40 border-white/10 text-gray-400 font-mono text-sm" readOnly />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Sonarr Card */}
                    <div className={`space-y-0 p-6 rounded-2xl border transition-all duration-300 ${sonarrEnabled ? 'bg-black/20 border-white/5' : 'bg-black/10 border-white/5 opacity-75'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-white">Sonarr</h4>
                          <Badge className={`${sonarrEnabled ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-400'} transition-colors`}>
                            {sonarrEnabled ? 'Active' : 'Disabled'}
                          </Badge>
                        </div>
                        <Switch 
                          checked={sonarrEnabled} 
                          onCheckedChange={setSonarrEnabled}
                          className="data-[state=checked]:bg-blue-500" 
                        />
                      </div>

                      <AnimatePresence initial={false}>
                        {sonarrEnabled && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 space-y-6">
                              <div className="space-y-3">
                                <Label className="text-gray-400 text-xs">API Key</Label>
                                <Input placeholder="Enter API Key" className="bg-black/40 border-white/10 text-white font-mono text-sm focus-visible:ring-[#facc15]" />
                              </div>
                              <div className="space-y-3">
                                <Label className="text-gray-400 text-xs">Host</Label>
                                <Input placeholder="http://localhost:8989" className="bg-black/40 border-white/10 text-white font-mono text-sm focus-visible:ring-[#facc15]" />
                              </div>
                              <Button className="w-full bg-white/10 hover:bg-white/20 text-white">Test Connection</Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
              </div>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}