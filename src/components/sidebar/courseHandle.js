/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import coursedot from 'assets/coursedot.png';
import 'styles/main.scss';
import shortName from 'utils/short-name';

function mapStateToProps(state) {
    return { user: state };
}

class CourseHandle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active,
            login: props.login,
            name: props.name,
            mycourse: this.checkMyCourse(props)
        };
        this.activatecourse = this.activatecourse.bind(this);
    }

    componentDidMount() {
        if (this.state.login) {
            if (this.props.name === this.props.active) {
                this.setState({ active: true });
            }

            else {
                this.setState({ active: false });
            }
        }
        else {
          this.setState({ active: this.props });
        }
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(props) {
      if (props.login) {
        this.setState({ login:props.login });
          if (props.name === props.active) {
              this.setState({ active: true });
          }

          else {
              this.setState({ active: false });
          }
      }
      else {
        this.setState({ active: props.active });
      }
    }

    activatecourse() {
      this.props.handleClick(this.props.name);
    }

    checkMyCourse(props) {
        if(props.user.courses.find(o => o.code === props.code) !== undefined)
            return true;
        else return false;
    }

    render() {
        if (this.state.login) {
            return(
                <div className='coursehandle'>
                    <span className='coursehandle--heading' onClick={this.activatecourse}>
                        {`${ this.props.title.length >= 30 ? shortName(this.props.title) : this.props.title } ${this.props.code}`}
                    </span>
                    <span>{ this.state.active ?
                        <span className='coursehandle--activedot'>
                            <img src={coursedot} alt='coursedot'/>
                        </span> : <span /> }
                    </span>
                </div>
            );
        }

        else {
            return(
                <div className={ this.state.name === this.state.active ? 'coursehandle_active' : 'coursehandle'}>
                    <span className={ this.state.name === this.state.active ?
                        'coursehandle--heading_active' : 'coursehandle--heading'} onClick={this.activatecourse}>
                        {`${ this.props.title.length >= 30 ? shortName(this.props.title) : this.props.title } ${this.props.code}`}
                    </span>
                    { this.state.mycourse ? <span className='coursehandle--mycourse'>My Course</span> : <span />}
                </div>
            );
        }
    }
}

export default connect(mapStateToProps)(CourseHandle);

CourseHandle.propTypes = {
    active: PropTypes.string,
    login: PropTypes.bool,
    name: PropTypes.string,
    title: PropTypes.string,
    code: PropTypes.string,
    user: PropTypes.object,
    handleClick: PropTypes.func
};
