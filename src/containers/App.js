import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from 'containers/HomePage';
import { StyledLayout, StyledContent } from 'components/Styled';


const { Header } = Layout;

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <StyledLayout>
        <Header />
        <StyledContent>
          <HomePage />
        </StyledContent>
      </StyledLayout>
    );
  }
}

export default hot(module)(withRouter(connect()(App)));
