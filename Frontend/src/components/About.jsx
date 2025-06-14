import React from 'react'
import { Link, NavLink } from 'react-router-dom';
const About = () => {
  return (
    <section className="py-24 md:py-10 lg:py-24  flex justify-center items-center relative min-h-screen  lg:min-h-screen ">
      <div className=" max-w-[95vw] sm:max-w-[80vw] min-w-7xl px-4 md:px-5 lg:px-5 m-auto">
        <div className="w-full justify-start items-center md:gap-0 lg:gap-8 grid md:grid-cols-1 lg:grid-cols-2 grid-cols-1">
          <div className="w-full flex-col justify-start md:mt-20 lg:mt-0 lg:items-start items-center gap-10 inline-flex ">
            <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
              <h2 className="text-gray-300 text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-4xl font-medium sm:font-bold font-manrope leading-normal lg:text-start text-center">Empowering Developers and Fostering Collaboration through Smarter Code Management.</h2>
              <p className="text-gray-400  font-normal sm:font-semibold text-xs sm:text-base xl:text-lg  leading-relaxed lg:text-start text-center">Through collaboration, diverse perspectives and technical strengths are brought together to build an inclusive coding environment where every developer can thrive. This approach not only enhances individual skill development and productivity but also strengthens the broader developer community.</p>
            </div>
            <button className="sm:w-fit w-[42%] px-3 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
              <NavLink to='/login' className="px-1.5 text-white text-xs md:text-sm font-medium leading-6">Get Started</NavLink>
            </button>
          </div>
          <img className="lg:mx-0 mx-auto h-[90%] sm:h-[90%] md:h-[80%] lg:h-[90%] xl:h-full rounded-3xl md:object-contain sm:object-contain object-cover w-full" src="/images/brand.png" alt="about Us image" />
        </div>
      </div>
    </section>

  )
}

export default About