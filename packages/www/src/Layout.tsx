import axios from "axios";
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
  sortByGreatest: boolean;
  setSortByGreatest: Function;
  sortField: string;
  setSortField: Function;
}

const sortData = (
  data: Array<IGame>,
  sortField: keyof IGame,
  sortByGreatest: boolean
): Array<IGame> => {
  console.log("SORT DIRECTION:", sortByGreatest);
  return [...data].sort((a: IGame, b: IGame) => {
    const first = sortByGreatest ? b : a;
    const second = sortByGreatest ? a : b;
    if (sortField === "date") {
      return (
        new Date(first[sortField]).getTime() - new Date(second[sortField]).getTime()
      );
    }
    return +first[sortField] - +second[sortField];
  });
};

const Layout = (): JSX.Element => {
  const [data, setData] = useState<Array<IGame>>([]);
  const [resetClicked, setResetClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortByGreatest, setSortByGreatest] = useState<boolean>(true);
  const [sortField, setSortField] = useState<keyof IGame | null>(null);
  // unsorted data
  useEffect(() => {
    setIsLoading(() => true);
    if (sortField) {
      const sortedData: Array<IGame> = sortData(data, sortField, sortByGreatest);
      setData(() => sortedData);
    } else {
      axios
        .get("https://ga-challenge-api.vercel.app/")
        .then((res) => setData(() => res.data.data))
        .catch(console.error);
    }
    setIsLoading(() => false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetClicked, sortField, sortByGreatest]);

  const context = {
    data,
    setData,
    resetClicked,
    setResetClicked,
    isLoading,
    setIsLoading,
    sortByGreatest,
    setSortByGreatest,
    sortField,
    setSortField,
  };
  return (
    <div>
      <Context.Provider value={context}>
        <Table />
      </Context.Provider>
    </div>
  );
};

export default Layout;
