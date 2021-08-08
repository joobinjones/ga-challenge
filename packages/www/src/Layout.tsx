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
  sortField: string;
  setSortField: Function;
}

const getData = (): Promise<AxiosResponse<any>> => {
  return axios.get("https://ga-challenge-api.vercel.app/");
};

const sortData = (
  data: Array<IGame>,
  sortField: keyof IGame,
  sortByGreatest: boolean
): Array<IGame> => {
  console.log("TYPE:", typeof data[0][sortField]);
  return data.sort((a: IGame, b: IGame) => +a[sortField] - +b[sortField]);
};

const Layout = (): JSX.Element => {
  const [data, setData] = useState<Array<IGame>>([]);
  const [resetClicked, setResetClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortField, setSortField] = useState<keyof IGame | null>(null);
  // unsorted data
  useEffect(() => {
    setIsLoading(() => true);
    if (sortField) {
      const sortedData: Array<IGame> = sortData(data, sortField, true);
      setData(() => sortedData);
    } else {
      getData()
        .then((res) => setData(() => res.data.data))
        .catch(console.error);
    }
    setIsLoading(() => false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetClicked, sortField]);

  const context = {
    data,
    setData,
    resetClicked,
    setResetClicked,
    isLoading,
    setIsLoading,
    sortField,
    setSortField,
  };
  console.log(data);
  return (
    <div>
      <Context.Provider value={context}>
        <Table />
      </Context.Provider>
    </div>
  );
};

export default Layout;
