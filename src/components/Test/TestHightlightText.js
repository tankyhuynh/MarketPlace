import React from 'react';

import Highlighter from "react-highlight-words";

const TestHightlightText = () => {

    const query = new URLSearchParams(window.location.search).get('s');

    return (
        <Highlighter
            // highlightClassName="YourHighlightClass"
            searchWords={query ? [query] : []}
            autoEscape={true}
            textToHighlight="The dog is chasing the cat. Or perhaps they're just playing?"
        />
    )
}

export default TestHightlightText;