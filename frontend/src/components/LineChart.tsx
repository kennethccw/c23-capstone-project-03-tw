// // components/LineChart.js
import { Line } from "react-chartjs-2";

interface ChartData {
  labels: (string | number)[];
  datasets: any[];
}

function LineChart({ chartData }: { chartData: ChartData }) {
  return (
    <div className="chart-container">

      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "user engagement in 2022",
            },
            legend: {
              display: true,
            },
            // tooltip: {...}
          },
        }}
      />
    </div>
  );
}

export default LineChart;