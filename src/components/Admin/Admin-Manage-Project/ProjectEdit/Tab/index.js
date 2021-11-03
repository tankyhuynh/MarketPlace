import React from "react";

const Tabs = ({ tabs, color, openTabChange, openTabProps, isEnableToChangeTab }) => {
    const [openTab, setOpenTab] = React.useState(openTabProps ? openTabProps : 0);

    const onTabChange = (e, tab, index) => {
        e.preventDefault();
        if(isEnableToChangeTab){
            setOpenTab(index);
            openTabChange(tab.type);
        }
    }
    
    const renderTabsTitle = tabs.map((tab, index) => {
        return (
            <li className="flex-auto mr-2 -mb-px text-center last:mr-0" key={index}>
                    <a
                        className={
                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                        (openTab === index
                            ? "text-white bg-" + color + "-500"
                            : "text-" + color + "-500 bg-white")
                        }
                        onClick={e => onTabChange(e, tab, index)}
                        data-toggle="tab"
                        href="#link1"
                        role="tablist"
                    >
                        { tab.title }
                    </a>
             </li>
        );
    });

    // RP CP
    const renderTabsContent = tabs.map((tab, index) => {
        return (
            <div className={ (openTab === index) ? "block" : "hidden"} id="link1" key={index}>
                    { tab.content }
            </div>
        );
    });


    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <ul
                        className="flex flex-row flex-wrap pt-3 pb-4 mb-0 list-none"
                        role="tablist"
                    >
                        { renderTabsTitle }
                    </ul>

                    <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg">
                        <div className="flex-auto px-4 py-5">
                            <div className="tab-content tab-space">
                                { renderTabsContent }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tabs;