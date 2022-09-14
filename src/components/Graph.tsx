import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type Props = {
  populationdata: {
    prefName: string;
    data: { year: number; value: number }[];
  }[];
};

// 選んだ都道府県の人口推移グラフを表示するコンポーネント
const Graph: React.FC<Props> = ({ populationdata }) => {
  let series: Highcharts.SeriesOptionsType[] = [];
  let categories = [];

  for (let p of populationdata) {
    let data = [];

    for (let pd of p.data) {
      data.push(pd.value);
      categories.push(String(pd.year));
    }

    series.push({
      type: "line",
      name: p.prefName,
      data: data,
    });
  }

  const options: Highcharts.Options = {
    title: {
      text: "総人口推移",
      // ↑グラフタイトル
    },
    xAxis: {
      title: {
        text: "年度",
        // ↑グラフ横
      },
      categories: categories,
    },
    yAxis: {
      title: {
        text: "人口数",
        // ↑グラフ縦
      },
    },
    // 都道府県を一つも選んでいない場合
    series:
      series.length === 0
        ? [{ type: "line", name: "都道府県名", data: [] }]
        : series,
  };

  return (
    <div className="graph">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
    // ↑グラフの表示部本体
  );
};

export default Graph;
