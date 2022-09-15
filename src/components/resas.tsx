// ※メインtsです
import React, { useEffect, useState } from "react";
import CheckField from "./CheckField";
import Graph from "./Graph";
// ↑グラフ用のtsを読み込んでいます

import axios from "axios";

const api_url = "https://opendata.resas-portal.go.jp/api/v1";
// ↑apiのurlの共通部
let api_key = "527bS5a6c1I0Flo1ism4JhLLzXYIirlsuOxYNwdn";
// ↑APIキー

const Main: React.FC = () => {
  const [prefectures, setPreFectures] = useState<{
    message: null;
    result: {
      prefCode: number;
      prefName: string;
    }[];
  } | null>(null);
  const [prefPopulation, setPrefPopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([]);

  useEffect(() => {
    // 都道府県一覧を取得する
    axios
      .get(api_url + "/prefectures", {
        headers: { "X-API-KEY": api_key },
        // apiキーの入力
      })
      .then((results) => {
        setPreFectures(results.data);
        // ↑ここでresasから都道府県取得
      })
      .catch((error) => {});
  }, []);

  // チェックボックスをクリックした際の処理
  const handleClickCheck = (
    prefName: string,
    prefCode: number,
    check: boolean
  ) => {
    let c_prefPopulation = prefPopulation.slice();

    // チェックをつけた処理
    if (check) {
      if (
        c_prefPopulation.findIndex((value) => value.prefName === prefName) !==
        -1
      )
        return;

      axios
        .get(
          api_url +
            "/population/composition/perYear?prefCode=" +
            String(prefCode),
          // ↑チェックされた県の人口取得
          {
            headers: {
              "X-API-KEY": api_key,
              // apiキーの入力
            },
          }
        )
        .then((results) => {
          c_prefPopulation.push({
            prefName: prefName,
            data: results.data.result.data[0].data,
          });
          // ↑表示

          setPrefPopulation(c_prefPopulation);
        })
        .catch((error) => {
          return;
        });
    }
    // チェックを外した処理
    else {
      const deleteIndex = c_prefPopulation.findIndex(
        (value) => value.prefName === prefName
      );
      if (deleteIndex === -1) return;
      c_prefPopulation.splice(deleteIndex, 1);
      setPrefPopulation(c_prefPopulation);
    }
  };

  return (
    <div>
      <h2 className="label">都道府県</h2>
      {prefectures && (
        <CheckField
          prefectures={prefectures.result}
          onChange={handleClickCheck}
        />
      )}
      <h2 className="label">人口推移グラフ</h2>
      <Graph populationdata={prefPopulation} />
      <div className="git_icon">
      <a href="https://github.com/bisco16/resas_spa">
            <i className="fa-brands fa-github"></i>
        </a>
      </div>
    </div>
  );
  // ↑htmlでの表示部
};

export default Main;
