import React from "react";
import {
  Route,
  Link,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Listado from "./screens/Listado";
import Busqueda from "./components/Busqueda";
import Detalle from "./screens/Detalle";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Busqueda />}>
        <Route path="items" element={<Listado />} />
        <Route path="items/:id" element={<Detalle />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    )
  );

  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

function NoMatch() {
  return (
    <div>
      <h2>Nada para ver aquí!</h2>
      <p>
        <Link to="/">Ir a la Busqueda</Link>
      </p>
    </div>
  );
}
