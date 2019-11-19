import React, { Component } from "react";
import { Form, Icon, Input, Button, message } from "antd";
import axios from 'axios'
import mimi from "./mimi2.jpg";
import "./index.less";

const { Item } = Form

class Login extends Component {
  validator = (rule, value, callback) => {
    const name = rule.field === "username" ? "用户名" : "密码";
    if(!value) {
      callback('请输入'+ name)
    } else if (value.length < 4){
      callback(name + '不能少于4位');
    }else if (value.length > 13){
      callback(name + '不能大于13位');
    } else if(!/\w/.test(value)){
      callback(name + '只能为字母、数值和下划线')
    } else {
      callback();
    }
  }

  login = e => {
   
    
    e.preventDefault();
    const { form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        axios
          .post('http://localhost:5000/api/login',values)
          .then(response => {
            if(response.data.status === 0){
              this.props.history.push("/");
              console.log(1);
            } else{
              message.error(response.data.msg);
              form.resetFields(["password"]);
            }
          })
          .catch((err) => {
            console.log(err);
            message.error('网络出现问题，请刷新重试');
            form.resetFields(["password"]);
          })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={mimi} alt="logo" />
          <h1>胖虎的后台管理系统</h1>
        </header>

        <Form className="login-form" onSubmit={this.login}>
          <h2>用户登录</h2>
          <Item>
            {getFieldDecorator("username", {
              rules: [
                { validator: this.validator }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入用户名"
              />
            )}
          </Item>
          <Item>
            {getFieldDecorator("password", {
              rules: [
                { validator: this.validator }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="请输入密码"
              />
            )}
          </Item>
          <Item>
            <Button type="primary" className="login-button" htmlType="submit">
              登录
            </Button>
          </Item>
        </Form>
      </div>
    );
  }
}
export default Form.create()(Login);
