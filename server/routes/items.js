var express = require("express");
var router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const MELI_ITEMS_API = "https://api.mercadolibre.com/sites/MLA/";
const MELI_DETAIL_API = "https://api.mercadolibre.com/items/";

function sortCategories(filtros) {
  let paths = [];
  filtros?.map((filtro) => {
    if (filtro?.id === "category") {
      filtro.values[0]?.path_from_root.map((path) => {
        paths.push(path.name);
      });
    }
  });

  return paths;
}

router.get("/", async function (req, res) {
  try {
    const response = await fetch(
      `${MELI_ITEMS_API}search?q=${req.query.search}&limit=${req.query.limit}`
    );
    const json = await response.json();
    const { results, filters } = json;

    const body = {
      items: results?.map((item) => {
        const {
          id,
          title,
          currency_id,
          price,
          decimals,
          thumbnail,
          condition,
          shipping: { free_shipping },
          address: { state_name, city_name },
        } = item;
        return {
          id: id,
          title: title,
          price: {
            currency: currency_id,
            amount: price,
            // Se intenta obtener campo decimals
            // si no existe se utiliza undefined
            // Frontend decide que mostrar.
            decimals: decimals || undefined,
          },
          picture: thumbnail,
          condition: condition,
          free_shipping: free_shipping,
          state: state_name,
          city: city_name,
        };
      }),
      categories: sortCategories(filters),
    };
    res.status(200).json(body);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const [details, description] = await Promise.all([
      fetch(`${MELI_DETAIL_API}${req.params.id}`).then((value) => value.json()),
      fetch(`${MELI_DETAIL_API}${req.params.id}/description`).then((value) =>
        value.json()
      ),
    ]);

    const {
      id,
      title,
      currency_id,
      price,
      decimals,
      pictures,
      condition,
      shipping: { free_shipping },
      sold_quantity,
    } = details;
    const { plain_text } = description;

    const body = {
      item: {
        id: id,
        title: title,
        price: {
          currency: currency_id,
          amount: price,
          decimals: decimals || undefined,
        },
        picture: pictures[0].secure_url,
        condition: condition,
        free_shipping: free_shipping,
        sold_quantity: sold_quantity,
        description: plain_text,
      },
    };
    res.status(200).json(body);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

module.exports = router;
