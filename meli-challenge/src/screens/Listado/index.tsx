import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import free_shipping_image from "../../assets/ic_shipping.png";
import "./styles.scss";
import { ItemsResponse } from "./types";
import currency from "../../utils/currency";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useCategory } from "../../context/CategoryContext";

function Listado() {
  let [searchParams] = useSearchParams();
  const { categories: categoriesInContext, setCategories } = useCategory();
  const search = searchParams.get("search");
  const [data, setData] = useState<ItemsResponse>({
    items: [],
    categories: [],
  });
  const { items, categories } = data;

  useEffect(() => {
    fetch(`http://localhost:3001/api/items?search=${search}&limit=4`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => console.error(error));
  }, [search]);

  useEffect(() => {
    if(categories.length > 0) {
      setCategories(categories);
    }
  })

  return (
    <div>
      {items.length > 0 && (
        <div>
          <Breadcrumbs categories={categoriesInContext} />
          <section id="listado" className="listado-container">
            {items?.map((item, index) => {
              return (
                <Link
                  to={`/items/${item?.id}`}
                  key={item.id}
                  className="item-link"
                >
                  <div className="row">
                    <img
                      src={item.picture}
                      alt={`Thumbnail Producto ${item.title}`}
                      className="thumbnail"
                    />
                    <div className="col">
                      <p className="item-price">
                        {currency(item?.price?.amount)}
                        {item.free_shipping && (
                          <img src={free_shipping_image} alt="Free Shipping" />
                        )}
                        <span className="">
                          {item?.city}, {item?.state}
                        </span>
                      </p>
                      <div className="item-title">
                        <span>{item?.title}</span>
                      </div>
                    </div>
                  </div>
                  {index < items.length - 1 && <span className="divider" />}
                </Link>
              );
            })}
          </section>
        </div>
      )}
    </div>
  );
}

export default Listado;
