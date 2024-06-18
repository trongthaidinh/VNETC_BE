export const ErrRes = (statusCode,message) =>{
  const err = {
    status:false,
    statusCode:statusCode,
    message:message
  }
  return err
}