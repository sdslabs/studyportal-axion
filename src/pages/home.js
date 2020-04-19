import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'components/home/header';
import SubjectCard from 'components/home/subjectCard';
import 'styles/main.scss';
import { getDepartmentsList } from 'api/departmentApi';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
  return { user: state };
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: []
        };
        this.closeUserMenu = this.closeUserMenu.bind(this);
    }

    componentDidMount() {
      getDepartmentsList().then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          this.setState({ departments:res.department });
        }
      });
    }

    closeUserMenu() {
      if(this.props.user)
        //TODO finalize user_menu close flow
        return;
    }

    render() {
        return(
            <div className='home'>
              <div className='home--header'>
                <Header/>
              </div>
              <div className='home--choosedept'>
                <div onClick={this.closeUserMenu}>Click on department to continue</div>
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

export default connect(mapStateToProps)(Home);

Home.propTypes = {
  user: PropTypes.object
};
