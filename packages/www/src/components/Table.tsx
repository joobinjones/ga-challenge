import { useContext } from "react";
import { Context } from "../components/context";
import { IGame, IContext } from "../Layout";
import "../styles/Table.css";

interface IHeaderButtonProps {
  title: string;
}

const HeaderButton = ({ title }: IHeaderButtonProps): JSX.Element => {
  const context: IContext = useContext(Context);
  return (
    <th>
      <button onClick={() => context.setSort(title)}>{title}</button>
    </th>
  );
};

const Table = (): JSX.Element => {
  const context: IContext = useContext(Context);
  console.log(context.sort);
  return (
    <table>
      <tr>
        <HeaderButton title="Area" />
        <HeaderButton title="Bank" />
        <HeaderButton title="Zone" />
        <HeaderButton title="Stand" />
        <HeaderButton title="Asset" />
        <HeaderButton title="Net Win" />
        <HeaderButton title="Old Denom" />
        <HeaderButton title="New Denom" />
        <HeaderButton title="Old Payback" />
        <HeaderButton title="New Payback" />
        <HeaderButton title="Date" />
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
