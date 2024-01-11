const currencyRatio = {
    VND: {
        USD: 0.000043,
        KRW: 0.051,
        VND: 1,
        unit: "동",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2560px-Flag_of_Vietnam.svg.png",
    },
    USD: {
        USD: 1,
        KRW: 1182.35,
        VND: 23235.5,
        unit: "달러",
        img: "https://cdn-icons-png.flaticon.com/512/555/555526.png",
    },
    KRW: {
        USD: 0.00085,
        KRW: 1,
        VND: 19.47,
        unit: "원",
        img: "https://cdn.countryflags.com/thumbs/south-korea/flag-400.png",
    },
};

var unitWords = ["", "만", "억", "조", "경"];
var splitUnit = 10000;
let toButton = document.getElementById("to-button");
let fromButton = document.getElementById("from-button");
let toCurrency = "USD";
let fromCurrency = "USD";

// from 환율 요소들 불러오기
document.querySelectorAll("#from-currency-list li").forEach(function(item) {
    item.addEventListener("click", function() {
        // click 이벤트 후, function 함수 실행.
        console.log("click, function start~");
        // 사용자가 선택한 값.
        fromCurrency = this.id;
        // click한 요소의 'id' 값을 가져와, 변수에 할당.
        fromButton.innerHTML = `<img class="flag-img"src="${currencyRatio[fromCurrency].img}"/>${fromCurrency}`;
        convert("from");
        // convert 함수 호출, 'from' 매개변수로 전달 받는다.(if문으로 from, to 구분.)
    });
});

// to 환율 요소들 불러오기
document.querySelectorAll("#to-currency-list li").forEach(function(item) {
    item.addEventListener("click", function() {
        console.log("click, function2 start~");
        toCurrency = this.id;
        toButton.innerHTML = `<img class="flag-img"src="${currencyRatio[toCurrency].img}"/>${toCurrency}`;
        convert("from");
    });
});

function convert(type) {
    // 환전 함수
    console.log("convert start!!!");
    let amount = 0;
    if (type == "from") {
        // 입력갑 받기
        amount = document.getElementById("fromAmount").value;
        // 환전하기
        let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
        // 환전한값 보여주기
        document.getElementById("toAmount").value = convertedAmount;
        // 환전한값 한국어로 (함수에 인수 전달)
        renderKoreanNumber(amount, convertedAmount);
    } else {
        // type == "to", 밑에서 위로 환전 가능.
        amount = document.getElementById("toAmount").value;
        let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
        document.getElementById("fromAmount").value = convertedAmount;
        renderKoreanNumber(convertedAmount, amount);
    }
}

function renderKoreanNumber(from, to) {
    // 'unit' 나라별 글자 변경하는 함수
    console.log("text 변경");
    // text 변경
    document.getElementById("fromNumToKorea").textContent = readNum(from) + currencyRatio[fromCurrency].unit;
    document.getElementById("toNumToKorea").textContent = readNum(to) + currencyRatio[toCurrency].unit;
}

function readNum(num) {
    // "원" 단위로 나누고, 숫자 -> 문자열 변환  함수
    console.log("readNum Start!");
    let resultString = "";
    let resultArray = [];

    //  unitWords = ["", "만", "억", "조", "경"]; 
    //  for문을 사용한 이유. 10-25
    for (let i = 0; i < unitWords.length; i++) {
        console.log("unitWord split~")
        let unitResult = (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult); // 내림 작업.
        if (unitResult > 0) {
            resultArray[i] = unitResult;
        }
    } 

    for (let i = 0; i < resultArray.length; i++) {
        console.log("resultArray Start~")
        if (!resultArray[i])
            continue;
        resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }
    return resultString;
}


/*
    var unitWords = ["", "만", "억", "조", "경"];
    var splitUnit = 10000;
    var num = 123456789;

    Math.pow(x, y) = x를 y번 거듭 제곱한다.
    어떤 수를 0번 거듭제곱을 하면 1이 된다.
    let unitResult = (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);

    (123456789 % Math.pow(10000, 0 + 1)) / Math.pow(10000, 0);
    (123456789 % Math.pow(10000)) / Math.pow(1); 
    6789 / 1 = 6789

    resultString = String(resultArray[i]) + unitWords[i] + resultString;

    resultArray[i]
    resultArray[0] = 6789
    resultArray[1] = 2345
    resultArray[2] = 1

    unitWords = ["", "만", "억", "조", "경"];

    String([0]="6789", [1]="2345", [2]="1" ) + unitWords([0]="", [1]="만", [2]="억") + (resultArray[0]숫자와 unitWords[0]문자열을 조합)

    return resultString = 1억 2345만 6789;


 */
