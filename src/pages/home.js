/* eslint-disable react/jsx-key */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'
import Header from 'components/home/header'
import SubjectCard from 'components/home/subjectCard'
import 'styles/main.scss'
import { getDepartmentsList } from 'api/departmentApi'
import { Link } from 'react-router-dom'
import { loginUserWithToken, loginUserWithCookie } from '../api/userApi'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: []
        }
    }

    componentWillMount() {
        getDepartmentsList().then((res,err) => {
          if(err) {
            //TODO handle error
          }
          else {
            this.setState({ departments: res });
          }
        })
        // if(true) {
        //   const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRhcmtyaWRlciIsImVtYWlsIjoiZGFya3JpZGVyMjUxMDk5QGdtYWlsLmNvbSJ9.xBwh-abNBZTlxWDRjEs33DN2AjXlf21JkSwlez6dvGM"
        //   loginUserWithToken(token).then((res,err) => {
        //     if(err) {
        //       //TODO handle error
        //     }
        //     else {
        //       console.log(res)
        //       this.props.getCourse(res.courses)
        //     }
        //   })
        // }
        // else {
        //   loginUserWithCookie()
        // }
    }

    render() {
        return(
            <div>
                <Header />
                <div className='sub_list'>
                  { this.state.departments.map((department) => (
                  <Link to={ `/departments/${department.abbreviation}` }>
                    <SubjectCard name={ department.title } url={ department.imageurl } id={ department.id } />
                  </Link>)
                  ) }
                </div>
            </div>
        )
    }
}

export default Home
