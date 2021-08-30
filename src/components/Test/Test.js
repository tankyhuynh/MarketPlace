import './Test.css'
import React from 'react';
import Filter from '../Filter/Filter'
import { useSelector } from 'react-redux';


const Test = () => {

    const projects = useSelector(state => state.projects)

    return (
        // <article classNameName="html">
        //     <section className="section large section-1"> Section One </section>
        //     <section className="section large section-2"> Section Two </section>
        //     <section className="section large section-3">Section Three</section>
        //     <section className="section large section-4"> Section Four </section>
        //     <section className="section large section-5"> Section Five </section>
        // </article>

        // <div className="">
        //     <ReactSlickIntegration />
        // </div>

        // <Pagination />

        <Filter data={projects} />
    );
};

export default Test;
