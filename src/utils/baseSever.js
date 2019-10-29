import { Promise } from 'es6-promise';

export default (params)=>{
  if(params.xtype==='user'){
    return new Promise((resolve,reject)=>{
      if (window.callBackFn['person_login']) {
        window.callBackFn['person_login'].push((response,type)=>{
          if(type==='success'){
            resolve(response);
          }else{
            reject(response)
          }
        });
      } else {
        window.callBackFn['person_login'] = [(response,type)=>{
          if(type==='success'){
            resolve(response);
          }else{
            reject(response)
          }
        }];
      }
      window.apiconn.loginx({...params,ctype:'user',level:'user'});
    });
  }
  return new Promise((resolve,reject)=>{
    if (window.callBackFn[params.obj + '_' + params.act]) {
      window.callBackFn[params.obj + '_' + params.act].push((response,type)=>{
        if(type==='success'){
          resolve(response);
        }else{
          reject(response)
        }
      });
    } else {
      window.callBackFn[params.obj + '_' + params.act] = [(response,type)=>{
        if(type==='success'){
          resolve(response);
        }else{
          reject(response)
        }
      }];
    }
    if(window.apiconn.conn_state==='IN_SESSION'){
      window.apiconn.send_obj(params);
    }else{
      setTimeout(()=>{
        window.apiconn.send_obj(params);
      },1000);
    }
  });
};
