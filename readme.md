
[pluralsight 教學 React.js - Getting Started](https://app.pluralsight.com/library/courses/react-js-getting-started/table-of-contents)

### 此專案是一個小遊戲
- 運行環境 https://jscomplete.com/repl
- 最終完成的代碼都在 `9. the main game component.jsx` 。
- 把 `9. the main game component.jsx` 的代碼貼到 [線上運行環境](https://jscomplete.com/repl) ，點擊 run （play）按鈕即可運行。


### 遊戲規則說明
- 勝利條件：每個數字都使用完畢。
- 畫面上有星星、數字、等號、reset。
- 數字、等號、reset 可以點擊。
- 每回合隨機出現星星（1~9個），根據出現的星星數量 點擊數字，讓 星星數量 = 數字數量的總合。然後按下『 = 』 送出答案。


- e.g. 5星 。數字可以是 2；3 （合計等於5）或是 1；4 或是 5
- 答案送出後，正確會顯示綠色打勾；錯誤顯示紅色叉。
- 綠色打勾出現後，再點擊綠色勾勾進行下回合。
- 如果是紅色，可以點擊選擇的數字取消，重新組合答案。

- 每個數字只能使用一次。
- 如果，剩餘數字不可能湊成目前的星星數量，可以點擊『黃色 reset』重新得到不同的星星數量。
-  最多有 5 次 reset 機會。