import React, { FC } from "react";
import { useQuery } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";
import { Inventory } from "./components/index";
import { TShopItem } from "./components/interfaces";

const getProducts = async (): Promise<TShopItem[]> =>
  await (
    await fetch("https://merillbackend.herokuapp.com/getShopItems")
  ).json();

export const App: FC = () => {
  const { data, isLoading, error } = useQuery<TShopItem[]>(
    "products",
    getProducts
  );

  if (error) {
    return <div>Something went wrong... </div>;
  } else if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else {
    return <Inventory shopItems={data} />;
  }
};

export default App;
