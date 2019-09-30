/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import 'styles/main.scss'

class SubjectCard extends Component {
    render() {
        return(
            <div className={this.props.name}>
                <img className='subjectcard--image' src={`/images/${this.props.url}`} alt={this.props.name} />
            </div>
        )
    }
}

export default SubjectCard
