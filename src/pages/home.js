import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'components/home/header';
import Request from 'components/request/request';
import Upload from 'components/upload/upload';
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
            departments: [],
            search:false,
            notifications:false,
            userMenu:false,
            request:false,
            upload:false
        };
        this.handleClick=this.handleClick.bind(this);
        this.close=this.close.bind(this);
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

    handleClick(component) {
      if(component === 'notifications') {
        this.setState(prevState => ({
          notifications: !prevState.notifications
        }));
      }
      else if(component === 'userMenu') {
        this.setState(prevState => ({
          userMenu: !prevState.userMenu
        }));
      }
      else if(component === 'request') {
        this.setState({
          request:true,
          search:false,
          showmore:false,
          userMenu:false
        });
      }
      else if(component === 'upload') {
        this.setState({
          upload:true,
          search:false,
          showmore:false,
          userMenu:false
        });
      }
    }

    close() {
      this.setState({ search:false });
      if(this.state.userMenu)
        this.setState({ userMenu:false });
      if(this.state.notifications)
        this.setState({ notifications:false });
      if(this.state.showmore)
        this.setState({ showmore:false });
      if(this.state.request)
        this.setState({ request:false });
      if(this.state.upload)
        this.setState({ upload:false });
    }

    render() {
        return(
            <div className='home'>
              <div className='home--header'>
                <Header notifications={this.state.notifications}
                        userMenu={this.state.userMenu}
                        handleClick={this.handleClick}
                        close={this.close}/>
              </div>
              <div className='home--choosedept' onClick={this.close}>
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
              <Request request={this.state.request} close={this.close} refreshRequest={this.refreshRequest}/>
              <Upload upload={this.state.upload} close={this.close}/>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Home);

Home.propTypes = {
  user: PropTypes.object
};
