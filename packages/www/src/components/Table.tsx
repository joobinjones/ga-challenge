import { useContext } from "react";
import { Context } from "../components/context";
import { IGame, IContext } from "../Layout";
import "../styles/Table.css";

interface IHeaderButtonProps {
  title: string;
  sortBy: keyof IGame;
}

const HeaderButton = ({ title, sortBy }: IHeaderButtonProps): JSX.Element => {
  const context: IContext = useContext(Context);
  return (
    <th>
      <button onClick={() => context.setSortField(sortBy)}>{title}</button>
    </th>
  );
};

const Table = (): JSX.Element => {
  const context: IContext = useContext(Context);
  console.log("SORT", context.sortField);
  return context.isLoading ? (
    <div>Loading</div>
  ) : (
    <table>
      <tr>
        <HeaderButton title="Area" sortBy="area" />
        <HeaderButton title="Bank" sortBy="bank" />
        <HeaderButton title="Zone" sortBy="zone" />
        <HeaderButton title="Stand" sortBy="stand" />
        <HeaderButton title="Asset" sortBy="asset" />
        <HeaderButton title="Net Win" sortBy="netWin" />
        <HeaderButton title="Old Denom" sortBy="oldDenom" />
        <HeaderButton title="New Denom" sortBy="newDenom" />
        <HeaderButton title="Old Payback" sortBy="oldPayback" />
        <HeaderButton title="New Payback" sortBy="newPayback" />
        <HeaderButton title="Date" sortBy="date" />
      </tr>
      {context.data.map((ele) => (
        <tr>
          <td>{ele?.area}</td>
          <td>{ele?.bank}</td>
          <td>{ele?.zone}</td>
          <td>{ele?.stand}</td>
          <td>{ele?.asset}</td>
          <td>{ele?.netWin}</td>
          <td>{ele?.oldDenom}</td>
          <td>{ele?.newDenom}</td>
          <td>{ele?.oldPayback}</td>
          <td>{ele?.newPayback}</td>
          <td>{ele?.date.substring(0, 10)}</td>
        </tr>
      ))}
    </table>
  );
};

export default Table;
