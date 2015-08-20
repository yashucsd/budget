var totals = {all: 0, food: 0, gifts: 0, clubs: 0, transit: 0, travel: 0, other: 0};
var monthlyTotals = {all: 0, food: 0, gifts: 0, clubs: 0, transit: 0, travel: 0, other: 0};

angular.module('budget-app', [])
    .controller('Budgeter', ['$scope', function($scope) {
        $scope.data = data;

        $scope.transName = '';
        $scope.transAmount = '';
        $scope.transLocation = '';
        $scope.transCat = 'Food';
        $scope.transDate = new TransDate();
        $scope.searchText = getMonthName();
        $scope.hiddenMessage = "show all transactions..."

        $scope.showOlder = function() {
            if($scope.searchText === getMonthName()){
                $scope.hiddenMessage = "hide older transactions..."
                $scope.searchText = "";
            } else {
                $scope.searchText = getMonthName();
                $scope.hiddenMessage = "show all transactions..."
            }
        }


        $scope.addTrans = function() {
            $scope.transDate = new TransDate();
            $scope.data.push({
                name: $scope.transName,
                amount: parsePrice($scope.transAmount),
                location: $scope.transLocation,
                category: $scope.transCat,
                date: $scope.transDate,
                monthName: getMonthName()
            });
            $scope.transName = '';
            $scope.transAmount = '';
            $scope.transLocation = '';
            $scope.transCat = 'Food';
            $scope.transDate = new TransDate();
            onLoad();
        }
    }])

function parsePrice(argument) {
    return numeral(argument).format('$0.00');
}
function download() {
    var url = 'data:text/JSON,' + 'var budget = 40; data = ' + encodeURIComponent(JSON.stringify(data, null, 4));
    window.open(url, '_blank')
}
function onLoad(){
    calcTotals();
    calcMonthlyTotals();
    $("#tot") .text(parsePrice(monthlyTotals.food + monthlyTotals.travel));
    $("#budget").text(parsePrice(budget - (monthlyTotals.food + monthlyTotals.travel)));
    printBudgChart();
    printCatChart();
}
function calcTotals(){
    totals = {all: 0, food: 0, gifts: 0, clubs: 0, transit: 0, travel: 0, other: 0};
    for(i in data){
        var strAmt = data[i].amount;
        strAmt = strAmt.replace("$", "");
        totals.all += parseFloat(strAmt);
        if (data[i].category === "Food")        totals.food += parseFloat(strAmt);
        else if (data[i].category === "Gifts")  totals.gifts += parseFloat(strAmt);
        else if (data[i].category === "Clubs")  totals.clubs += parseFloat(strAmt);
        else if (data[i].category === "Transit")totals.transit += parseFloat(strAmt);
        else if (data[i].category === "Travel") totals.travel += parseFloat(strAmt);
        else if (data[i].category === "Other")  totals.other += parseFloat(strAmt);
    }
}
function calcMonthlyTotals(){
    monthlyTotals = {all: 0, food: 0, gifts: 0, clubs: 0, transit: 0, travel: 0, other: 0};
    for(i in data){
        if(data[i].date.month === ((new Date).getMonth()) && 
            data[i].date.year === ((new Date).getFullYear())){
            var strAmt = data[i].amount;
            strAmt = strAmt.replace("$", "");
            monthlyTotals.all += parseFloat(strAmt);
            if (data[i].category === "Food")        monthlyTotals.food += parseFloat(strAmt);
            else if (data[i].category === "Gifts")  monthlyTotals.gifts += parseFloat(strAmt);
            else if (data[i].category === "Clubs")  monthlyTotals.clubs += parseFloat(strAmt);
            else if (data[i].category === "Transit")monthlyTotals.transit += parseFloat(strAmt);
            else if (data[i].category === "Travel") monthlyTotals.travel += parseFloat(strAmt);
            else if (data[i].category === "Other")  monthlyTotals.other += parseFloat(strAmt);
        }
    }
}
function printBudgChart(){
    var ctx = $("#budgChart").get(0).getContext("2d");
    var budgData = [
        {
            value: (monthlyTotals.food + monthlyTotals.travel),
            color: "#F7464A",
            highlight: "#FF5A5E",
            label: "Spent"
        },
        {
            value: budget - (monthlyTotals.food + monthlyTotals.travel),
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Remaining"
        }
    ];
    var budgetChart = new Chart(ctx).Doughnut(budgData);
}
function printCatChart(){
    var ctx = $("#catChart").get(0).getContext("2d");
    var catData = [
        {
            value: numeral(totals.food).format('0.00'),
            color: "#F7464A",
            highlight: "#FF5A5E",
            label: "Food"
        },
        {
            value: totals.gifts,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Gifts"
        },
        {
            value: totals.transit,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Transit"
        },
        {
            value: totals.clubs,
            color: "#949FB1",
            highlight: "#A8B3C5",
            label: "Clubs"
        },
        {
            value: totals.travel,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Travel"
        },
        {
            value: totals.other,
            color: "#4D5360",
            highlight: "#616774",
            label: "Other"
        }
    ];
    var categoryChart = new Chart(ctx).Doughnut(catData);
}
function TransDate() {
    var today = new Date;
    this.month = today.getMonth();
    this.day = today.getDate();
    this.year = today.getFullYear();
}
function getMonthName() {
    var today = new Date;
    var month = today.getMonth();
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[month];
}