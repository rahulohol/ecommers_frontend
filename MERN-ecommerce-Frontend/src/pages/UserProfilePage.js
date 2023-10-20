import NavBar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

function UserProfilePage() {
  return (
    <div>
      <NavBar>
        <h1 className="mx-auto text-2xl bg-white text-center pt-2 pb-2 font-bold tracking-tight">
          My Profile
        </h1>
        <UserProfile></UserProfile>
      </NavBar>
    </div>
  );
}

export default UserProfilePage;
