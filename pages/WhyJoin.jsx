import React, { useState } from 'react';
import { BookOpen, Briefcase, Gift, TrendingUp, Users, Zap, ChevronDown, ChevronUp } from 'lucide-react';

// Import CheckCircle locally for the benefits list
import { CheckCircle } from 'lucide-react';

const WhyJoin = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "Do you hire freshers?", a: "Yes, we hire freshers who demonstrate strong potential, a learning attitude, and basic skills in their respective fields. We provide mentorship to help you grow." },
    { q: "Is remote work available?", a: "Our culture thrives on collaboration. While we are primarily office-based to foster teamwork, we offer flexible hybrid options for senior roles or specific circumstances." },
    { q: "What's the work culture like?", a: "We are a family. We work hard, play hard, and treat everyone with respect. No corporate politics, just passion for quality work." },
    { q: "What technologies do you work with?", a: "We work across the stack: React, Node.js, PHP, WordPress, native mobile apps, Adobe Creative Suite, Figma, and more." },
    { q: "How long is the hiring process?", a: "Typically 2-3 weeks from application to offer. We respect your time and try to move as fast as possible." },
    { q: "Do you provide training?", a: "Absolutely. We believe in continuous learning. You will have access to courses, mentorship, and paid time for skill development." },
  ];

  return (
    <div className="bg-white animate-in fade-in duration-500">
       
       {/* Header */}
       <div className="py-24 text-center bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]"></div>
          <div className="relative z-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 animate-fade-in-up font-heading">Why Join Team Parivartan?</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.1s' }}>Discover what makes eParivartan the perfect place to grow your career.</p>
            <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}></div>
          </div>
       </div>

       {/* Philosophy & Uniqueness */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
           {[
             { icon: <Zap />, title: "The Parivartan Philosophy", bg: "bg-brand-500", items: ["\"Parivartan\" means change for the better", "We love to take risks and push boundaries", "Constant evolution with everlasting vigor", "Not bound by job titles, united by passion"] },
             { icon: <Users />, title: "What Makes Us Unique", bg: "bg-blue-500", items: ["Boutique studio environment (not a corporate factory)", "Direct exposure to leadership team", "Work on diverse, high-impact projects", "From startups to established enterprises"] },
             { icon: <TrendingUp />, title: "Growth & Learning", bg: "bg-purple-500", items: ["20 years of industry expertise to learn from", "Work with latest technologies", "Exposure to full project lifecycle", "Mentorship from experienced leadership team"] },
             { icon: <BookOpen />, title: "Creative Freedom", bg: "bg-pink-500", items: ["Encouraged to experiment with latest technologies", "\"We believe in change and that is what we deliver\"", "Design-first culture with pixel-perfect standards"] }
           ].map((card, i) => (
             <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                 <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform shadow-lg`}>{card.icon}</div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-6 font-heading">{card.title}</h3>
                 <ul className="space-y-4 text-base text-slate-600">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex gap-3 items-start">
                          <span className="mt-1 h-1.5 w-1.5 bg-brand-500 rounded-full flex-shrink-0"></span> 
                          <span>{item}</span>
                      </li>
                    ))}
                 </ul>
             </div>
           ))}
       </div>

       {/* Benefits Grid Title */}
       <div className="text-center py-16 bg-slate-50">
           <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-heading">Benefits & Perks</h2>
           <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full"></div>
       </div>

       {/* Benefits Grid */}
       <div className="bg-slate-50 pb-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
             {[
                 { title: "Professional Growth", icon: <BookOpen className="text-brand-500 h-8 w-8"/>, items: ["Work on 5000+ types of projects", "Diverse industry exposure", "Latest technology experimentation", "Learning from 20-year expertise"] },
                 { title: "Work Environment", icon: <Briefcase className="text-brand-500 h-8 w-8"/>, items: ["Boutique studio setting", "Prime Hyderabad location", "Collaborative atmosphere", "Direct access to leadership"] },
                 { title: "Project Exposure", icon: <Zap className="text-brand-500 h-8 w-8"/>, items: ["Government projects (ESTIC 2025)", "Corporate clients (BCG, HDFC)", "Celebrity clients", "Startups and enterprise solutions"] },
                 { title: "Additional Benefits", icon: <Gift className="text-brand-500 h-8 w-8"/>, items: ["Competitive salary", "Health insurance", "Professional development budget", "Team outings and celebrations"] },
             ].map((benefit, idx) => (
                 <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 border border-slate-200 group">
                     <div className="mb-6 p-4 bg-brand-50 rounded-2xl w-fit group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
                        {/* We clone the element to change color on hover via CSS if needed, or just rely on parent group hover */}
                        <div className="group-hover:text-white transition-colors duration-300">{benefit.icon}</div>
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-6 font-heading">{benefit.title}</h3>
                     <ul className="space-y-3">
                         {benefit.items.map((it, i) => (
                             <li key={i} className="text-slate-600 flex items-center gap-3">
                                 <CheckCircle className="h-4 w-4 text-brand-500 flex-shrink-0" />
                                 {it}
                             </li>
                         ))}
                     </ul>
                 </div>
             ))}
         </div>
       </div>

       {/* FAQ Section */}
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
           <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12 font-heading">Frequently Asked Questions</h2>
           <div className="space-y-4">
               {faqs.map((faq, index) => (
                   <div key={index} className="border border-slate-200 rounded-xl bg-white overflow-hidden transition-all hover:shadow-md">
                       <button 
                          onClick={() => setOpenFaq(openFaq === index ? null : index)}
                          className="w-full px-8 py-6 flex justify-between items-center text-left focus:outline-none"
                       >
                           <span className={`text-lg font-bold transition-colors font-heading ${openFaq === index ? 'text-brand-500' : 'text-slate-900'}`}>{faq.q}</span>
                           {openFaq === index ? <ChevronUp className="text-brand-500" /> : <ChevronDown className="text-slate-400" />}
                       </button>
                       {openFaq === index && (
                           <div className="px-8 pb-8 text-slate-600 leading-relaxed border-t border-slate-100 pt-6 animate-fade-in-up">
                               {faq.a}
                           </div>
                       )}
                   </div>
               ))}
           </div>
       </div>

    </div>
  );
};

export default WhyJoin;