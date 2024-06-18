export const SuccessRes = (data,message) =>{
  const res = {
    status:true,
    data:data,
    message:message
  }
  return res
}
