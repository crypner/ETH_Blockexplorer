import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/nav";
import Blocks from "./components/blocks";
import AccountBalance from "./components/account";
import NoPage from "./components/_404";
import NFTs from "./components/nft";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar/>}>
            <Route index element={<Blocks />} />
            <Route path="/account-balance" element={<AccountBalance />} />
            <Route path="/nfts" element={<NFTs />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
