import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from 'react-slick';

import '../../styles/header/styles.header.css';
import '../../styles/header/styles.centerSegment.css';
import './CenterSegment/doc.css';
import './CenterSegment/slick-theme.css';
import './CenterSegment/slick.css';

import TemplateCenterData from './CenterSegment/tempCenterData';
import {
  selectCenterTemplate,
  initializeTemplate
} from '../../modules/header.module';

class CenterSegment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: undefined,
      display: true,
      width: 350
    };
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth
    });
    this.forceUpdate();
  };

  componentDidMount() {
    this.props.initializeTemplate();
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  onHandleSelectTemplate = templateId => {
    const { selectCenterTemplate } = this.props;
    selectCenterTemplate(templateId);
  };

  _imgClass(templateID) {
    const { templateId } = this.props.header;
    if (templateID === templateId.templateId) {
      return 'centerTemplate-highLight';
    }
    return 'center-tempImg';
  }

  renderCenterTemplates = () => {
    const { templates } = this.props;
    return templates.map((template, index) => {
      return (
        <div
          key={index}
          onClick={() => this.onHandleSelectTemplate(template.id)}
          className="centerImgs"
        >
          <img
            src={template.url}
            alt={'center image template'}
            className={this._imgClass(template.id)}
          />
        </div>
      );
    });
  };

  render() {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
    };
    return (
      <div className="centerSegment">
        <div
          style={{
            width: this.state.width + 'px'
            //display: this.state.display ? 'block' : 'none'
          }}
          className="CVSegment"
        >
          <Slider {...settings}>{this.renderCenterTemplates()}</Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  header: state.get('header')
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      selectCenterTemplate,
      initializeTemplate
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CenterSegment);

CenterSegment.defaultProps = {
  templates: TemplateCenterData.templates
};
