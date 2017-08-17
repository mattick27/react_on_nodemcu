var http = require('http')
var app = require('express')() 
var server = http.createServer(app)
var xml = require('xml') 
var fetch = require('node-fetch') 
var os = require( 'os' ) 
var networkInterfaces = os.networkInterfaces( )

var home = 
    {    
        'Temp' : {
            stat_C : 0, // C
            gas : 0 // F
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
            no_1 : 1,
            no_2 : 1,
            no_3 : 0,
        }
    }

var Home_Light = 'Home_light' + '|No1|' + home.light.no_1 + '|No2|' + home.light.no_2 + '|No3|' + home.light.no_3 
var Curtain = 'Curtain' + home.Curtain.button 
var Garden = 'Garden' + home.Humidity.button


///////////////////////////////////////////////
///////             TEST                 //////
/////////////////////////////////////////////// 

// var sum = Curtain + Garden + Home_Light
// console.log(sum)
// console.log(Garden.length)
// console.log(Home_Light.length)

// console.log(sum.indexOf(0)) //search index of parameter value 
// console.log("This is value of Curtain : " + sum.substring(11,12)) // value is string between [11,12)

// console.log(sum.indexOf(0,9)) //search index of parameter value
// console.log("This is value of Garden : " + sum.substring(18,19)) // value is string between [18,19)

// console.log(sum.indexOf(0,18)) //search index of parameter value
// console.log("This is value of Light No1 : " + sum.substring(34,35)) // value is string between [34,35)

// console.log(sum.indexOf(0,36)) //search index of parameter value
// console.log("This is value of Light No2: " + sum.substring(40,41)) // value is string between [40,41)

// console.log(sum.indexOf(0,43)) //search index of parameter value
// console.log("This is value of Light No3: " + sum.substring(46,47))  // value is string between [46,47)



// Curtain index is 7 + <gg>    = 11
// Garden index is 16 + <gg>    = 18
// light No1 index is 34 + <gg> = 34
// light No2 index is 40 + <gg> = 40
// light No3 index is 46 + <gg> = 46

///////////////////////////////////////////////
///////             TEST                 //////
///////////////////////////////////////////////

var home_xml =  {
    'gg' : Curtain + Garden + Home_Light 
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*") 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept") 
  res.header("Content-type" , 'application/json')
  next() 
}) 

app.get('/', function (req, res) {
    res.json(home)
})

app.get('/text', function (req, res) {
        res.set('Content-Type', 'text/xml') 
        res.send(xml(home_xml)) 
    })


//////////////////////////////////
/// TOP IS RETURN JSON ///////////
//////////////////////////////////

//////////////////////////////////
/// TOP IS HUMIDITY BUTTON ///////
//////////////////////////////////
app.get('/hum/on', function (req, res) {
    home.Humidity.button = 1
    console.log('Humbutton is ' + home.Humidity.button)
    window.location.href = 'http://192.168.0.7:8000/pumpon'        
    res.redirect('http://192.168.0.30:3000')

})


app.get('/hum/off', function (req, res) {
    home.Humidity.button = 0
    console.log('Humbutton is ' + home.Humidity.button)
    window.location.href = 'http://192.168.0.7:8000/pumpoff'        
    res.redirect('http://192.168.0.30:3000')
})

//////////////////////////////////
/// TOP IS HUMIDITY BUTTON ///////
//////////////////////////////////

///////////////////////////////
///  IS CURTAIN BUTTON ////////
///////////////////////////////

app.get('/cur/on', function (req, res) {
    home.Curtain.button = 1
    console.log('Curtain is ' + home.Curtain.button)
    window.location.href = 'http://192.168.0.6:8000/curtainon'        
    res.redirect('http://192.168.0.30:3000')
    
})

app.get('/cur/off', function (req, res) {
    home.Curtain.button = 0
    console.log('Curtain is ' + home.Curtain.button)
    window.location.href = 'http://192.168.0.6:8000/curtainoff'        
    res.redirect('http://192.168.0.30:3000')
    
})
//////////////////////////////////
///  IS CURTAIN BUTTON ///////////
//////////////////////////////////

/////////////////////////////
///  IS Light1 BUTTON ///////
/////////////////////////////

app.get('/l1/on', function (req, res) {
    home.light.no_1 = 1
    console.log('Light1 is ' + home.light.no_1)    
    window.location.href = 'http://192.168.0.4:8000/led1on'   
    res.redirect('http://192.168.0.30:3000')
})

app.get('/l1/off', function (req, res) {
    home.light.no_1 = 0
    console.log('Light1 is ' + home.light.no_1)
    window.location.href = 'http://192.168.0.4:8000/led1off'    
    res.redirect('http://192.168.0.30:3000')
    
})
/////////////////////////////
///  IS Light1 BUTTON ///////
/////////////////////////////

/////////////////////////////
///  IS Light2 BUTTON ///////
/////////////////////////////

app.get('/l2/on', function (req, res) {
    home.light.no_2 = 1
    console.log('Light2 is ' + home.light.no_2)
    window.location.href = 'http://192.168.0.4:8000/led2on'        
    res.redirect('http://192.168.0.30:3000')
    
})

app.get('/l2/off', function (req, res) {
    home.light.no_2 = 0
    console.log('Light2 is ' + home.light.no_2)
    window.location.href = 'http://192.168.0.4:8000/led2off'        
    res.redirect('http://192.168.0.30:3000')
    
})
/////////////////////////////
///  IS Light2 BUTTON ///////
/////////////////////////////

/////////////////////////////
///  IS Light3 BUTTON ///////
/////////////////////////////

app.get('/l3/on', function (req, res) {
    home.light.no_3 = 1
    console.log('Light3 is ' + home.light.no_3)
    window.location.href = 'http://192.168.0.4:8000/led3on'        
    res.redirect('http://192.168.0.30:3000')
    
})

app.get('/l3/off', function (req, res) {
    home.light.no_3 = 0
    console.log('Light3 is ' + home.light.no_3)
    window.location.href = 'http://192.168.0.4:8000/led3off'        
    res.redirect('http://192.168.0.30:3000')
    
})
///////////////////////////////
///  IS Light3 BUTTON /////////
///////////////////////////////

server.listen(8000,'192.168.0.30',function(){
})
console.log( networkInterfaces.en0[1].address )

    // setInterval(()=>{
    //     fetch('http://192.168.0.4')
    //     .then(res=>res.json())
    //     .then((data)=>{
    //         home.Humidity.button = data.Humidity
    //         home.Temp.stat_C = data.Temperature
    //         home.Temp.gas = data.Gas
    //         home.light.no_1 = data.Light1
    //         home.light.no_2 = data.Light2
    //         home.light.no_3 = data.Light3
    //     })
    // },5000)

/////////////////////////////////////////////////////
/// TOP is fetch data from humidity(temp,hum,gas) ///
/////////////////////////////////////////////////////


//     setInterval(()=>{
//         fetch('http://192.168.0.5')
//         .then(res=>res.json())
//         .then((data)=>{
//        home.Temp.stat_C = data.temp[0].toFixed(2),
//        home.Humidity.status = data.hum[0].toFixed(2)
//     })
// },2000)

//////////////////////////////////////////
/// TOP is fetch data from trash(status) ///
//////////////////////////////////////////

    setInterval(()=>{
        fetch('http://192.168.0.6')
        .then(res=>res.json())
        .then((data)=>{
            console.log(data.Curtain[0])
            home.Curtain.button = data.Curtain[0]
        })
    //     .then((data)=>{
    //    home.Temp.stat_C = data.temp[0].toFixed(2),
    //    home.Humidity.status = data.hum[0].toFixed(2)
    // })
},10000)

//////////////////////////////////////////////
/// TOP is fetch data from curtain(button) ///
//////////////////////////////////////////////

//     setInterval(()=>{
//         fetch('http://192.168.0.7')
//         .then(res=>res.json())
//         .then((data)=>{
//        home.Temp.stat_C = data.temp[0].toFixed(2),
//        home.Humidity.status = data.hum[0].toFixed(2)
//     })
// },2000)

/////////////////////////////////////////////
/// TOP is fetch data from garden(button) ///
/////////////////////////////////////////////


// setInterval(()=>{
//     fetch('http://192.168.0.105')
//     .then
// },2000)