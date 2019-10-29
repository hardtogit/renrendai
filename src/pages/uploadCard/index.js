import React,{Component} from 'react'
import styles from './index.module.scss'
import {hashHistory} from 'react-router'
import circle from '@/assets/img/addicon.png'
import toast from "@/utils/toast";
class Index extends Component {
    constructor(props) {//构造器
        super(props)
        this.state = {
        }
        this.postive=''
        this.nagetive=''
    }
    static defaultProps = {//设置初始props
    }

    componentWillMount() {
        //组件将要渲染时调用
    }

    componentDidMount() {
        //组件渲染完成时调用
    }
    componentWillUnmount() {
        //组件将要被移除时调用
    }
    handleNext = ()=> {
      if(this.postive&&this.nagetive){
          sessionStorage.setItem('paramsFour',JSON.stringify({postive:this.postive,nagetive:this.nagetive}))
          hashHistory.push('/steptwo')
      }else{
          toast('请先完善质料')
      }
    };
    changeOne=(e)=>{
        const file=e.target.files[0];
        const reader = new FileReader(),
          name=file.name,
          reg=/(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;
        if(reg.test(name)){
            let formData = new FormData();
            formData.append('local_file', file);
            formData.append('proj','rrd');
            fetch('http://47.96.88.157/cgi-bin/upload.pl',{
                method:"POST",
                body:formData
                }).then((res)=> res.json()).then((data)=>{
                this.postive=data.fid
                reader.readAsDataURL(file);
                reader.onload = (ev)=>{
                    this.refs.front.src=ev.target.result
                }
            })
        }else{
            this.refs.front.src=''
            toast('请选择正确的文件')
        }
    };
    changeTwo=(e)=>{
        const file=e.target.files[0];
        const reader = new FileReader(),
            name=file.name,
            reg=/(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;
        if(reg.test(name)){
            let formData = new FormData();
            formData.append('local_file', file);
            formData.append('proj','rrd');
            fetch('http://47.96.88.157/cgi-bin/upload.pl',{
                method:"POST",
                body:formData
            }).then((res)=> res.json()).then((data)=>{
                this.nagetive=data.fid
                reader.readAsDataURL(file);
                reader.onload = (ev)=>{
                    this.refs.back.src=ev.target.result
                }
            })
        }else{
            this.refs.front.src=''
            toast('请选择正确的文件')
        }
    };
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.tip}>
                    用于额度审核，请务必上传本人真实信息。
                </div>
                <div>
                    <div className={styles.content}>
                        <div className={styles.inputFileOne}>
                            <img className={styles.picture} ref="front" src="" alt=""/>
                            <img className={styles.circle} src={circle} alt=""/>
                            <div className={styles.text}>上传本人身份证(正)</div>
                            <input onChange={this.changeOne} ref="file1" className={styles.input} type="file"/>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.inputFileTwo}>
                            <img className={styles.picture} ref="back" src="" alt=""/>
                            <img className={styles.circle} src={circle} alt=""/>
                            <div className={styles.text}>上传本人身份证(反)</div>
                            <input onChange={this.changeTwo} ref="file2" className={styles.input} type="file"/>
                        </div>
                    </div>
                </div>
                <div className={styles.btn} onClick={this.handleNext}>下一步</div>
            </div>
        )
    }
}
export default Index