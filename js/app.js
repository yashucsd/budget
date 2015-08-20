<<<<<<< HEAD
var totals = {all: 0, food: 0, gifts: 0, clubs: 0, transit: 0, euro: 0, other: 0};
var monthlyTotals = {all: 0, food: 0, gifts: 0, clubs: 0, transit: 0, euro: 0, other: 0};
=======
var totals = {all: 0, food: 0, gifts: 0, clubs: 0, transit: 0, travel: 0, other: 0};
var monthlyTotals = {all: 0, food: 0, gifts: 0, clubs: 0, transit: 0, travel: 0, other: 0};
>>>>>>> master

angular.module('budget-app', [])
    .controller('Budgeter', ['$scope', function($scope) {
        onLoad();

        $scope.data = data;

        $scope.transName = '';
        $scope.transAmount = '';
        $scope.transLocation = '';
        $scope.transCat = 'Food';
        $scope.transDate = new TransDate();
        $scope.searchText = getMonthName();
        $scope.hiddenMessage = "show all transactions..."
        $scope.catOptions = [
            { 
                label: 'food',
                tot: parsePrice(totals.food),
                monTot: parsePrice(monthlyTotals.food),
                getVal: function(time) {
                    if(time === "monTot") return this.monTot;
                    else return this.tot;
                }
            },
            { 
                label: 'gifts',
                tot: parsePrice(totals.gifts),
                monTot: parsePrice(monthlyTotals.gifts),
                getVal: function(time) {
                    if(time === "monTot") return this.monTot;
                    else return this.tot;
                }
            },
            { 
                label: 'clubs',
                tot: parsePrice(totals.clubs),
                monTot: parsePrice(monthlyTotals.clubs),
                getVal: function(time) {
                    if(time === "monTot") return this.monTot;
                    else return this.tot;
                }
            },
            { 
                label: 'transit',
                tot: parsePrice(totals.transit),
                monTot: parsePrice(monthlyTotals.transit),
                getVal: function(time) {
                    if(time === "monTot") return this.monTot;
                    else return this.tot;
                }
            },
            { 
                label: 'euro',
                tot: parsePrice(totals.euro),
                monTot: parsePrice(monthlyTotals.euro),
                getVal: function(time) {
                    if(time === "monTot") return this.monTot;
                    else return this.tot;
                }
            },
            { 
                label: 'other',
                tot: parsePrice(totals.other),
                monTot: parsePrice(monthlyTotals.other),
                getVal: function(time) {
                    if(time === "monTot") return this.monTot;
                    else return this.tot;
                }
            }
        ];
        $scope.timeOptions = [
            {
                label:"month",
                tag: "monTot"
            },
            {
                label:"all time",
                tag: "tot"
            }
        ];

        $scope.cat = $scope.catOptions[0];
        $scope.time = $scope.timeOptions[0];

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
<<<<<<< HEAD
    var url = 'data:text/JSON,' + 'var foodBudget = 40; data = ' + encodeURIComponent(JSON.stringify(data, null, 4));
=======
    var url = 'data:text/JSON,' + 'var budget = 40; data = ' + encodeURIComponent(JSON.stringify(data, null, 4));
>>>>>>> master
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
<<<<<<< HEAD
    totals = {all: 0, food: 0, gifts: 0, clubs: 0, transit: 0, euro: 0, other: 0};
=======
    totals = {all: 0, food: 0, gifts: 0, clubs: 0, transit: 0, travel: 0, other: 0};
>>>>>>> master
    for(i in data){
        var strAmt = data[i].amount;
        strAmt = strAmt.replace("$", "");
        totals.all += parseFloat(strAmt);
<<<<<<< HEAD
        if (data[i].category === "Food") {
            totals.food += parseFloat(strAmt);
        } else if (data[i].category === "Gifts") {
            totals.gifts += parseFloat(strAmt);
        } else if (data[i].category === "Clubs") {
            totals.clubs += parseFloat(strAmt);
        } else if (data[i].category === "Transit") {
            totals.transit += parseFloat(strAmt);
        } else if (data[i].category === "Euro") {
            totals.euro += parseFloat(strAmt);   
        } else if (data[i].category === "Other") {
            totals.other += parseFloat(strAmt);
        }
    }
}
function calcMonthlyTotals(){
    monthlyTotals = {all: 0, food: 0, gifts: 0, clubs: 0, transit: 0, euro: 0, other: 0};
=======
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
>>>>>>> master
    for(i in data){
        if(data[i].date.month === ((new Date).getMonth()) && 
            data[i].date.year === ((new Date).getFullYear())){
            var strAmt = data[i].amount;
            strAmt = strAmt.replace("$", "");
            monthlyTotals.all += parseFloat(strAmt);
<<<<<<< HEAD
            if (data[i].category === "Food") {

                monthlyTotals.food += parseFloat(strAmt);
            } else if (data[i].category === "Gifts") {

                monthlyTotals.gifts += parseFloat(strAmt);
            } else if (data[i].category === "Clubs") {

                monthlyTotals.clubs += parseFloat(strAmt);
            } else if (data[i].category === "Transit") {

                monthlyTotals.transit += parseFloat(strAmt);
            } else if (data[i].category === "Euro") {

                monthlyTotals.euro += parseFloat(strAmt);
            } else if (data[i].category === "Other") {

                monthlyTotals.other += parseFloat(strAmt);
            }
=======
            if (data[i].category === "Food")        monthlyTotals.food += parseFloat(strAmt);
            else if (data[i].category === "Gifts")  monthlyTotals.gifts += parseFloat(strAmt);
            else if (data[i].category === "Clubs")  monthlyTotals.clubs += parseFloat(strAmt);
            else if (data[i].category === "Transit")monthlyTotals.transit += parseFloat(strAmt);
            else if (data[i].category === "Travel") monthlyTotals.travel += parseFloat(strAmt);
            else if (data[i].category === "Other")  monthlyTotals.other += parseFloat(strAmt);
>>>>>>> master
        }
    }
}
function printBudgChart(){
    var ctx = $("#budgChart").get(0).getContext("2d");
    var budgData = [
        {
<<<<<<< HEAD
            value: monthlyTotals.food,
            color: "#FF974F",
            highlight: "#FFA34F",
            label: "Spent"
        },
        {
            value: foodBudget - monthlyTotals.food,
            color: "#644D52",
            highlight: "#7F6269",
=======
            value: (monthlyTotals.food + monthlyTotals.travel),
            color: "#F7464A",
            highlight: "#FF5A5E",
            label: "Spent"
        },
        {
            value: budget - (monthlyTotals.food + monthlyTotals.travel),
            color: "#46BFBD",
            highlight: "#5AD3D1",
>>>>>>> master
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
            color: "#332532",
            highlight: "#4C374C",
            label: "Food"
        },
        {
            value: totals.gifts,
            color: "#644D52",
            highlight: "#7F6269",
            label: "Gifts"
        },
        {
            value: totals.transit,
            color: "#F77A52",
            highlight: "#FF9B55",
            label: "Transit"
        },
        {
            value: totals.euro,
            color: "#F79A52",
            highlight: "#FF3B55",
            label: "Euro"
        },
        {
            value: totals.clubs,
            color: "#A49A87",
            highlight: "#C2B6A0",
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
            color: "#FF974F",
            highlight: "#FFA34F",
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