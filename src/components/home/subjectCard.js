import React, {Component} from 'react'

class SubjectCard extends Component {
    render() {
        return(
            <div className={this.props.name}>
            <img className={this.props.name+'img'} src={this.props.url} alt={this.props.name} />
            </div>
        )
    }
}

export default SubjectCard