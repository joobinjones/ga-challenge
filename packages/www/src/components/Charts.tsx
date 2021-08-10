import { useContext, useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label } from "recharts";
import { Context } from "./context";
import { IContext } from "../Layout";
import "../styles/Charts.css";

const fields = [
  "area",
  "bank",
  "zone",
  "stand",
  "asset",
  "netWin",
  "oldDenom",
  "newDenom",
  "oldPayback",
  "newPayback",
  "date",
];

interface IChartPoint {
  xCoord: number | string;
  yCoord: number | string;
}

const getDataPoint = (dataPoint: number | string): number | string => {
  if (typeof dataPoint === "string") {
    return dataPoint.substring(0, 10);
  }
  return dataPoint;
};

const Charts = (): JSX.Element => {
  const [comparator, setComparator] = useState<string>("");
  const [chartData, setChartData] = useState<Array<IChartPoint>>([]);
  const context: IContext = useContext(Context);

  useEffect(() => {
    setChartData(() =>
      context.data.map((ele: any) => ({
        xCoord: getDataPoint(ele[context.sortField]),
        yCoord: getDataPoint(ele[comparator]),
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comparator]);

  return (
    <div className="comp-container">
      <button onClick={() => context.setView(() => "table")}>Back to Table</button>
      <div>
        Compare {context.sortField} with:{" "}
        <select
          name="comp-options"
          id="comp-options"
          onChange={({ target }) => setComparator(() => target.value)}
        >
          <option>-- Select an option --</option>
          {fields
            .filter((ele) => ele !== context.sortField && ele !== "date")
            .map((ele) => (
              <option value={ele}>{ele}</option>
            ))}
        </select>
      </div>
      <div id="chart">
        <LineChart
          width={700}
          height={500}
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <Line dataKey="yCoord" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis
            label={{ value: context.sortField, angle: 0, position: "bottom" }}
            dataKey="xCoord"
            name={context.sortField}
          />
          <YAxis
            label={{ value: comparator, angle: -90, position: "insideLeft" }}
            dataKey="yCoord"
            name={comparator}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default Charts;
