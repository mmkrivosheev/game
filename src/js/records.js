const ERROR_NO_NAME  = "Введите имя";
const ERROR_DOUBLE_NAME = "Такое имя уже существует";
const error = document.querySelector("#error");
const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
const storageName = "KRIVOSHEEV_GAME_TABLE_OF_RECORDS";
const modalOpen = document.querySelector("#modal-open");
let updatePassword;

export function getData(game) {

    $.ajax({
        url: ajaxHandlerScript, type: "POST", cache: false,dataType: "json",
        data: { f: "READ", n: storageName },
        success: readReady, error: errorHandler
    });

    function readReady(callResult) {
        if (callResult.error !== undefined)
            alert(callResult.error);
        else {
            let stringResult = "";
            let count = 1;
            let data = (callResult.result !== "")
                ? JSON.parse(callResult.result)
                : {};

            data = Object.entries(data).sort((a, b) => b[1] - a[1]);

            for (let i = 0; i < (data.length < 10 ? data.length : 10); i++) {
                stringResult = stringResult + count + ". " + data[i][0] + " - " + data[i][1] + "<br>";
                count++;
            }
            modalOpen.querySelector(".title").innerHTML = "The best results";
            modalOpen.querySelector(".text").style.width = "80%";
            modalOpen.querySelector(".text").innerHTML = stringResult;
            modalOpen.classList.add("show-modal-open");
            game.isModalOpenShow = true;
        }
    }
}

export function updateData(name, res) {
    if (!name) {
        error.innerHTML = ERROR_NO_NAME;
        setTimeout(() => error.innerHTML = "" , 2000);
        return;
    }

    updatePassword = Math.random();

    $.ajax({
        url: ajaxHandlerScript, type: "POST", cache: false,dataType: "json",
        data: { f: "LOCKGET", n: storageName, p: updatePassword },
        success: update, error: errorHandler
    });

    function update(callResult) {
        if (callResult.error !== undefined)
            alert(callResult.error);
        else {
            const result = JSON.parse(callResult.result);

            if (name in result) {
                error.innerHTML = ERROR_DOUBLE_NAME;
                setTimeout(() => error.innerHTML = "" , 2000);
                return;
            }

            const data = (callResult.result !== undefined)
                ? {...result, [name]: res}
                : {[name]: res};

            $.ajax({
                    url: ajaxHandlerScript, type: "POST", cache: false, dataType: "json",
                    data: { f: "UPDATE", n: storageName, v: JSON.stringify(data), p: updatePassword },
                    success: updateReady,
                    error: errorHandler
                }
            );

            function updateReady(callResult) {
                if (callResult.error !== undefined)
                    alert(callResult.error);
            }
        }
    }
}

function errorHandler(jqXHR, statusStr, errorStr) {
    alert(statusStr + " " + errorStr);
}