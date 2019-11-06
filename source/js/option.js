limitDateDom = document.getElementsByClassName('countDownDate')
limitNameDom = document.getElementsByClassName('countDownName')
submitDom = document.getElementById('send')
addDom = document.getElementById('add')
formDom = document.getElementById('dateconfigform')
dateform =`
    <div class="form-group">
        <label for="limit">請選擇要倒數的日期</label>
        <input type="text" class="form-control countDownName" placeholder="請輸入你為此日子的命名">
        <input type="date" class="form-control countDownDate" placeholder="欲倒數的日子" required>
    </div>
`;
resetDom = document.getElementById('reset');


chrome.storage.sync.get('countDownConfig',function(result){
    config = result.countDownConfig;
    formLength = result.countDownConfig.length;
    console.log(config);
    for (let index = 0; index < formLength-1; index++) {
        formDom.innerHTML += dateform;
    }

    for (index = 0; index < formLength; index++) {
        
        limitDateDom[index].value = config[index].DateVal
        limitNameDom[index].value = config[index].DateName  
    }
});

submitDom.addEventListener("click",function(){

    chrome.storage.sync.get({countDownConfig: []}, function (result) {
        var countDownConfig = [];
        var countLength = limitDateDom.length
    
        for (let index = 0; index < countLength; index++) {
            Datename= limitNameDom[index].value;
            Dateval = limitDateDom[index].value;
            if (Dateval != '')
            {
                countDownConfig.push({DateName: Datename,DateVal : Dateval, HasBeenUploadedYet: false});
            }
            else
            {
                alert('請填寫欲倒數的日期');
                return false
            }
        }

        chrome.storage.sync.set({countDownConfig: countDownConfig}, function () {
            alert('儲存成功')
        });
    });
});

addDom.addEventListener("click", function(){
    formDom.innerHTML += dateform;
    chrome.storage.sync.get('countDownConfig',function(result){
        config = result.countDownConfig;
        formLength = result.countDownConfig.length;
        for (let index = 0; index < formLength; index++) {
            limitDateDom[index].value = config[index].DateVal
            limitNameDom[index].value = config[index].DateName  
        }
    });
});

resetDom.addEventListener("click",function(){
    chrome.storage.sync.get({countDownConfig: []}, function (result) {
        var countDownConfig = [];
        var today = new Date();
        var ThisYearCountDown = today.getFullYear()+'-12-31';
        countDownConfig.push({DateName: '跨年倒數',DateVal : ThisYearCountDown, HasBeenUploadedYet: false});        
        chrome.storage.sync.set({countDownConfig: countDownConfig}, function () {
            alert('重設成功')
            window.location.reload()
        });
    });
});