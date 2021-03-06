import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CONFIG } from 'config/config';
import 'styles/main.scss';

/**
 * Component to render subject card.
 */
class SubjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };

    this.togglehover = this.togglehover.bind(this);
  }

  /**
   * Toggles hover status on subjectcard.
   */
  togglehover() {
    this.setState((prevState) => ({
      hover: !prevState.hover,
    }));
  }

  render() {
    console.log(this.props.url);
    return (
      <div className="subjectcard" onMouseEnter={this.togglehover} onMouseLeave={this.togglehover}>
        <img
          className={!this.state.hover ? 'subjectcard--image' : 'subjectcard--image-hover'}
          src={CONFIG.mediaRoot + this.props.url}
          alt={this.props.name}
        />
        <div className={!this.state.hover ? 'subjectcard--cover' : 'subjectcard--cover-hover'} />
        <div className="subjectcard--text">
          <div className="subjectcard--text-hold">{this.props.name}</div>
        </div>
      </div>
    );
  }
}

export default SubjectCard;

SubjectCard.propTypes = {
  /** Holds image url of department. */
  url: PropTypes.string,
  /** Holds department name. */
  name: PropTypes.string,
};
