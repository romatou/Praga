export const isAuthMiddleware = (req:any, res:any, next:any) => {
  console.log('authCookie:', req.cookies.authCookie)
  if(!req.cookies.authCookie && !req.cookies.uuid ) {
console.log(res)
    return res.send(console.log('no cookies'))
    
  } else {
    
    return next()
  }
}