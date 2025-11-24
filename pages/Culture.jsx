import React from 'react';
import { Heart, ShieldCheck, Zap, Image as ImageIcon } from 'lucide-react';

const Culture = () => {
  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-500 pb-20 relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float-delayed"></div>
      </div>

      <div className="pt-24 pb-16 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-heading">Life at eParivartan</h1>
        <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Row: Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {[
            { 
              icon: <Zap className="h-8 w-8 text-white" />, 
              title: "Never-Say-Die Attitude", 
              desc: "Perseverance even with tight deadlines. Our 'Yes, Boss!' mentality supports each other unconditionally.",
              bgIcon: "bg-brand-500"
            },
            { 
              icon: <Heart className="h-8 w-8 text-white" />, 
              title: "Family Environment", 
              desc: "A close-knit team atmosphere where we celebrate wins together and support each other always.",
              bgIcon: "bg-red-500"
            },
            { 
              icon: <ShieldCheck className="h-8 w-8 text-white" />, 
              title: "Quality Over Everything", 
              desc: "Pixel-perfect designs where client satisfaction is the #1 priority. Excellence is our standard.",
              bgIcon: "bg-blue-500"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-10 text-center shadow-lg border border-slate-100 flex flex-col items-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
              <div className={`rounded-2xl p-5 ${item.bgIcon} mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-heading">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Row: Gallery Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {['Team Photos at Work', 'Office Space', 'Team Celebrations'].map((text, idx) => (
             <div key={idx} className="border-2 border-dashed border-slate-200 rounded-3xl h-72 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 hover:bg-white hover:border-brand-400 hover:text-brand-500 transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:shadow-xl">
                <ImageIcon className="h-12 w-12 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-bold text-lg font-heading">{text}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Culture;