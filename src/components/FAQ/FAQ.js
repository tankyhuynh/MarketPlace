import React from 'react';

import Accordion from '../Accordion/Accordion'


const data = [
    {
        question: '➕ How do I add a question?',
        answer: 'Just click on the "Add a Question" button at the end of the current questions.'
    },
    {
        question: '✒️ How do I edit a question and its answer?',
        answer: 'You can click on this question text to open an editor, or to the right of every question is an edit icon.'
    },
    {
        question: '❌ How do I delete a question?',
        answer: 'To the right of every question is a delete icon. Click on that to remove the question.'
    },
    {
        question: '↕️ How do I change the order of questions?',
        answer: 'To the left of each question is an icon that you can use to drag questions to a new location.'
    },
    {
        question: '🗑️ I want to start afresh. How do I get rid of these questions?',
        answer: 'To the top right is a button to clear all the contents of the editor.'
    },
];

const FAQ = () => {
    return (
        <>
           <Accordion data={data}/>
        </>
    )
}

export default FAQ;