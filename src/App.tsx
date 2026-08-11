import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Introduction } from '@/components/sections/Introduction';
import { Services } from '@/components/sections/Services';
import { GlobalNetwork } from '@/components/sections/GlobalNetwork';
import { Stats } from '@/components/sections/Stats';
import { WhyZorestia } from '@/components/sections/WhyZorestia';
import { Ecosystem } from '@/components/sections/Ecosystem';
import { Process } from '@/components/sections/Process';
import { Founder } from '@/components/sections/Founder';
import { Vision } from '@/components/sections/Vision';
import { FutureTech } from '@/components/sections/FutureTech';
import { CTA } from '@/components/sections/CTA';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Introduction />
        <Services />
        <GlobalNetwork />
        <Stats />
        <WhyZorestia />
        <Ecosystem />
        <Process />
        <Founder />
        <Vision />
        <FutureTech />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
