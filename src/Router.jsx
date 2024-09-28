import { Route, Routes } from "react-router-dom";
import {
  ComunidadePage,
  Devocoes,
  Home,
  Liturgia,
  Oracoes,
  Sobre,
  Page404,
} from "./pages";
import { LayoutWeb } from "./layouts";

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<LayoutWeb />}>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Sobre" element={<Sobre />} />
          <Route path="/Liturgia" element={<Liturgia />} />
          <Route path="/Oracoes" element={<Oracoes />} />
          <Route path="/Devocoes" element={<Devocoes />} />
          <Route path="/Comunidade" element={<ComunidadePage />} />
          <Route path="*" element={<Page404 />}/>
        </Route>
    </Routes>
  );
};
export { Router };
