import { useContext } from "react";
import { Context } from "../components/context";
import { IGame, IContext } from "../Layout";
import "../styles/Table.css";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

interface IHeaderButtonProps {
  title: string;
  sortBy: keyof IGame;
}

const HeaderButton = ({ title, sortBy }: IHeaderButtonProps): JSX.Element => {
  const context: IContext = useContext(Context);
  const style = context.sortField === sortBy ? { backgroundColor: "#bbbbbb" } : {};
  return (
    <th>
      <button
        onClick={() => {
          // if the same button is clicked again change the sort direction
          if (context.sortField === sortBy) {
            context.setSortByGreatest(() => !context.sortByGreatest);
            // else make sure sortByGreatest is true for the new column to be sorted
          } else if (!context.sortByGreatest && context.sortField) {
            context.setSortByGreatest(() => true);
          }
          context.setSortField(sortBy);
        }}
        style={style}
      >
        {title}{" "}
        {context.sortField === sortBy ? (
          context.sortByGreatest ? (
            <AiOutlineArrowUp />
          ) : (
            <AiOutlineArrowDown />
          )
        ) : null}
      </button>
    </th>
  );
};

const Table = (): JSX.Element => {
  const context: IContext = useContext(Context);
  return context.isLoading ? (
    <div>Loading...</div>
  ) : (
    <table>
      <thead>
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
      </thead>
      <tbody>
        {context.data.map((ele) => (
          <tr key={ele?.gameID}>
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
      </tbody>
    </table>
  );
};

export default Table;
