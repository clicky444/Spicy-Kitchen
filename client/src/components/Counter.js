import React, { useEffect, useState } from 'react';
import '../../src/style.css';

const CounterSection = () => {
  const [years, setYears] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [menus, setMenus] = useState(0);
  const [staff, setStaff] = useState(0);

  useEffect(() => {
    const animateValue = (start, end, duration, setter) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setter(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    animateValue(0, 18, 2000, setYears);
    animateValue(0, 15000, 2000, setCustomers);
    animateValue(0, 100, 2000, setMenus);
    animateValue(0, 20, 2000, setStaff);
  }, []);

  return (
    <section className="relative bg-cover bg-center counter h-auto py-16" id="section-counter">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center mt-24 justify-center">
          <div className="lg:w-10/12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex justify-center p-4 animate-fade-in">
                <div className="text-center">
                  <strong className="text-3xl md:text-5xl lg:text-5xl font-medium" data-number="18">
                    {years}
                  </strong>
                  <span className="block text-lg md:text-xl lg:text-2xl mt-2 text-gray-700">
                    Years of Experience
                  </span>
                </div>
              </div>
              <div className="flex justify-center p-4 animate-fade-in">
                <div className="text-center">
                  <strong className="text-3xl md:text-5xl lg:text-5xl font-medium" data-number="15000">
                    {customers}
                  </strong>
                  <span className="block text-lg md:text-xl lg:text-2xl mt-2 text-gray-700">
                    Happy Customers
                  </span>
                </div>
              </div>
              <div className="flex justify-center p-4 animate-fade-in">
                <div className="text-center">
                  <strong className="text-3xl md:text-5xl lg:text-5xl font-medium" data-number="100">
                    {menus}
                  </strong>
                  <span className="block text-lg md:text-xl lg:text-2xl mt-2 text-gray-700">
                    Menus
                  </span>
                </div>
              </div>
              <div className="flex justify-center p-4 animate-fade-in">
                <div className="text-center">
                  <strong className="text-3xl md:text-5xl lg:text-5xl font-medium" data-number="20">
                    {staff}
                  </strong>
                  <span className="block text-lg md:text-xl lg:text-2xl mt-2 text-gray-700">
                    Staff
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-5"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
