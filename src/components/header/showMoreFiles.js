import React, { Component,Fragment } from 'react';
import 'styles/main.scss';
import SearchResult from './searchResult';
import emoji from 'assets/mdi_sentiment_very_dissatisfied.svg';
import close from 'assets/closereq.png';

class ShowMoreFiles extends Component{
    constructor(props){
        super(props);
        this.state={
            files: props.files,
            searchquery: props.searchquery,
        }
    }

    render(){
        if(this.props.showmore){
            return(
                <div className='seeallcover'>
                    <div className='seeall'>
                        <div className='seeall--close' onClick={this.props.handleSeeAll}><img src={close} alt='close'/></div>
                        <div className='seeall--heading'>Search results for <span className='seeall--heading_query'>"{this.state.searchquery}"</span></div>
                        <div className='seeall--fileholder'>
                            {this.props.files.map((file) => (
                                <SearchResult name={ file.title } url={ file.driveid } date_modified={ file.date_modified } 
                                course_name={ file.course.title } course_code={ file.course.code } file_type={ file.filetype } key={file.id}/>
                            ))}
                        </div>
                        <div className='seeall--underline'></div>
                        <div className='seeall--footer'>
                            <span className='seeall--footer-emoji'><img src={emoji} alt='emoji'/></span>
                            <span className='seeall--footer-text'>Couldn't find what you looking for? </span>
                            <span className='seeall--footer-request' onClick={this.props.handleReqClick}>Request here!</span>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return(
                <Fragment />
            )
        }
    }
}

export default ShowMoreFiles