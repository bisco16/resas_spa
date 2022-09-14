"use strict";

var api_url = "https://opendata.resas-portal.go.jp/api/v1/"
var api_key = "527bS5a6c1I0Flo1ism4JhLLzXYIirlsuOxYNwdn"

//県の取得関係処理
let i = 0
let tmp_prefecture = ""
let prefecture_tr = ""
let resas_table = document.getElementById("resas_prefecture_table")
let prefecture_figure = 0


$.ajax({
    url: api_url + "prefectures",
    type: "GET",
    headers: {
        'X-API-KEY': api_key
        // ここにAPIキー文字列を記述
    },
    async: "false",
    success: function (result_data) {
        prefecture_figure = result_data.result.length
        // ↑ 県の数の取得
        while (i < prefecture_figure) {
            if (i % 8 == 0 || i == 0) {
                // trの用意
                prefecture_tr = resas_table.insertRow(-1)
            }
            //県収納用セルの用意
            let prefecture_td = prefecture_tr.insertCell(-1);
            //県の取得
            tmp_prefecture = result_data.result[i].prefName
            $(prefecture_td).text(tmp_prefecture)
            //県チェックボックス用セルの用意
            let prefecture_td_checkbox = prefecture_tr.insertCell(-1);
            $(prefecture_td_checkbox).append("<" + "input type='checkbox'" + "name='prefecture'" + "class='prefecture'" + "id=" + "'" + i + "'" + "value=" + "'" + tmp_prefecture + "'" + ">")
            i += 1
            // 8*6 or
        }
    }
});

//idぐるぐる確認→あったら、表示
let i_turn = 0
let id_name = 0

function resas() {
    let test_prefecture = $('input[name=prefecture]:checked').map(function () {
        return $(this).val();
    }).get();
    i_turn = 0
    while (i_turn < prefecture_figure) {
        let id_name = document.getElementById(i_turn);
        if (id_name.checked) {
            console.log(test_prefecture + "はチェックされています。");
        }
        i_turn += 1
    }

    // console.log(test_prefecture);

    $("#text_test").text("あなたが選んだのは、" + test_prefecture + "ですね")
    // var preprefecture_id = $('.prefecture').index(this);
    // $("#class_test").text("idは、" + preprefecture_id + "ですね")
}


//人口の取得
var request = new XMLHttpRequest();
//リンクへの追加
// population/sum/perYear