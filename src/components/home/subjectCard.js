/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import getDepartment from 'actions/departmentAction'
import 'styles/main.scss'

function mapDispatchToProps(dispatch) {
  return {
    getDepartment: department => dispatch(getDepartment(department))
  }
}

class SubjectCard extends Component {
    departmentSet() {
      this.props.getDepartment(this.props.id)
    }

    render() {
        return(
            <div className={this.props.name} onClick={this.departmentSet.bind(this)}>
                <img className='subjectcard--image' src={this.props.url} alt={this.props.name} />
            </div>
        )
    }
}

export default connect(null,mapDispatchToProps)(SubjectCard)
