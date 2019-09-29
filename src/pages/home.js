/* eslint-disable react/jsx-key */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'
import Header from 'components/home/header'
import SubjectCard from 'components/home/subjectCard'
import 'styles/main.scss'
import { getDepartmentsList } from 'api/departmentApi'
import { Link } from 'react-router-dom'

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
            window.alert('No results found')
          }
          else {
            this.setState({ departments: res });
          }
        })
    }

    render() {
        return(
            <div>
                <Header />
                <div className='sub_list'>
                  { this.state.departments.map((department) => (
                  <Link to={ `/departments/${department.abbreviation}` }>
                    <SubjectCard name={ department.title } url={ department.url } id={ department.id } />
                  </Link>)
                  ) }
                </div>
            </div>
        )
    }
}

export default Home
