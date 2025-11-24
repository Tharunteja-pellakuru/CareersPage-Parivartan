import React, { useState } from 'react';
import { ArrowRight, Code, Palette, Rocket, Star, Users, Video, MapPin, Trophy, Car, CheckCircle, Mail, Phone, Leaf, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import ApplicationModal from '../components/ApplicationModal';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToStory = () => {
    const element = document.getElementById('story');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-in fade-in duration-700 selection:bg-brand-100 selection:text-brand-900">
      
      {/* Hero Section */}
      <section className="relative bg-white pt-28 pb-32 overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
         
         {/* Animated Background Blobs */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute top-[-20%] right-[-5%] w-[600px] h-[600px] bg-brand-100/50 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-float"></div>
             <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-float-delayed"></div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="flex justify-center items-center gap-2 text-sm font-bold text-brand-500 mb-8 animate-fade-in-up tracking-wider uppercase">
               <span className="px-3 py-1 bg-brand-50 rounded-full border border-brand-100 flex items-center gap-2">
                 <Rocket size={14} /> Vision-Perfect Concepts. Pixel-Perfect Designs.
               </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 tracking-tight mb-8 animate-fade-in-up font-heading leading-[1.1]">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-400">Change.</span> <br/>
              Build the <span className="text-slate-800">Future.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 animate-fade-in-up font-light leading-relaxed text-center" style={{ animationDelay: '0.2s' }}>
              Parivartan means change. At eParivartan, we don't just adapt to change—we create it. Join our team of passionate designers, developers, and digital strategists.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
               <Link to="/positions" className="bg-brand-500 hover:bg-brand-600 text-white px-10 py-4 rounded-lg font-bold transition-all shadow-xl hover:shadow-brand-500/40 hover:-translate-y-1 flex items-center justify-center gap-2 group text-lg">
                  View Open Positions <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </Link>
               <button onClick={scrollToStory} className="bg-white text-slate-800 border border-slate-200 hover:border-brand-500 px-10 py-4 rounded-lg font-bold transition-all shadow-sm hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 text-lg">
                  Our Story
               </button>
            </div>

            {/* Stats Row */}
            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                {[
                   { icon: <Trophy className="h-6 w-6" />, value: "20+", label: "Years of Excellence" },
                   { icon: <CheckCircle className="h-6 w-6" />, value: "5.0K+", label: "Projects Delivered" },
                   { icon: <Star className="h-6 w-6" />, value: "4.8/5", label: "Client Rating" },
                   { icon: <Users className="h-6 w-6" />, value: "30+", label: "Team Members" },
                ].map((stat, idx) => (
                   <div key={idx} className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col items-center hover:-translate-y-2 group">
                      <div className="mb-5 mt-2 p-4 bg-brand-50 rounded-full text-brand-500 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">{stat.icon}</div>
                      <div className="text-3xl font-bold text-slate-900 font-heading">{stat.value}</div>
                      <div className="text-sm text-slate-500 font-medium mt-2 mb-5">{stat.label}</div>
                   </div>
                ))}
            </div>
         </div>
      </section>

      {/* Our Story / Timeline Section */}
      <section id="story" className="py-28 bg-slate-50">
         <div className="text-center mb-20 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-heading">Our Story</h2>
            <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">From a Dining Room to Digital Excellence</p>
         </div>
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
               {/* Vertical Line */}
               <div className="absolute left-[2.25rem] md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-slate-200"></div>

               {/* Items */}
               {[
                 { year: "2002", title: "The Beginning", desc: "Started in Anand's dining room with just 2 computers and a dream to deliver pixel-perfect designs.", side: "right" },
                 { year: "2006", title: "First Office", desc: "After 4 years of growth, moved into our first proper office space in Hyderabad.", side: "left" },
                 { year: "2010s", title: "Expansion", desc: "Grew to serve diverse industries: retail, healthcare, IT, education, hospitality, finance, and government sectors.", side: "right" },
                 { year: "2025", title: "Prestigious Achievement", desc: "Official Website Design and Backend Technology Partner for ESTIC 2025 (Department of Science & Technology), inaugurated by Hon'ble PM Shri Narendra Modi.", side: "left" },
               ].map((item, idx) => (
                 <div key={idx} className={`relative flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16 ${item.side === 'left' ? 'md:flex-row-reverse' : ''} group`}>
                    {/* Empty spacer for desktop layout to balance flex */}
                    <div className="hidden md:block w-5/12"></div>

                    {/* Badge */}
                    <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-brand-500 border-[6px] border-white z-10 text-white text-sm font-bold shadow-lg group-hover:scale-125 transition-transform duration-300 font-heading top-0 md:top-1/2 md:-translate-y-1/2">
                       {item.year}
                    </div>

                    {/* Content Card */}
                    <div className="w-full md:w-5/12 pl-24 md:pl-0 pt-2 md:pt-0 text-left">
                        <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 hover:border-brand-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                           <h3 className="text-xl font-bold text-brand-500 mb-3 font-heading">{item.title}</h3>
                           <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Leadership Section */}
      <section className="py-28 bg-white relative overflow-hidden">
         {/* Background Decorations */}
         <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl"></div>
         <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Meet Our Leadership</h2>
               <p className="text-slate-500 text-lg">The passionate minds driving innovation at eParivartan</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Leader Cards */}
                {[
                  { name: "Anand Pohankar", role: "CEO & Founder", quote: "Just being different might not be original, but being original ensures being different.", imgColor: "bg-brand-500" },
                  { name: "Chaitanya Nagulapalli", role: "Chief Technology Officer", quote: "There is no great genius without a mixture of madness. - Aristotle", imgColor: "bg-brand-500" },
                  { name: "Jagruti Pohankar", role: "Head Client Relations", quote: "Empathy allows us to understand our clients not just as businesses, but as people with dreams.", imgColor: "bg-brand-400" },
                ].map((leader, i) => (
                    <div key={i} className="bg-slate-50 rounded-3xl p-10 text-center shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group">
                        <div className={`w-24 h-24 mx-auto ${leader.imgColor} rounded-full flex items-center justify-center text-white text-4xl font-bold mb-6 shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform duration-300`}>
                            {leader.name.charAt(0)}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 font-heading">{leader.name}</h3>
                        <p className="text-brand-500 font-semibold mb-8 uppercase tracking-wide text-xs mt-2">{leader.role}</p>
                        <div className="relative">
                             <span className="absolute -top-4 left-0 text-4xl text-brand-200 opacity-50">"</span>
                             <p className="text-slate-600 italic leading-relaxed px-4">{leader.quote}</p>
                             <span className="absolute -bottom-4 right-0 text-4xl text-brand-200 opacity-50">"</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Team Categories */}
      <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">Our Expertise</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { icon: <Palette size={36} />, title: "Design", desc: "Graphic Designers, UI/UX, Strategists" },
                    { icon: <Code size={36} />, title: "Development", desc: "Web, Mobile App, CMS Specialists" },
                    { icon: <Rocket size={36} />, title: "Marketing", desc: "Social Media, SEO, Performance" },
                    { icon: <Video size={36} />, title: "Production", desc: "Video Editors, Animators, Specialists" },
                ].map((team, idx) => (
                    <div key={idx} className="p-8 rounded-2xl bg-white border border-slate-100 hover:border-brand-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center group">
                        <div className="w-20 h-20 mx-auto bg-brand-50 rounded-2xl rotate-3 flex items-center justify-center text-brand-500 shadow-sm mb-6 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                            {team.icon}
                        </div>
                        <h3 className="font-bold text-xl text-slate-900 mb-3 font-heading">{team.title}</h3>
                        <p className="text-sm text-slate-500 group-hover:text-slate-600 transition-colors leading-relaxed">{team.desc}</p>
                    </div>
                ))}
             </div>
          </div>
      </section>

      {/* Location Section */}
      <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">Our Location</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="bg-slate-50 p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-brand-100 rounded-full text-brand-500">
                           <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                           <h3 className="text-2xl font-bold text-slate-900 font-heading">Hyderabad Office</h3>
                           <p className="text-brand-500 font-medium">Headquarters</p>
                        </div>
                    </div>
                    <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                        <strong>Parivartan Software & Multimedia Pvt. Ltd.</strong><br/>
                        Situated in a prime locality in Hyderabad, Telangana, our office is designed to foster creativity and collaboration.
                    </p>
                    <ul className="space-y-5">
                        {[
                            { icon: <Users size={20}/>, text: "Modern collaborative work areas" },
                            { icon: <Car size={20}/>, text: "Easy public transport access" },
                            { icon: <Coffee size={20}/>, text: "Surrounded by cafes & amenities" },
                            { icon: <CheckCircle size={20}/>, text: "Ample parking facilities" }
                        ].map((itm, i) => (
                            <li key={i} className="flex items-center gap-4 text-slate-700 font-medium">
                                <span className="text-brand-500 bg-brand-50 p-1.5 rounded-full">{itm.icon}</span>
                                {itm.text}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-slate-100 rounded-3xl flex items-center justify-center h-[400px] relative overflow-hidden shadow-inner border border-slate-200">
                     {/* Placeholder for Map */}
                     <div className="text-center z-10 relative">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-float">
                           <MapPin className="h-10 w-10 text-brand-500" />
                        </div>
                        <p className="font-bold text-lg text-slate-600">Map Integration</p>
                        <p className="text-sm text-slate-400">Hyderabad, Telangana</p>
                     </div>
                     
                     {/* Decorative Circles */}
                     <div className="absolute inset-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-brand-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-brand-500/10 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                     </div>
                </div>
            </div>
          </div>
      </section>

       {/* CTA */}
       <section className="py-28 bg-brand-500 text-center relative overflow-hidden">
          {/* CTA Background Effects */}
          <div className="absolute top-0 left-0 w-full h-full">
             <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float mix-blend-overlay"></div>
             <div className="absolute bottom-20 right-20 w-64 h-64 bg-white/5 rounded-full animate-float-delayed mix-blend-overlay"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/30 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-float backdrop-blur-sm border border-white/20">
                  <Leaf className="text-white h-8 w-8" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-heading">Ready to Create Change?</h2>
              <p className="text-brand-50 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                  Join Team Parivartan and build your career with a company that values innovation, creativity, and growth.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-5">
                  <Link to="/positions" className="bg-white text-brand-700 hover:bg-brand-50 px-10 py-4 rounded-lg font-bold transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2 text-lg">
                      View Open Positions
                  </Link>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-brand-600/50 text-white border border-white/30 hover:bg-brand-600 px-10 py-4 rounded-lg font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg backdrop-blur-sm cursor-pointer"
                    aria-label="Apply General Application"
                  >
                      <Mail size={20} /> General Application
                  </button>
              </div>
          </div>
       </section>
       
       {/* Contact Info */}
       <section className="py-16 bg-white border-b border-slate-100">
           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
               <div className="p-8 hover:bg-slate-50 rounded-2xl transition-all group">
                   <div className="w-12 h-12 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-brand-500 mb-4 group-hover:bg-brand-500 group-hover:text-white transition-colors"><Mail /></div>
                   <h4 className="font-bold text-lg text-slate-900 mb-1 font-heading">Email Us</h4>
                   <p className="text-slate-500">careers@eparivartan.com</p>
               </div>
               <div className="p-8 border-l border-r border-slate-100 hover:bg-slate-50 rounded-2xl transition-all group">
                   <div className="w-12 h-12 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-brand-500 mb-4 group-hover:bg-brand-500 group-hover:text-white transition-colors"><Phone /></div>
                   <h4 className="font-bold text-lg text-slate-900 mb-1 font-heading">Call Us</h4>
                   <p className="text-slate-500">+91 XXXX XXXXXX</p>
               </div>
               <div className="p-8 hover:bg-slate-50 rounded-2xl transition-all group">
                   <div className="w-12 h-12 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-brand-500 mb-4 group-hover:bg-brand-500 group-hover:text-white transition-colors"><Users /></div>
                   <h4 className="font-bold text-lg text-slate-900 mb-1 font-heading">Connect</h4>
                   <p className="text-slate-500">Follow us on LinkedIn</p>
               </div>
           </div>
       </section>

       <ApplicationModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         positionTitle="General Application"
       />
    </div>
  );
};

export default Home;