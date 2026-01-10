//request Handler is a function coming from healthcheck controller 
export const asyncHandler=(requesHandler)=>{
    return (req,res,next)=>{
            Promise.resolve(requesHandler(req,res,next))
            .catch((err)=>next(err))
    }
}