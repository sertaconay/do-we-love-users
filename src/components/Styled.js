import { Form, Button, Layout } from 'antd';
import styled, { injectGlobal } from 'react-emotion';


const FormItem = Form.Item;
const { Content } = Layout;

injectGlobal([`
  .ant-calendar-picker {
    width: 100%;
  }
`]);

export const StyledButton = styled(Button)`
  width: 100%;
`;

export const StyledFormItem = styled(FormItem)`
  margin: 0;
`;

export const StyledLayout = styled(Layout)`
  height: 100vh;
`;

export const StyledContent = styled(Content)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledContentWrapper = styled('div')`
  width: 100%;
  
  .ant-row-flex {
    margin-bottom: 20px;
  }
`;
