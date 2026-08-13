import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Introduction } from '@/components/sections/Introduction';
import { Stats } from '@/components/sections/Stats';
import { Services } from '@/components/sections/Services';
import { GlobalNetwork } from '@/components/sections/GlobalNetwork';
import { WhyZorestia } from '@/components/sections/WhyZorestia';
import { Insights } from '@/components/sections/Insights';
import { Partners } from '@/components/sections/Partners';
import { CTA } from '@/components/sections/CTA';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { Ecosystem } from './components/sections/Ecosystem';
import { Process } from './components/sections/Process';
import { Founder } from './components/sections/Founder';
import { FutureTech } from './components/sections/FutureTech';


function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Introduction />
        <Stats />
        <Services />
        <GlobalNetwork />
        <WhyZorestia />
        <Ecosystem />
        <Process />
        <Insights />
        <Founder />
        <Partners />
        <FutureTech />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;