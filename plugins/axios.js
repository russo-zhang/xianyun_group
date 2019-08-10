import {Message} from "element-ui"

export default function({$axios,redirect}){
  $axios.onError(err=>{
    const {statusCode,message} = err.response.data
    if(statusCode===400){
      Message.warning({message})
    }else if(statusCode===401||statusCode===403){
      redirect("/login")
    }else if(statusCode===404){
      // redirect("/empty")
    }
  })
}