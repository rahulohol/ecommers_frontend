import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from '../authSlice';
import { selectUserInfo } from '../../user/Usermanagementslice';

function ProtectedAdmin({ children }) {
  // const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo)
  // Instead of reading ONLY from Redux like:
//   const user = useSelector(selectLoggedInUser);
//   if (!user) return null;   ← THIS is your blank screen

// Read from BOTH Redux AND localStorage as fallback:
const reduxUser = useSelector(selectLoggedInUser);
console.log("ProtectedAdmin reduxUser:", reduxUser);
const user = reduxUser || JSON.parse(localStorage.getItem("profile"));

  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (user && user?.result?.role!=='admin' && user?.result?.role!=='superadmin') {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return children;
}

export default ProtectedAdmin;
