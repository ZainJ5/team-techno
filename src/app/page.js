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
      
      {/* Features Section */}
      <section className="py-20" id="expertise">
        <div className="container mx-auto px-4">
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
      
      <section className="py-20 bg-gradient-to-r from-black to-red-900" id="contact">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center">Get In Touch</h2>
            <p className="text-xl mb-10 text-center text-gray-300">
              Interested in sponsorship, collaboration, or joining our team? Reach out to us!
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
      
    </main>
  );
}