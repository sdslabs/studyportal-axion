/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import 'styles/main.scss'

class SubjectCard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hover: false
      }

      this.togglehover = this.togglehover.bind(this)
    }

    togglehover() {
      this.setState({ hover:!this.state.hover })
    }

    render() {
        return(
            <div className='subjectcard' onMouseEnter={this.togglehover} onMouseLeave={this.togglehover}>
                { !this.state.hover ? <img className='subjectcard--image' src={`/images/${this.props.url}`} alt={this.props.name} /> :
                 <img className='subjectcard--image-hover' src={`/images/${this.props.url}`} alt={this.props.name} /> }
                { !this.state.hover ? <div className='subjectcard--cover' /> : <div className='subjectcard--cover-hover' /> }
                <div className='subjectcard--text'><div className='subjectcard--text-hold'>{this.props.name}</div></div>
            </div>
        )
    }
}

export default SubjectCard
