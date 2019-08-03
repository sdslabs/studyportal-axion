/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'
import SearchResult from './searchResult'
import '../../styles/main.scss'

class Search extends Component {
    constructor(props) {
        super(props);

        this.search = React.createRef()
    }

    componentWillReceiveProps(props) {
        if (props.search) {
            if (props.value !== '') {
                this.search.current.style.display = 'block';
            }
    
            else {
                this.search.current.style.display = 'none';
            }
        }
        else {
            this.search.current.style.display = 'none';
        }
    }

    render() {
        return(
            <div className='search' ref={this.search}>
                <div className='search--file'>Files</div>
                <div className='search--file-holder'>
                    <SearchResult />
                    <SearchResult />
                    <SearchResult />
                    <SearchResult />
                </div>
                <div className='search--file-seeall'>See All</div>
                <div className='search--courses'>Courses</div>
                <div>
                    <div className='search--courses-name'>Structural Analysis CEN-201</div>
                    <div className='search--courses-name'>Structural Analysis CEN-202</div>
                </div>
                <div className='search--department'>Department</div>
                <div>
                    <div className='search--department-name'>Civil Department</div>
                </div>
            </div>
        )
    }
}

export default Search