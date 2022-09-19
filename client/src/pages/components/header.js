import { Link } from "react-router-dom";

const Header = () => {



    return (
        <header className="mb-4">
            <div className="container border-bottom d-flex flex-wrap justify-content-center py-3">
                <Link
                    to="/"
                    className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
                >
                    <span className="fs-4">Mantstagramas</span>
                </Link>

                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link to="/home-page" className="nav-link" aria-current="page">
                            Titulinis
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/new" className="nav-link" aria-current="page">
                            Naujas Straipsnis
                        </Link></li>

                    <li className="nav-item">
                        <Link to="/logout" className="nav-link" aria-current="page">
                            Log Out
                        </Link></li>


                    <li className="nav-item">
                        <Link to="/" className="nav-link" aria-current="page">
                            Prisijungti
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link" aria-current="page">
                            Registruotis
                        </Link>
                    </li>


                </ul>
                {/* <div>
                    Sveiki, {userInfo.first_name + '  ' + userInfo.last_name}
                </div> */}
            </div>
        </header>
    )

}
export default Header;
