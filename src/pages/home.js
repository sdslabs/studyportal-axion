/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react';
import Header from 'components/home/header';
import SubjectCard from 'components/home/subjectCard';
import 'styles/main.scss';
import { getDepartmentsList } from 'api/departmentApi';
import { Link } from 'react-router-dom';
import { loginUserWithToken, loginUserWithCookie } from 'api/userApi';
import { getCookie } from 'utils/handleCookies';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            user: {},
            userMenu: false
        }
        this.getUser = this.getUser.bind(this);
        this.toggleUserMenu = this.toggleUserMenu.bind(this);
        this.close = this.close.bind(this);
    }

    async componentWillMount() {
      if(this.props.login) {
        await this.getUser()
      }
      await getDepartmentsList().then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          this.setState({ departments:res.department });
        }
      })
    }

    async componentWillReceiveProps(nextProps) {
      if(nextProps.login) {
        await this.getUser()
      }
      await getDepartmentsList().then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          this.setState({ departments:res.department });
        }
      })
    }

    async getUser() {
      const token = getCookie('token');
        if(token) {
          await loginUserWithToken(token).then((res,err) => {
            if(err) {
              //TODO handle error
            }
            else {
              this.setState({ user:res.user })
            }
          });
        }
        else {
          await loginUserWithCookie();
        }
    }

    toggleUserMenu() {
      this.setState({ userMenu:true });
    }

    close() {
      if(this.state.userMenu)
        this.setState({ userMenu:false });
    }

    render() {
        return(
            <div onClick={this.close}>
                <Header login={this.props.login} user={this.state.user} userMenu={this.state.userMenu} toggleUserMenu={this.toggleUserMenu} />
                <div className='sub_list' onClick={this.close}>
                  { this.state.departments.map((department) => (
                  <Link to={ `/departments/${department.abbreviation}` } key={department.abbreviation}>
                    <SubjectCard name={ department.title } url={ department.imageurl } id={ department.id } />
                  </Link>)
                  ) }
                </div>
            </div>
        )
    }
}

export default Home
