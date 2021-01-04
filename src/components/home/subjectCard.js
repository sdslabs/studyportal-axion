import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    return (
      <div className="subjectcard" onMouseEnter={this.togglehover} onMouseLeave={this.togglehover}>
        {!this.state.hover ? (
          <img
            className="subjectcard--image"
            src={`/images/${this.props.url}`}
            alt={this.props.name}
          />
        ) : (
          <img
            className="subjectcard--image-hover"
            src={`/images/${this.props.url}`}
            alt={this.props.name}
          />
        )}
        {!this.state.hover ? (
          <div className="subjectcard--cover" />
        ) : (
          <div className="subjectcard--cover-hover" />
        )}
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
