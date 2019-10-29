import React, {Component} from 'react';
import Confirm from '@/components/Modal/confirm'
import {hashHistory} from 'react-router'
import Fetch from '@/utils/baseSever'
import logo from '@/assets/img/logo.png'
import toast from '@/utils/toast'
import {staticPathDown} from '@/config/setting'
import Login from '@/components/Login'
import styles from './index.module.scss'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginV: false,
      ideaV: false,
      serveV: false,
      washV:false,
      warnV: false,
      serve: {},
      entity: {}
    }
  }
  componentDidMount() {
    if(window.apiconn.conn_state==='CONNECTING'||window.apiconn.conn_state==='IN_SESSION'){
      this.getData()
    }else{
      this.setState({
        warnV: true
      })
    }
  }
  getData=()=>{
    Fetch({
      obj: 'user',
      act: 'readmyinfo'
    }).then((data) => {
      this.setState({
        entity: data.info
      })
    }).catch(() => {
      this.setState({
        warnV: true
      })
    })
    //获取客服信息
    Fetch({
      obj: 'user',
      act: 'readsevice'
    }).then((data) => {
      this.setState({
        serve: data.info
      })
    })
  }

  submitIdea = () => {
    Fetch({
      obj: 'user',
      act: 'commentreq',
      comment: this.idea.value
    }).then(() => {
      toast('提交成功')
      this.setState({
        ideaV: false
      })
    })
  };
  handleWash=()=>{
    Fetch({
      obj: 'user',
      act: 'setstatus',
    }).then(() => {
      this.setState({
        washV: true
      })
    })
  }

  render() {
    const {loginV, entity, ideaV, serveV, warnV,washV, serve} = this.state
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <img className={styles.img} src={logo} alt=""/>
          </div>
          <div className={styles.right}>
            {
              entity.phone ? <div>
                <div className={styles.item}>
                  <div className={styles.label}>手机号：</div>
                  <div className={styles.value}>{entity.phone}</div>
                </div>
                <div className={styles.item}>
                  <div className={styles.label}>
                    贷款编号：
                  </div>
                  <div className={styles.value}>
                    {entity.order_id}
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.label}>
                    审核状态：
                  </div>
                  <div className={styles.value}>
                    {entity.status}
                  </div>
                </div>
              </div> : <div onClick={() => {
                this.setState({
                  warnV: true
                })
              }} className={styles.login}>登陆/注册</div>
            }

          </div>
        </div>
        <div className={styles.bar}>
          <div className={styles.left}>
            <img className={styles.img}
                 src="http://47.96.88.157/cgi-bin/download.pl?fid=f15722466230771019458001&proj=rrd"/>
            <span className={styles.label}>额度:</span>
            <span className={styles.num}>{entity.money}</span>
          </div>
          <div className={styles.right}>
            <img className={styles.img}
                 src="http://47.96.88.157/cgi-bin/download.pl?fid=f15722466230771019458001&proj=rrd"/>
            <div className={styles.label}>可用额度:</div>
            <div className={styles.num}>{entity.left_money}</div>
          </div>
        </div>
        {entity.flag==='true'&&<div onClick={this.handleWash} className={styles.washBtn}>
          提现
          </div>}
        {
          entity.flag==='false'&&<div onClick={()=>hashHistory.push('/stepone')} className={styles.washBtn}>
          获取额度
          </div>
        }
        <div className={styles.content}>
          <div className={styles.left} onClick={() => {
            this.setState({ideaV: true})
          }}>
            <img className={styles.img}
                 src="http://47.96.88.157/cgi-bin/download.pl?fid=f15722467446921908855001&proj=rrd"/>
            <div className={styles.text}>建议意见</div>
          </div>
          <div className={styles.right} onClick={() => {
            this.setState({serveV: true})
          }}>
            <img className={styles.img}
                 src="http://47.96.88.157/cgi-bin/download.pl?fid=f15722467671039819717001&proj=rrd"/>
            <div className={styles.text}>客服中心</div>
          </div>
        </div>
        {warnV && <Confirm title='用户隐私保护提醒'
                           onOk={() => {
                             this.setState({warnV: false, loginV: true})
                           }}
                           onCancel={() => {
                             this.setState({warnV: false})
                           }}
                           okText='确定' cancelText='取消'>
          <div style={{maxHeight: '240px', overflow: 'auto'}}>
            <h4 style={{textAlign: 'center'}}>淮安农金</h4>
            <p style={{textAlign: 'center'}}>个人消费贷款客户知情及风险告知书</p>
            <p>尊敬的客户：</p>
            <p>您好！</p>
            <p>欢迎您申请即分期平台与银行合作的个人消费贷款业务， 用于满足您本人消费目的的贷款需 求。</p>
            <p>现特别提示您以下事项：</p>
            <p> 1.

              您已同意并授权银行向

              中国人民银行个人信用信息基础数据库

              以及其他经政府有权部门

              批准合法设立的信息库查询并留存您的个人征信记录、

              财产、

              资信等其他相关情况，

              用于审

              核您所提交的贷款申请。</p>
            <p> 2.

              您授权并同意银行将您的还款记录报送至

              中国人民银行全国个人征信系统

              ，

              违约情况将被

              记入您的征信记录，影响到您今后办理信用卡、房贷、车贷等各类金融业务。</p>
            <p>3.

              请您在还款日保持还款账户内余额充足，若因余额不足、还款账户状态不正常等原因导致

              未能按时归还应还未还款项即为贷款逾期，

              由此产生的逾期滞纳金、

              罚息及人行征信负面影

              响将由您个人承担。</p>
            <p>4.

              贷款生效后，您在消费过程中所发生的任何纠纷，包括您在消费中由商品或服务质量产生

              的问题，均不影响您的还款义务。您需按时偿还未清偿款项，直至贷款全部结清。</p>
            <p>
              5.

              任何人以

              申请现金贷款，信用卡、找兼职工作、贷款返现

              等与您本人个人消费需求无关的

              理由要求您申请此笔贷款均属诈骗行为，

              并会被追究刑事责任。
            </p>
          <p>
            6.

            您已知晓，任何以不真实名义、虚假交易或联合非法中介等骗贷的行为，属于违法违规行

            为，将会被追究相关法律责任。
          </p>
            <p>
              7.

              请您确认本贷款为您本人自愿办理，本人承诺按时还款，贷款还款账号为本人名下的银行

              卡。


              郑重提示：请您谨慎衡量您的还款能力，并珍惜您的信用记录，认真履行还款义务！


              本人已清楚知晓上述信息，

              不会以商品或服务质量和本人与商户的纠纷等理由拒绝还款。

              本人承诺所提供的个人信息均真实有效并自愿承担因贷款逾期所产生的一切后果。
            </p>
          </div>
        </Confirm>}
        {loginV && <Login loginFn={()=>{
          this.getData()
        }} onCancel={() => this.setState({loginV: false})}/>}
        {ideaV && <Confirm title='意见反馈' okText='提交' cancelText='取消'
                           onCancel={() => {
                             this.setState({ideaV: false})
                           }}
                           onOk={this.submitIdea}>
          <textarea ref={(idea) => {
            this.idea = idea
          }} className={styles.area} placeholder='请输入您的建议或意见'>

          </textarea>
        </Confirm>}
        {serveV && <Confirm title='客服中心' okText='确定' cancelText='取消'
                            onCancel={() => {
                              this.setState({serveV: false})
                            }}
                            onOk={() => {
                              this.setState({serveV: false})
                            }}>
          <div style={{paddingLeft: '20px'}}>姓名：{serve.name}</div>
          <div style={{paddingLeft: '20px', marginTop: '10px'}}>电话：{serve.phone}</div>
        </Confirm>}
        {washV&&<Confirm title='提示' okText='确定' cancelText='取消'
                         onCancel={() => {
                           this.setState({washV: false})
                         }}
                         onOk={() => {
                           this.setState({washV: false})
                         }}>
          提现申请发起成功，等待管理人员审核！
        </Confirm>}
      </div>


    );
  }
}

export default Index;
