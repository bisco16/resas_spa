import React from "react";

type Props = {
  prefectures:
    | {
        prefCode: number;
        prefName: string;
      }[];

  onChange: (name: string, prefName: number, check: boolean) => void;
};

// 都道府県一覧のチェックボックスを表示するコンポーネント
const CheckField: React.FC<Props> = ({ prefectures, onChange }) => {
  return (
    <div className="checkcardList">
      {prefectures.map((prefecture) => (
        <div className="checkcard" key={prefecture.prefName}>
          <input
            type="checkbox"
            name="Prefecture name"
            onChange={(event) =>
              onChange(
                prefecture.prefName,
                prefecture.prefCode,
                event.target.checked
              )
            }
            id={"checkbox" + prefecture.prefCode}
          />
          <label className="text" htmlFor={"checkbox" + prefecture.prefCode}>
            {prefecture.prefName.length === 3
              ? "　" + prefecture.prefName
              : prefecture.prefName}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckField;
