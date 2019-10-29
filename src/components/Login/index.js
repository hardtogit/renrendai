import React, {Component} from 'react';
import Confirm from '@/components/Modal/confirm'
import {hashHistory} from 'react-router'
import Base from '@/components/Modal/base'
import phone from '@/assets/img/phone.png'
import Fetch from '@/utils/baseSever'
import code from '@/assets/img/code.png'
import classNames from "classnames";
import toast from '@/utils/toast'
import styles from './index.module.scss'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      codeText:'获取验证码'
    }
    this.tirm=undefined
  }

  sendCode=()=>{
    const {codeText}=this.state
    if(codeText==='获取验证码'){
      Fetch({
        obj:'user',
        act:'getcode',
        type:'login',
        phone:this.phone.value
      }).then(()=>{
        toast('验证码发送成功')
      })
      this.setState({
        codeText:60
      },()=>{
        this.tirm=setInterval(()=>{
           if(this.state.codeText<=1){
             clearInterval(this.tirm)
             this.setState({
               codeText:'获取验证码'
             })
           }else{
            this.setState({
              codeText:this.state.codeText-1
            })
           }
        },1000)
      })
    }
  }
  handleSubmit=()=>{
    const params={
      login_name:this.phone.value,
      code :this.code.value
    }
    Fetch({
      xtype:'user',
      obj:'person',
      act:'login',
      ...params
    }).then((data)=>{
      if(data.flag==='true'){
        this.props.onCancel()
        this.props.loginFn()
      }else{
        this.props.onCancel()
        hashHistory.push('/stepone')
      }
    })
  }
  render() {
    const {codeText}=this.state
    return (
      <Base onCancel={this.props.onCancel}>
        <div className={styles.baseModal}>
          <div className={styles.title}>
            登陆
          </div>
          <div className={classNames([styles.inputGroup,styles.phone])}>
            <img className={styles.iconOne} src={phone} alt=""/>
            <input ref={(phone)=>{this.phone=phone}} type='number' className={styles.input} type="text"/>
          </div>
          <div className={classNames([styles.inputGroup,styles.code]) }>
            <img className={styles.icon} src={code} alt=""/>
            <div className={styles.input}>
              <input ref={(code)=>{this.code=code}} type='number' className={styles.inputInner} type="text"/>
              <div className={styles.sendBtn} onClick={this.sendCode}>
                {codeText==='获取验证码'?'获取验证码':`${codeText}s`}
              </div>
            </div>
          </div>
          <div onClick={this.handleSubmit} className={styles.loginBtn}>
            登陆
          </div>
        </div>
      </Base>
    );
  }
}

export default Index;
