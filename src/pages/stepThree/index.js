import React, {Component} from 'react';
import Comfirm from '@/components/Modal/confirm'
import Fetch from '@/utils/baseSever'
import {hashHistory} from 'react-router'
import BestInput from '@/components/BestInput'
import styles from './index.module.scss'
class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible:false
    }
  }
  handleSubmit=()=>{
    const paramsThree={
      card_name:this.card_name.value,
      card_id:this.card_id.value,
      card_num:this.card_num.value,
      card_bank:this.card_bank.value,
    }
    const params={...JSON.parse(sessionStorage.getItem('paramsOne')),
        ...JSON.parse(sessionStorage.getItem('paramsTwo')),
        ...JSON.parse(sessionStorage.getItem('paramsFour')),
        ...paramsThree}
    console.log(params)
    Fetch({
      obj:'user',
      act:'loanrequest',
      ...params
    }).then(()=>{
      this.setState({visible:true})
    }).catch(()=>{

    })
  }
  render() {
    const {visible}=this.state
    return (
      <div style={{height:'400px'}}>
        <div className={styles.tip}>提现银行卡信息</div>
        <BestInput getInput={(card_name)=>{this.card_name=card_name}} label='姓名' right='请输入内容'/>
        <BestInput getInput={(card_id)=>{this.card_id=card_id}} label='身份证' right='请输入内容'/>
        <BestInput getInput={(card_num)=>{this.card_num=card_num}} label='卡号' type='number' right='请输入内容'/>
        <BestInput getInput={(card_bank)=>{this.card_bank=card_bank}} label='开户行' right='请输入内容'/>
        <div className={styles.btn} onClick={this.handleSubmit} >提交</div>
        { visible&&<Comfirm title='提示' okText='确定'
                            onOk={()=>{
                            this.setState({
                            visible:false},()=>{
                              hashHistory.push('/home')
                              }
                            )}}
                            onCancel={()=>{
                              this.setState({
                                  visible:false},()=>{
                                  hashHistory.push('/home')
                                }
                              )}}
                            cancelText='取消'>
          您的贷款申请信息已提交，将在20分钟 内审核，并给予额度，届时将于短信方 式通知。
        </Comfirm>}
      </div>
    );
  }
}

export default Index;
