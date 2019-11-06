var countdownDom = document.getElementById("countdown");

chrome.storage.sync.get("countDownConfig", function(result) {
  config = result.countDownConfig;
  len = result.countDownConfig.length;
  now = new Date().getTime();
  countdownDom.innerHTML = "";
  for (let index = 0; index < len; index++) {
    Datename = config[index].DateName;
    if (Datename == "") {
      Datename = config[index].DateVal;
    }
    DateVal = config[index].DateVal;
    special = Date.parse(DateVal);
    countdownNumber = Math.ceil((now - special) / (24 * 60 * 60 * 1000));
    if (countdownNumber < 0) {
      countdownDom.innerHTML +=
        "<div class='info'>距離" +
        Datename +
        "倒數" +
        Math.abs(countdownNumber) +
        "天</div>";
    } else {
      countdownDom.innerHTML +=
        "<div class='info'>距離" +
        Datename +
        "已過了" +
        countdownNumber +
        "天</div>";
    }
  }
});
