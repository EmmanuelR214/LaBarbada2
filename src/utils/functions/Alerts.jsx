import { useEffect } from "react";

export const AlertToast = ({auth, err, succ, route}) =>{
  useEffect(() =>{
    if(auth) navigate(route)
    
    if (err && Array.isArray(err)) {
      err.forEach((error) => toast.error(error));
    }
    
    if(succ) {
      succ.forEach((success) => toast.success(success))
    }
  },[auth, err, succ])
}