import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles.scss";
import { Condicion, DetailsResponse } from "./types";
import currency from "../../utils/currency";
import Breadcrumbs from "../../components/Breadcrumbs";
import { empty_item } from "../Listado/types";
import { useCategory } from "../../context/CategoryContext";

function Detalle() {
  const params = useParams();
  const { categories: categoriesInContext } = useCategory();
  const [loaded, setLoaded] = useState<boolean>(false);
  const { id } = params;
  const [data, setData] = useState<DetailsResponse>({
    item: empty_item,
  });
  const { item } = data;

  useEffect(() => {
    fetch(`http://localhost:3001/api/items/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoaded(true);
      })
      .catch((error) => console.error(error));
  }, [id]);
  return (
    <div>
      {item && loaded && (
        <div>
          <Breadcrumbs categories={categoriesInContext} />
          <section id="detalle" className="detalle-container">
            <div className="row">
              <img
                src={item?.picture}
                alt={`Producto imagen ${item?.title}`}
                className="detalle-imagen"
              />
              <div className="col item-container">
                <span className="item-above-title">
                  {Condicion[item?.condition as keyof typeof Condicion]} -{" "}
                  {item?.sold_quantity} vendidos
                </span>
                <p className="item-title">{item?.title}</p>
                <span className="item-price">
                  {currency(item?.price?.amount)}
                </span>
                <button>Comprar</button>
              </div>
            </div>
            <div className="col-xs-8 descripcion">
              <h2>Descripción del producto</h2>
              <p>{item?.description}</p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Detalle;
