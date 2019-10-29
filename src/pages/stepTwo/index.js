import React, {Component} from 'react';
import {hashHistory} from 'react-router'
import BestInput from '@/components/BestInput'
import styles from './index.module.scss'
import toast from "@/utils/toast";
import Picker from "better-picker";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      con1_rel:'',
      con2_rel:''
    }
    this.onePicker = new Picker({
      data: [[{text:'亲属',value:'亲属'},{text:'朋友',value:'朋友'},{text:'同事',value:'同事'},{text:'其他',value:'其他'}]],
      selectedIndex: [0],
      // title: '请选择身份'
    });
    this.twoPicker = new Picker({
      data: [[{text:'亲属',value:'亲属'},{text:'朋友',value:'朋友'},{text:'同事',value:'同事'},{text:'其他',value:'其他'}]],
      selectedIndex: [0],
      // title: '请选择身份'
    });
  }
  componentDidMount(){
    const $this=this
    this.onePicker.on('picker.select', function (selectedVal) {
      $this.setState({
        con1_rel:selectedVal[0]
      })
    })
    this.twoPicker.on('picker.select', function (selectedVal) {
      $this.setState({
        con2_rel:selectedVal[0]
      })
    })
  }
  handleNext=()=>{
    const params={
      con1_name:this.con1_name.value,
      con1_rel:this.state.con1_rel,
      con1_phone:this.con1_phone.value,
      con2_name:this.con2_name.value,
      con2_rel:this.state.con2_rel,
      con2_phone:this.con2_phone.value
    }
    if(params.con1_name&&params.con1_rel&&params.con1_phone&&params.con2_name&&params.con2_rel&&params.con2_phone){
      sessionStorage.setItem('paramsTwo',JSON.stringify(params))
      hashHistory.push('/stepthree')
    }else{
      toast('请完善信息！')
    }
  }
  render() {
    const {con1_rel,con2_rel}=this.state
    return (
      <div style={{height:'400px'}}>
        <div className={styles.tip}>紧急联系人1</div>
        <BestInput getInput={(con1_name)=>{this.con1_name=con1_name}} label='姓名' right='请输入内容'/>
        <BestInput  label='与本人关系' right={false}>
          <div style={{textAlign:'right',flex:1,fontSize:'.15rem'}} onClick={()=>this.onePicker.show()}>
            {con1_rel?<span style={{color:'#333'}}>{con1_rel}</span>:<span style={{color:'#777'}}>点击选择</span>}
          </div>
        </BestInput>
        <BestInput getInput={(con1_phone)=>{this.con1_phone=con1_phone}} label='手机号码' type='number' right='请输入内容'/>
        <div className={styles.tip}>紧急联系人2</div>
        <BestInput getInput={(con2_name)=>{this.con2_name=con2_name}} label='姓名' right='请输入内容'/>
        <BestInput label='与本人关系' right={false}>
          <div style={{textAlign:'right',flex:1,fontSize:'.15rem'}} onClick={()=>this.twoPicker.show()}>
            {con2_rel?<span style={{color:'#333'}}>{con2_rel}</span>:<span style={{color:'#777'}}>点击选择</span>}
          </div>
        </BestInput>
        <BestInput getInput={(con2_phone)=>{this.con2_phone=con2_phone}} label='手机号码' type='number' right='请输入内容'/>
        <div className={styles.btn} onClick={()=>this.handleNext()}>下一步</div>
      </div>
    );
  }
}

export default Index;
