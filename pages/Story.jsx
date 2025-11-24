import React from 'react';

const Story = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-32 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center mb-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-heading">Our Story</h1>
        <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full"></div>
        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">From a Dining Room to Digital Excellence</p>
      </div>

      {/* Timeline Section */}
      <section className="py-10">
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

    </div>
  );
};

export default Story;