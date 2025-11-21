import React from 'react';
import { ROADMAP_DATA } from '../constants';
import { CheckCircle, Circle, Clock } from 'lucide-react';

export const Roadmap = () => {
  return (
    <section id="roadmap" className="py-24 bg-black relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">Future Vision</h2>
          <p className="text-teal-400 font-mono text-sm uppercase tracking-widest">Building the Studio of Tomorrow</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-teal-500 via-purple-500 to-gray-800 md:-translate-x-1/2"></div>

          <div className="space-y-12 md:space-y-24">
            {ROADMAP_DATA.map((phase, index) => {
              const isEven = index % 2 === 0;
              const statusColor = phase.status === 'completed' ? 'text-teal-400' : phase.status === 'in-progress' ? 'text-orange-400' : 'text-gray-500';
              const StatusIcon = phase.status === 'completed' ? CheckCircle : phase.status === 'in-progress' ? Clock : Circle;

              return (
                <div key={phase.id} className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>
                  
                  {/* Content Side */}
                  <div className={`flex-1 ${isEven ? 'md:text-right md:pr-12 pl-20' : 'md:text-left md:pl-12 pl-20'}`}>
                    <h3 className={`text-2xl font-bold text-white mb-2 ${statusColor} uppercase tracking-widest text-lg`}>
                      {phase.title}
                    </h3>
                    <ul className={`space-y-2 ${isEven ? 'md:items-end' : 'md:items-start'} flex flex-col`}>
                      {phase.items.map((item, i) => (
                        <li key={i} className="text-gray-400 text-sm border-l-2 border-gray-800 pl-3 md:border-l-0 md:border-none">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-black border-4 border-gunmetal rounded-full flex items-center justify-center z-10">
                    <StatusIcon className={`w-6 h-6 ${statusColor}`} />
                  </div>

                  {/* Empty Side for spacing */}
                  <div className="hidden md:block flex-1"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};