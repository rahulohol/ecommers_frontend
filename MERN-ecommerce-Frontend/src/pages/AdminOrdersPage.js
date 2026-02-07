import AdminOrderList from "../features/admin/components/Adminorderlist";
// import AdminOrders from "../features/admin/components/AdminOrders";
import NavBar from "../features/navbar/Navbar";

function AdminOrdersPage() {
    return ( 
        <div>
            <NavBar>
                <AdminOrderList></AdminOrderList>
            </NavBar>
        </div>
     );
}

export default AdminOrdersPage;