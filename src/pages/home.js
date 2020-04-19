import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        };
        this.getUser = this.getUser.bind(this);
        this.toggleUserMenu = this.toggleUserMenu.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
      getDepartmentsList().then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          this.setState({ departments:res.department });
          if(this.props.login) {
            this.getUser();
          }
        }
      });
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
      getDepartmentsList().then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          this.setState({ departments:res.department });
          if(nextProps.login) {
            this.getUser();
          }
        }
      });
    }

    getUser() {
      const token = getCookie('token');
        if(token) {
          loginUserWithToken(token).then((res,err) => {
            if(err) {
              //TODO handle error
            }
            else {
              this.setState({ user:res.user });
            }
          });
        }
        else {
          loginUserWithCookie();
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
            <div className='home' onClick={this.close}>
              <div className='home--header'>
                <Header login={this.props.login} user={this.state.user} userMenu={this.state.userMenu} toggleUserMenu={this.toggleUserMenu} />
              </div>
              <div className='home--choosedept'>
                <div>Click on department to continue</div>
                <div className='home--choosedept_und'/>
              </div>
              <div className='home--sub_list' onClick={this.close}>
                { this.state.departments.map((department) => (
                <Link to={ `/departments/${department.abbreviation}` } key={department.abbreviation}>
                  <SubjectCard name={ department.title } url={ department.imageurl } id={ department.id } />
                </Link>)
                ) }
              </div>
            </div>
        );
    }
}

export default Home;

Home.propTypes = {
  login: PropTypes.bool
};
