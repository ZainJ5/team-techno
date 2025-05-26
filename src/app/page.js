import { Inter } from 'next/font/google';
import Hero from './components/Hero';
import FeatureCard from './components/FeatureCard';
import TeamMemberCard from './components/TeamMember';
import ContactForm from './components/ContactForm';
import Achievements from './components/Achievements';
import Image from 'next/image';
import AboutUs from './components/AboutUs';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`${inter.className} bg-black text-white min-h-screen`}>
      <Hero 
        title="Engineering Tomorrow's Champions" 
        subtitle="Innovation. Precision. Excellence."
      />
      
      <AboutUs/>
      
      <section className="py-20 bg-[#060608] relative overflow-hidden" id="expertise">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-2/5 h-2/5 bg-red-800/8 blur-[180px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-rose-900/8 blur-[150px] rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-1/4 h-1/4 bg-blue-600/2 blur-[120px] rounded-full"></div>
          
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-[0.02]"></div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#060608] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/2 via-transparent to-rose-600/2"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-16 text-red-600">Our Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="cog"
              title="Advanced Engineering"
              description="Custom mechanical systems designed for precision, durability, and competitive performance."
            />
            <FeatureCard 
              icon="chip"
              title="Intelligent Systems"
              description="State-of-the-art programming and AI implementation for autonomous operations."
            />
            <FeatureCard 
              icon="lightning"
              title="Rapid Prototyping"
              description="Efficient design-to-implementation workflow with cutting-edge fabrication technologies."
            />
          </div>
        </div>
      </section>
      
      <Achievements />

      <TeamMemberCard/>
      
      <section className="py-20 bg-[#060608] relative overflow-hidden" id="contact">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-2/5 h-2/5 bg-red-800/4 blur-[180px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-rose-900/4 blur-[150px] rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-1/4 h-1/4 bg-blue-600/1 blur-[120px] rounded-full"></div>
          
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-[0.005]"></div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#060608] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/0.5 via-transparent to-rose-600/0.5"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden opacity-20 z-0">
          <div className="absolute h-[25rem] w-[25rem] md:h-[30rem] md:w-[30rem] rounded-full bg-red-600/10 blur-3xl -top-20 -right-20 animate-pulse" style={{ animationDuration: '10s' }}></div>
          <div className="absolute h-[25rem] w-[25rem] md:h-[30rem] md:w-[30rem] rounded-full bg-rose-600/8 blur-3xl -bottom-20 -left-20 animate-pulse" style={{ animationDuration: '12s', animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Touch</span>
              </h2>
              <p className="text-xl mb-10 text-center text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Interested in sponsorship, collaboration, or joining our team? Reach out to us!
              </p>
              <div className="flex justify-center">
                <div className="w-28 h-1.5 bg-gradient-to-r from-red-500 to-red-700 rounded-full"></div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
      
    </main>
  );
}