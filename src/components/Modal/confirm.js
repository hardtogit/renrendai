import React, {Component} from 'react';
import classNames from 'classnames'
import styles from './index.module.scss'

class Base extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible:false
    }
  }

  show(){
    this.visible=true
  }
  hide(){
    this.visible=false
  }
  render() {
    const {visible}=this.state
    const {title,children,cancelText,okText,onOk,onCancel}=this.props
    return (
      < div className={styles.model}>
        < div  className={styles.container}>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.content}>
            {children}
          </div>
          <div className={styles.btns}>
            <div className={classNames([styles.btn,styles.left])} onClick={onCancel}>{cancelText}</div>
          <div className={classNames([styles.btn,styles.right])} onClick={onOk}>{okText}</div>
        </div>
        </div>
        <div className={styles.bg}/>
      </div>

    );
  }
}
export default Base;
