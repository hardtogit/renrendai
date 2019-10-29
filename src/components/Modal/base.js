import React, {Component} from 'react';
import close from '@/assets/img/close2.png'
import styles from './index.module.scss'

class Base extends Component {
  render() {
    const {onCancel}=this.props
    return (
      < div className={styles.model}>
        < div  className={styles.container}>
          <div className={styles.relative}>
            {this.props.children}
            <img onClick={onCancel} className={styles.icon} src={close} alt=""/>
          </div>
        </div>
        <div className={styles.bg}/>
      </div>
        );
    }
}
export default Base;
