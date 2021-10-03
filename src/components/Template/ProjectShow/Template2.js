import React from 'react';
import { Link } from 'react-router-dom'

const Template = () => {
    return (
        <>
        <div class="flex flex-col min-h-screen bg-white">
            <div className="flex flex-wrap flex-grow w-full py-4 sm:flex-row sm:flex-nowrap">
                    <div className="flex-grow-0 flex-shrink px-4 w-fixed ">
                        <div className="sticky top-0 h-full p-4 bg-gray-100 rounded-xl">
                            <ul className="flex content-center justify-center overflow-hidden sm:flex-col">
                                <li className="py-2 rounded hover:bg-indigo-300">
                                    <Link to="/" className="truncate">
                                        <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/home.svg" className="inline mx-4 w-7 sm:mx-2" alt="" />
                                        <span className="hidden sm:inline">Home</span>
                                    </Link>
                                </li>
                                <li className="py-2 rounded hover:bg-indigo-300">
                                    <Link to="/" className="truncate">
                                        <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/cog.svg" className="inline mx-4 w-7 sm:mx-2" alt="" /> <span className="hidden sm:inline">Settings</span>
                                    </Link>
                                </li>
                                <li className="py-2 rounded hover:bg-indigo-300">
                                    <Link to="/" className="">
                                        <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/gift.svg" className="inline mx-4 w-7 sm:mx-2" alt="" /> <span className="hidden sm:inline">Products</span>
                                    </Link>
                                </li>
                                <li className="py-2 rounded hover:bg-indigo-300">
                                    <Link to="/" className="">
                                        <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/chart-bar.svg" className="inline mx-4 w-7 sm:mx-2" alt="" /> <span className="hidden sm:inline">Reports</span>
                                    </Link>
                                </li>
                                <li className="py-2 rounded hover:bg-indigo-300">
                                    <Link to="/" className="">
                                        <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/collection.svg" className="inline mx-4 w-7 sm:mx-2" alt="" /> <span className="hidden sm:inline">Integrations</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div role="main" className="flex-grow w-2/3 px-3 pt-1">
                        <h1 className="mb-4 text-3xl font-extrabold md:text-5xl" id="home">The Holy Grail Layout</h1>
                        <p className="py-2">Are you in search of this? In terms of Web design, <a className="text-indigo-600" href="https://en.wikipedia.org/wiki/Holy_grail_(web_design)">the "holy grail" is
                        page layout</a> that has 3 columns. It is commonly desired and implemented, but for many years, the various ways in which it could be 
                        implemented with available technologies all had drawbacks. Because of this, finding an optimal implementation was likened to searching 
                        for the elusive Holy Grail.
                        </p>
                        <p className="py-2">
                        As of 2021, the Holy Grail layout is implemented using CSS Flexbox or CSS Grid display. For this example, we're using
                        the <a className="text-indigo-600" href="https://tailwindcss.com/">Tailwind CSS</a> utility framework. As part of it's default classNamees, Tailwind includes
                        <a className="text-indigo-600" href="https://tailwindcss.com/docs/flex-direction">Flexbox classNamees</a> which make this implementation possible. The holy grail 
                        example is also responsive so that the layout stacks vertically on smaller mobile screens.
                        </p>
                        <p className="py-2">
                        Many web pages require a layout with multiple (often three) columns, with the 
                        main page content in one column (often the center), and supplementary content such as menus 
                        and advertisements in the other columns (sidebars). These columns commonly require separate 
                        backgrounds, with borders between them, and should appear to be the same height no matter 
                        which column has the tallest content. A common requirement is that the sidebars have a fixed width, 
                        with the center column adjusting in size to fill the window (fluid or liquid layout). 
                        Another requirement is that, when a page does not contain enough content to fill the screen, 
                        the footer should drop to the bottom of the browser window instead of leaving blank space underneath.
                        </p>
                        <div className="flex p-3 text-white bg-indigo-600 rounded md:flex">
                            <span className="flex-shrink overflow-hidden whitespace-nowrap">&lt;--------</span>
                            <div className="flex-grow flex-shrink-0 text-center overflow-ellipsis">This center column is "fluid" so it grows in width as needed!</div>
                            <span className="flex-shrink overflow-hidden whitespace-nowrap">--------&gt;</span>
                        </div>
                    </div>
                    <div className="flex-grow-0 flex-shrink w-full px-2 w-fixed">
                        <div className="flex px-2 sm:flex-col">
                            <div className="w-full mb-3 border bg-gray-50 rounded-xl">
                                <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                        <span className="block text-indigo-600">Made with Tailwind CSS!</span>
                                    </h2>
                                </div>
                            </div>
                            <div className="p-2">spacer</div>
                            <div className="w-full mb-3 bg-gray-100 rounded-xl">
                                <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                        <span className="block">Ready to dive in?</span>
                                    </h2>
                                </div>
                            </div>
                            <div className="p-2">spacer</div>
                            <div className="w-full mb-3 border bg-gray-50 rounded-xl">
                                <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                        <span className="block text-indigo-600">Play free at Codeply today.</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="mt-auto bg-black">
                    <div className="p-5 mx-auto text-white">
                        <h1 className="text-2xl">Footer</h1>
                        <div className="flex">
                            <div className="flex flex-col flex-grow">
                                <Link to="/">Boom</Link>
                                <Link to="/">Boom</Link>
                                <Link to="/">Boom</Link>
                                <Link to="/">Boom</Link>
                            </div>
                            <div className="flex flex-col flex-grow">
                                <Link to="/">Boom</Link>
                                <Link to="/">Boom</Link>
                                <Link to="/">Boom</Link>
                                <Link to="/">Boom</Link>
                            </div>
                            <div className="flex flex-col flex-grow">
                                <Link to="/">Boom</Link>
                                <Link to="/">Boom</Link>
                                <Link to="/">Boom</Link>
                                <Link to="/">Boom</Link>
                            </div>
                            <div className="flex flex-col flex-grow">
                                <Link to="/">Boom</Link>
                                <Link to="/">Boom</Link>
                                <Link to="/">Boom</Link>
                                <Link to="/">Boom</Link>
                            </div>
                           
                        </div>
                        <div className="py-4 text-xs text-right">
                            <Link to="/">&copy;2021 Someco Inc.</Link>
                        </div>
                    </div>
                </footer>

        </div>
            
        </>        
    )
}

export default Template;