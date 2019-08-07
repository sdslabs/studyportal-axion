import React, { Component } from 'react'
import icon from 'assets/icon.png'
import 'styles/main.scss'

class SearchResult extends Component {
    render() {
        return(
            <div className='file--card'>
                <div className='file--card-icon'><img src={icon} alt='icon'/></div>
                <div className='file--card-heading'>Tutorial 1</div>
                <div className='file--card-info'><span className='file--card-info_name'>Structural Analysis</span><span className='file--card-info_course'>CEN-201</span></div>
                <div className='file--card-detail'><span className='file--card-detail_date'>Dec 14, 2018</span><span className='file--card-detail_type'>Tutorials</span></div>
            </div>
        )
    }
}

export default SearchResult
