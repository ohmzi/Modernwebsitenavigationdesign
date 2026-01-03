import { Navigation } from './components/Navigation';
import { MobileNavigation } from './components/MobileNavigation';
import { HeroSection } from './components/HeroSection';
import { Solution } from './components/Solution';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="lg:hidden">
        <MobileNavigation />
      </div>
      {/* <HeroSection /> */}
      <Solution />
    </div>
  );
}