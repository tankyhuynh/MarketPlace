import React from 'react';

const items = [
    {
        name: 'Introduction',
        content: 'Introduction content'
    },
    {
        name: 'Mission and vision',
        content: 'Mission and vision content'
    },
    {
        name: 'Research topics',
        content: 'Research topics content'
    },
    {
        name: 'Current members',
        content: 'Current members content'
    },
    {
        name: 'Publications (ISI or Scopus only)',
        content: 'Publications (ISI or Scopus only) content'
    },
]

const ResearcherGroup = () => {
    
    const renderList = () => {
        return items.map(item => {
            return (
                <>
                    <div>
                        { item.name }
                    </div>
                    <div>
                        { item.content }
                    </div>
                </>
            )
        })
    }
    
    return (
        <div>
            { renderList() }
        </div>
    ) 
}

export default ResearcherGroup;