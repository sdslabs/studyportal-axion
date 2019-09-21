/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from 'components/header/header'
import Sidebar from 'components/sidebar/sidebar'
import Request from 'components/request/request'
import Upload from 'components/upload/upload'
import ActivityLog from 'components/activitylog/activityLog'
import CoursePage from 'components/coursecard/coursePage'
import courseApi from 'api/courseApi'

function mapStateToProps(state) {
    return { department: state.department }
}

class Department extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: this.props.login,
            request: false,
            upload: false,
            department: '',
            course: '',
            courses: []
        }
        this.department = this.props.match.params.department
        this.id_department = this.props.match.params.id_department
        this.course = this.props.match.params.course

        this.handleReq = this.handleReq.bind(this);
        this.handleReqHeader = this.handleReqHeader.bind(this);
        this.handleUplo = this.handleUplo.bind(this);
        this.handleUploHeader = this.handleUploHeader.bind(this);
    }

    componentWillMount() {
        this.setState({ course:this.course })
        this.setState({ department:this.department })
        courseApi(this.id_department).then((res,err) => {
          if(err) {
            window.alert("Something went wrong")
          }
          else {
            this.setState({ courses:res })
          }
        })
    }

    handleReqHeader () {
        this.setState({ request: true });
    }

    handleReq () {
        this.setState({ request: false });
    }

    handleUploHeader () {
        this.setState({ upload: true });
    }

    handleUplo () {
        this.setState({ upload: false });
    }

    render() {
        return (
            <div>
                <Header login={this.state.login} search={this.state.search} handleReqClick={this.handleReqHeader} handleUploClick={this.handleUploHeader} />
                <Sidebar login={this.state.login} department={this.state.department} id_department={this.id_department} courses={this.state.courses} active={this.props.match.params.course}/>
                <Request request={this.state.request} handleReq={this.handleReq} />
                <Upload upload={this.state.upload} handleUplo={this.handleUplo} />
                { this.state.login ? <ActivityLog /> : <CoursePage course={this.props.match.params.course} id_course={this.props.match.params.id_course} /> }
            </div>
        )
    }
}

export default connect(mapStateToProps)(Department)
