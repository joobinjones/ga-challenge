import axios, { AxiosResponse } from "axios";
import Table from "./components/Table";
import { useEffect, useState } from "react";
import { Context } from "./components/context";

export interface IGame {
  gameID: number;
  area: number;
  bank: number;
  zone: number;
  stand: number;
  asset: number;
  netWin: number;
  oldDenom: number;
  newDenom: number;
  oldPayback: number;
  newPayback: number;
  date: string;
}

export interface IContext {
  data: Array<IGame | null>;
  setData: Function;
  resetClicked: boolean;
  setResetClicked: Function;
  isLoading: boolean;
  setIsLoading: Function;
  sort: string;
  setSort: Function;
}

const getData = () => {
  return axios.get("https://ga-challenge-api.vercel.app/");
};

const Layout = (): JSX.Element => {
  const [data, setData] = useState<Array<IGame | null>>([]);
  const [resetClicked, setResetClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("");
  const context = {
    data,
    setData,
    resetClicked,
    setResetClicked,
    isLoading,
    setIsLoading,
    sort,
    setSort,
  };
  // unsorted data
  useEffect(() => {
    setIsLoading(() => true);
    getData()
      .then((res) => res.data.data)
      .then(setData)
      .then(() => setIsLoading(() => false))
      .catch(console.error);
  }, [resetClicked]);

  useEffect(() => {});
  return (
    <div>
      <Context.Provider value={context}>
        <Table />
      </Context.Provider>
    </div>
  );
};

export default Layout;
