/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import icon from 'assets/icon.png'
import 'styles/main.scss'

class SearchResult extends Component {
    render() {
        return(
            <div className='file--card'>
                <div className='file--card-icon'><img src={icon} alt='icon'/></div>
                <div className='file--card-heading'>{this.props.title}</div>
                <div className='file--card-info'><span className='file--card-info_name'>{this.props.course}</span><span className='file--card-info_course'>{this.props.code}</span></div>
                <div className='file--card-detail'><span className='file--card-detail_date'>{this.props.date}</span><span className='file--card-detail_type'>{this.props.type}</span></div>
            </div>
        )
    }
}

export default SearchResult
