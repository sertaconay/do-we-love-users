import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, DatePicker, Form, Input } from 'antd';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { connect } from 'react-redux';
import { StyledFormItem, StyledButton } from 'components/Styled';
import { updateUser } from 'routines';
import { openNotification } from 'utils/helpers';


const { RangePicker } = DatePicker;

class MemberArea extends Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func,
      getFieldDecorator: PropTypes.func,
    }).isRequired,
    state: PropTypes.shape({
      user: PropTypes.object,
    }).isRequired,
    actions: PropTypes.shape({
      updateUser: PropTypes.func,
    }).isRequired,
  };

  static mapStateToProps = state => ({
    state: {
      user: state.user,
    },
  });

  static mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      updateUser,
    }, dispatch),
  });

  handleFormSubmit = (event) => {
    const { form, actions, state } = this.props;
    const { user } = state;

    event.preventDefault();

    form.validateFields((error, values) => {
      const { dateRange, opinion } = values;
      if (error) {
        return console.error({ error, values });
      }
      const startDate = dateRange[0];
      const endDate = dateRange[1];

      actions.updateUser({ startDate, endDate, opinion, userName: user.data.name });
      openNotification('success', 'settings', 'IT IS OFFICIAL! UPDATED!');
      return console.log({ values });
    });
  };

  render() {
    const { form, state } = this.props;
    const { getFieldDecorator } = form;
    const { user } = state;

    return (
      <Row type="flex" align="center">
        <Col xs={23} md={8}>
          <Form onSubmit={this.handleFormSubmit}>
            <StyledFormItem label="Date Range">
              {getFieldDecorator('dateRange', {
                rules: [
                  { type: 'array', required: true, message: 'Please...' },
                ],
                initialValue: [
                  moment(user.data.settings.startDate),
                  moment(user.data.settings.endDate),
                ],
              })(
                <RangePicker />,
              )}
            </StyledFormItem>
            <StyledFormItem label="Opinion">
              {getFieldDecorator('opinion', {
                rules: [
                  { required: true, message: 'Tell us...' },
                ],
                initialValue: user.data.settings.opinion,
              })(<Input type="text" placeholder="Opinion" />)}
            </StyledFormItem>
            <StyledFormItem>
              <StyledButton type="primary" htmlType="submit">
                Update
              </StyledButton>
            </StyledFormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default connect(MemberArea.mapStateToProps, MemberArea.mapDispatchToProps)(Form.create()(MemberArea));
