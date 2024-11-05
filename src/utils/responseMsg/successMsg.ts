interface SuccessMsg{
    success:boolean,
    msg:string|null,
}


const getMessage=({success,msg}:SuccessMsg)=>{
    return {
        success:success,
        msg:msg,
    }
}


export default getMessage