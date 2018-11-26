import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logUserIn } from 'routines';
import { StyledButton, StyledFormItem, StyledContentWrapper } from 'components/Styled';
import { Choose } from 'react-extras';
import MemberArea from 'components/MemberArea';
import { openNotification } from 'utils/helpers';


const { When, Otherwise } = Choose;

class HomePage extends Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func,
      getFieldDecorator: PropTypes.func,
    }).isRequired,
    state: PropTypes.shape({
      user: PropTypes.object,
    }).isRequired,
    actions: PropTypes.shape({
      logUserIn: PropTypes.func,
    }).isRequired,
  };

  static mapStateToProps = state => ({
    state: {
      user: state.user,
    },
  });

  static mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      logUserIn,
    }, dispatch),
  });

  componentDidUpdate(prevProps) {
    const { state } = this.props;
    const { user } = state;

    console.log({ prevProps });

    if (prevProps.state.user.data.name !== user.data.name) {
      openNotification('success', 'welcome',
        user.data.existing ? 'Welcome back!' : 'Welcome!');
    }
  }

  handleFormSubmit = (event) => {
    const { form, actions } = this.props;

    event.preventDefault();

    form.validateFields((error, values) => {
      if (error) {
        return console.error({ error, values });
      }
      actions.logUserIn(values);
      return console.log({ values });
    });
  };

  render() {
    const { form, state } = this.props;
    const { getFieldDecorator } = form;
    const { user } = state;

    return (
      <StyledContentWrapper>
        <Choose>
          <When condition={!user.data.name}>
            <Row type="flex" align="middle" justify="center">
              <Col xs={23} md={8}>
                <Form onSubmit={this.handleFormSubmit}>
                  <StyledFormItem>
                    {getFieldDecorator('userName', {
                      rules: [
                        { required: true, message: 'Username is needed...' },
                      ],
                    })(<Input type="text" placeholder="Username" />)}
                  </StyledFormItem>
                  <StyledFormItem>
                    <StyledButton type="primary" htmlType="submit">
                      Let&apos;s Go
                    </StyledButton>
                  </StyledFormItem>
                </Form>
              </Col>
            </Row>
          </When>
          <Otherwise>
            <MemberArea />
          </Otherwise>
        </Choose>
      </StyledContentWrapper>
    );
  }
}

export default connect(HomePage.mapStateToProps, HomePage.mapDispatchToProps)(Form.create()(HomePage));
