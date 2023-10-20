import {
  Link,
  Outlet,
  createSearchParams,
  useNavigate,
} from "react-router-dom";
import "./styles.scss";
import logo from "../../assets/Logo_ML.png";
import search from "../../assets/ic_Search.png";

function Busqueda() {
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let search = formData.get("search") as string;
    if (!search) return;
    navigate({
      pathname: "items",
      search: `?${createSearchParams({
        search,
      })}`,
    });
  }

  return (
    <div>
      <nav>
        <form onSubmit={handleSubmit} target="items">
          <div className="row col-xs-10 col-xs-offset-1 col-gutter-lr">
            <div className="col-xs-1">
              <Link to={"/"}>
                <img src={logo} alt="Logo Mercado Libre" />
              </Link>
            </div>
            <div className="col search-container">
              <input
                className="search-input"
                type="text"
                name="search"
                placeholder="Nunca dejes de buscar"
              />
              <button type="submit" className="search-button">
                <img src={search} alt="Boton Busqueda" />
              </button>
            </div>
          </div>
        </form>
      </nav>
      <div className="container">
        <div className="col-xs-10 col-xs-offset-1 col-gutter-lr">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Busqueda;
