import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_REQUEST, CLOSE_MODAL } from 'constants/action-types';
import 'styles/main.scss';
import SearchResult from './searchResult';
import emoji from 'assets/mdi_sentiment_very_dissatisfied.svg';
import close from 'assets/closereq.png';

/**
 * Component to render ShowMoreFiles modal.
 */
const ShowMoreFiles = () => {
    const dispatch = useDispatch();
    const modal = useSelector((state) => state.modal);
    const search = useSelector((state) => state.search);

    if(modal.showMore) {
        return(
            <div className='seeallcover'>
                <div className='seeall'>
                    <div className='seeall--main'>
                        <div className='seeall--close' onClick={() => dispatch({ type: CLOSE_MODAL })}>
                          <img src={close} alt='close'/>
                        </div>
                        <div className='seeall--heading'>
                            Search results for <span className='seeall--heading_query'>&quot;{search.query}&quot;</span>
                        </div>
                        <div className='seeall--fileholder'>
                            {search.files.map((file) => (
                                <div className='file' key={file.id}>
                                    <SearchResult name={ file.title }
                                        url={ file.driveid }
                                        date_modified={ file.date_modified }
                                        course_name={ file.course.title }
                                        course_code={ file.course.code }
                                        file_type={ file.filetype }
                                        ext={ file.fileext }/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='seeall--foot'>
                        <div className='seeall--underline'/>
                        <div className='seeall--footer'>
                            <span className='seeall--footer-emoji'><img src={emoji} alt='emoji'/></span>
                            <span className='seeall--footer-text'>Couldn&apos;t find what you looking for? </span>
                            <span className='seeall--footer-request' onClick={() => dispatch({ type: TOGGLE_REQUEST })}>Request here!</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return(
            <Fragment />
        );
    }
};

export default ShowMoreFiles;
