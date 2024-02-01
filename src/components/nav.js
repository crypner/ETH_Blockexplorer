import { Outlet, NavLink } from "react-router-dom";

const Navbar = () => {
    const navigation = [
        { title: "Latest Blocks", path: "/" },
        { title: "Account", path: "account-balance" },
        { title: "NFTs", path: "nfts" },
    ];
    
    return (
        <>
            <nav className="navbar navbar-expand-sm justify-content-center">
                <ul className="navbar-nav">
                    {navigation.map((item, idx) => {
                        return (
                            <li key={idx} className="nav-item">
                                <NavLink className="nav-link" to={item.path} exact>{item.title}</NavLink>
                            </li>                            
                        );
                    })}
                </ul>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar;