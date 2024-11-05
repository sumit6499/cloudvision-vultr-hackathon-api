interface ErrorMsg{
    success:boolean,
    error:unknown,
    msg:string,
}


const getErrorMsg=({success,error,msg}:ErrorMsg)=>{
    return {
        success:success,
        error:error,
        msg:msg,
    }
}

export default getErrorMsg
