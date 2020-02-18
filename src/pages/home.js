/* eslint-disable react/jsx-key */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-deprecated */
import React, { Component, Suspense, lazy } from 'react'
import Header from 'components/home/header'
import 'styles/main.scss'
import { getDepartmentsList } from 'api/departmentApi'
import { Link } from 'react-router-dom'

const SubjectCard = lazy(() => import('components/home/subjectCard'))

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
    }

    render() {
        return(
            <div>
                <Header />
                <div className='sub_list'>
                  <Suspense fallback={<div>...Loading</div>}> {/*TODO fallback component loader*/}
                  { this.state.departments.map((department) => (
                    <Link to={ `/departments/${department.abbreviation}` }>
                      <SubjectCard name={ department.title } url={ department.imageurl } id={ department.id } />
                    </Link>
                  ))}
                  </Suspense>
                </div>
            </div>
        )
    }
}

export default Home
