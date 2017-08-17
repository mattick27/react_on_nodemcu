var home = 
{    
    'Temp' : {
        stat_C : 0, // C
        stat_F : 0 // F
    },
    'Humidity' : {
        button : 0, 
        status : 0, // %
    },
    'Curtain' :{
        status : 0, //lumen
        button : 0,
    },
    'Bin' : {
        status : 0,
    },
    'light' : {
        no_1 : 0,
        no_2 : 0,
        no_3 : 0,
    }
}

var Curtain = 'Curtain ' + home.Curtain.button 
var Home_Light = ' Home_light ' + '|No1|' + home.light.no_1 + '|No2|' + home.light.no_2 + '|No3|' + home.light.no_3 
var Garden = ' Garden ' + home.Humidity.button 
// var sum = Curtain + Garden + Home_Light
// console.log(sum)
// console.log(Garden.length)
// console.log(Home_Light.length)

// console.log(sum.indexOf(0)) //search index of parameter value 
// console.log("This is value of Curtain : " + sum.substring(8,9)) // value is string between [8,9)

// console.log(sum.indexOf(0,9)) //search index of parameter value
// console.log("This is value of Garden : " + sum.substring(17,18)) // value is string between [17,18)

// console.log(sum.indexOf(0,18)) //search index of parameter value
// console.log("This is value of Light No1 : " + sum.substring(35,36)) // value is string between [35,36)

// console.log(sum.indexOf(0,36)) //search index of parameter value
// console.log("This is value of Light No2: " + sum.substring(41,42)) // value is string between [41,42)

// console.log(sum.indexOf(0,43)) //search index of parameter value
// console.log("This is value of Light No3: " + sum.substring(47,48))  // value is string between [47,48)
