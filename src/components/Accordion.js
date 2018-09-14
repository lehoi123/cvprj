import React from 'react';
import '../styles/Accordion/accordion.css';
import ArrowImage from '../assets/assets/images/Accordion/Arrow.svg';

class AccordionItem extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      active: !this.state.active,
      className: 'active'
    });
  }
  render() {
    const activeClass = this.state.active ? 'active' : 'inactive';
    const question = this.props.details;
    return (
      <div className={activeClass} onClick={this.toggle}>
        <div className="accHeadWrapper">
          <span className="summary">{question.summary}</span>
          <img src={ArrowImage} alt="Arrow" className="arrowImages" />
        </div>

        <span className="folding-pannel answer">{question.answer}</span>
      </div>
    );
  }
}

export default AccordionItem;
