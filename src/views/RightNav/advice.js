import React, { Component } from 'react';
import AccordionItem from '../../components/Accordion';
import '../../styles/Accordion/accordion.css';

const sampleQuestions = {
  question1: { summary: 'The capital of Canada?', answer: 'Ottawa baby!!' },
  question2: {
    summary: 'The life span of a bowhead whale?',
    answer: 'Over 200 years!!'
  },
  question3: {
    summary: 'The most visited city in the world?',
    answer: 'London, groovy baby!!'
  },
  question4: {
    summary: 'The warmest ocean?',
    answer: "Indian Ocean, it's a hottie!"
  },
  question5: {
    summary: 'The one thing ron swanson hates more than lying?',
    answer: "Skim milk, which is water that's lying about being milk"
  }
};

export default class Advice extends Component {
  constructor() {
    super();
    this.state = {
      questions: sampleQuestions
    };
    this.renderQuestion = this.renderQuestion.bind(this);
  }
  renderQuestion(key) {
    return (
      <AccordionItem
        key={key}
        index={key}
        details={this.state.questions[key]}
      />
    );
  }
  render() {
    return (
      <div className="accordion-container">
        {Object.keys(this.state.questions).map(this.renderQuestion)}{' '}
      </div>
    );
  }
}
