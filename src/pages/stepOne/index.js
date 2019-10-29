import React, {Component} from 'react';
import {hashHistory} from 'react-router'
import BestInput from '@/components/BestInput'
import Picker from 'better-picker'
import toast from '@/utils/toast'
import styles from './index.module.scss'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      role:'',
      grade:''
    }
    this.sfPicker = new Picker({
      data: [[{text:'学生',value:'学生'},{text:'我已工作',value:'我已工作'},{text:'其他',value:'其他'}]],
      selectedIndex: [0],
      // title: '请选择身份'
    });
    this.xlPicker=new Picker({
      data: [[{text:'高中以下',value:'高中以下'},{text:'大专',value:'大专'},{text:'本科',value:'本科'},{text:'研究生',value:'研究生'}]],
      selectedIndex: [0],
      // title: '我们都是小学生'
    });
  }


  componentDidMount() {
    const $this=this
    this.sfPicker.on('picker.select', function (selectedVal) {
      $this.setState({
        role:selectedVal[0]
      })
    })
    this.xlPicker.on('picker.select', function (selectedVal) {
      $this.setState({
        grade:selectedVal[0]
      })
    })
  }
  handleNext=()=>{
    const params={
      role:this.state.role,
      grade:this.state.grade,
      name:this.name.value,
      home_add:this.home_add.value,
      com_name:this.com_name.value,
      com_phone:this.com_phone.value,
      com_add:this.com_add.value,
      idcard:this.idcard.value
    }
    if(params.role&&params.grade&&params.name&&params.idcard&&params.home_add){
      sessionStorage.setItem('paramsOne',JSON.stringify(params))
      hashHistory.push('/uploadcard')
    }else{
      toast('请完善信息！')
    }

  }

  render() {
    const{role,grade}=this.state
    return (
      <div style={{height:'400px'}}>
        <BestInput getInput={(name)=>{this.name=name}} label='姓名' right='请输入内容'/>
        <BestInput getInput={(idcard)=>{this.idcard=idcard}} label='身份证' right='请输入内容'/>
        <BestInput getInput={(home_add)=>{this.home_add=home_add}} label='家庭地址' right='请输入内容'/>
        <BestInput getInput={(com_name)=>{this.com_name=com_name}} label='公司名称' right='请输入内容'/>
        <BestInput getInput={(com_phone)=>{this.com_phone=com_phone}} label='公司电话' right='请输入内容'/>
        <BestInput getInput={(com_add)=>{this.com_add=com_add}} label='公司地址' right='请输入内容'/>
        <BestInput label='当前身份' right={false}>
          <div style={{textAlign:'right',flex:1,fontSize:'.15rem'}} onClick={()=>this.sfPicker.show()}>
            {role?<span style={{color:'#333'}}>{role}</span>:<span style={{color:'#777'}}>点击选择</span>}
          </div>
        </BestInput>
        <BestInput label='学历水平' right={false}>
          <div style={{textAlign:'right',flex:1,fontSize:'.15rem'}} onClick={()=>this.xlPicker.show()}>
            {grade?<span style={{color:'#333'}}>{grade}</span>:<span style={{color:'#777'}}>点击选择</span>}
          </div>
        </BestInput>
        <div className={styles.btn} onClick={this.handleNext}>下一步</div>
      </div>
    );
  }
}
export default Index;
