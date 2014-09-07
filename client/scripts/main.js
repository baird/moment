
//// Write Date

function writeDate() {
    var date = new Date();
    var day = date.getDate();
	var month = date.getMonth();
	month++;	// increment because January is 0
	var year = date.getFullYear();
    var hours = date.getHours();    // Grabbing times in sections to create AM/PM format
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;    // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    var time = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    var element = document.createElement('div');
    //element.id = "date";    // could name this div
    document.getElementById('datediv').appendChild(element);
    datediv.style.cssText = 'border: 1px solid #333333;font-size:30px;color:#FBD258;height:100px;background-color:rgba(0,0,0,0.3);';
    datediv.style.fontFamily="Roboto Condensed', Arial, Sans-serif";
    element.appendChild(document.createTextNode
	(month + "/" + day + "/" + year + " | " + (time)));
    var element = document.createElement('div');
    document.getElementById('dateheader').appendChild(element);
    dateheader.style.cssText = 'font-size:15px;';
    element.appendChild(document.createTextNode
    ("Current Time"));
    $('#datediv').hide().fadeIn(4000)
}

//// Get Twitter Trends

function writeTrends() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        data: {},
        url: '/server/scripts/tproxy.php?url='+encodeURIComponent('trends/place.json?id=23424977'), //proxy for lame oauth1.1
        success: function (msg) {
            var trend = msg["0"]["trends"][0]["name"];
            var element = document.createElement('span');
            document.getElementById('trenddiv').appendChild(element);
            trenddiv.style.cssText = 'border: 1px solid #333333;font-size:25px;color:#DB634F;height:100px;background-color:rgba(0,0,0,0.3);';
            trenddiv.style.fontFamily="Roboto Condensed', Arial, Sans-serif";
            element.appendChild(document.createTextNode
            ((trend)));
            var element = document.createElement('div');
            document.getElementById('trendheader').appendChild(element);
            trendheader.style.cssText = 'font-size:15px;';
            element.appendChild(document.createTextNode
            ("Current Twitter Trend"));
            $('#trenddiv').hide().fadeIn(4000)

        }
    });
}

//// Get ANU Quantum Random Number

function writeQuantum() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        data: {},
        url: '/server/scripts/proxy.php?url=' + encodeURIComponent('http://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint16'),    //proxy for json xdomain
        success: function (msg) {
            var number = msg["contents"]["data"][0];
            var element = document.createElement('div');
            document.getElementById('quantumdiv').appendChild(element);
            quantumdiv.style.cssText = 'border: 1px solid #333333;font-size:50px;color:#40B47F;height:100px;background-color:rgba(0,0,0,0.3);';
            quantumdiv.style.fontFamily="Roboto Condensed', Arial, Sans-serif";
            element.appendChild(document.createTextNode
            ((number)));
            var element = document.createElement('div');
            document.getElementById('quantumheader').appendChild(element);
            quantumheader.style.cssText = 'font-size:15px;';
            element.appendChild(document.createTextNode
            ("Quantum Number"));
            $('#quantumdiv').hide().fadeIn(4000)
        }
    });
}

//// BTC Value in USD (some commented examples of optional use)

function writeBTC() {
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        data: {},
        url: "http://coinabul.com/api.php",

        //error: function (jqXHR, textStatus, errorThrown) {    // Example of error function
        //    console.log(jqXHR)
        //},

        success: function (msg) {
            var number = msg["BTC"]["USD"];
            var element = document.createElement('div');
            
            //element.id = "btc";    // if you need to id the div created above

            //document.body.appendChild(element);    // add div directly

            document.getElementById('btcdiv').appendChild(element);    // add div to another div
            btcdiv.style.cssText = 'border: 1px solid #333333;font-size:50px;color:#F29A3F;height:100px;background-color:rgba(0,0,0,0.3);';
            btcdiv.style.fontFamily="Roboto Condensed', Arial, Sans-serif";

            //document.getElementById('btcdiv').style.backgroundImage="url('/public/img/000.png')";     // add bg image

            element.appendChild(document.createTextNode
            ("$" + Math.round(number * 100) / 100));

            // Let's add the header

            var element = document.createElement('div');
            document.getElementById('btcheader').appendChild(element);
            btcheader.style.cssText = 'font-size:15px;';
            element.appendChild(document.createTextNode
            ("Current Bitcoin Value"));
            $('#btcdiv').hide().fadeIn(4000)

        }
    });
}

//// Gold Value in USD

function writeGold() {
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        data: {},
        url: "http://coinabul.com/api.php",
        success: function (msg) {
            var number = msg["Gold"]["USD"];
            var element = document.createElement('div');
            document.getElementById('golddiv').appendChild(element);
            golddiv.style.cssText = 'border: 1px solid #333333;font-size:50px;color:#1D8281;height:100px;background-color:rgba(0,0,0,0.3);';
            golddiv.style.fontFamily="Roboto Condensed', Arial, Sans-serif";
            element.appendChild(document.createTextNode
            ("$" + Math.round(number * 100) / 100));
            var element = document.createElement('div');
            document.getElementById('goldheader').appendChild(element);
            goldheader.style.cssText = 'font-size:15px;';
            element.appendChild(document.createTextNode
            ("Current Gold Value"));
            $('#golddiv').hide().fadeIn(4000)
        }
    });
}

//// Silver Value in USD

function writeSilver() {
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        data: {},
        url: "http://coinabul.com/api.php",
        success: function (msg) {
            var number = msg["Silver"]["USD"];
            var element = document.createElement('div');
            document.getElementById('silverdiv').appendChild(element);
            silverdiv.style.cssText = 'border: 1px solid #333333;font-size:50px;color:#FBD258;height:100px;background-color:rgba(0,0,0,0.3);';
            silverdiv.style.fontFamily="Roboto Condensed', Arial, Sans-serif";
            element.appendChild(document.createTextNode
            ("$" + Math.round(number * 100) / 100));
            var element = document.createElement('div');
            document.getElementById('silverheader').appendChild(element);
            silverheader.style.cssText = 'font-size:15px;';
            element.appendChild(document.createTextNode
            ("Current Silver Value"));
            $('#silverdiv').hide().fadeIn(4000)
        }
    });
}

//// Get EarthQuakes

function writeQuake() {
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        jsonp: false,
        jsonpCallback: 'eqfeed_callback',
        data: {},
        url: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojsonp",
        success: function (msg) {
            var quakeMag = msg["features"][0]["properties"]["mag"];
            var quakePlace = msg["features"][0]["properties"]["place"];
            var element = document.createElement('div');
            document.getElementById('quakediv').appendChild(element);
            quakediv.style.cssText = 'border: 1px solid #333333;font-size:28px;color:#DB634F;height:100px;background-color:rgba(0,0,0,0.3);';
            quakediv.style.fontFamily="Roboto Condensed', Arial, Sans-serif";
            element.appendChild(document.createTextNode
            ((quakePlace)));
            var element = document.createElement('div');
            document.getElementById('quakeheader').appendChild(element);
            quakeheader.style.cssText = 'font-size:15px;';
            element.appendChild(document.createTextNode
            ("Current Earthquake"));
            var element = document.createElement('div');
            document.getElementById('magdiv').appendChild(element);
            magdiv.style.cssText = 'border: 1px solid #333333;font-size:50px;color:#44BF87;height:100px;background-color:rgba(0,0,0,0.3);';
            magdiv.style.fontFamily="Roboto Condensed', Arial, Sans-serif";
            element.appendChild(document.createTextNode
            ((quakeMag)));
            var element = document.createElement('div');
            document.getElementById('magheader').appendChild(element);
            magheader.style.cssText = 'font-size:15px;';
            element.appendChild(document.createTextNode
            ("Earthquake Magnitude"));
            $('#quakediv').hide().fadeIn(4000)
            $('#magdiv').hide().fadeIn(4000)
        }
    });
}

//// Get Moon Phase (Some comments about Google Feed API)

google.load("feeds", "1");

    function writeMoon() {
      var feed = new google.feeds.Feed("http://feeds.feedburner.com/FarmersAlmanac-CurrentMoonPhase");
      feed.setNumEntries(1)  // fetches 4 by default but this sets most recent headline
      feed.load(function(result) {
        if (!result.error) {
          for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            var element = document.createElement("div");
            document.getElementById('moondiv').appendChild(element);
            moondiv.style.cssText = 'border: 1px solid #333333;font-size:28px;color:#F29A3F;height:100px;background-color:rgba(0,0,0,0.3);';
            moondiv.style.fontFamily="Roboto Condensed', Arial, Sans-serif";
            element.appendChild(document.createTextNode
            (entry.title));
            google.setOnLoadCallback(writeMoon);  // put this inside function to write after click
            var element = document.createElement('div');
            document.getElementById('moonheader').appendChild(element);
            moonheader.style.cssText = 'font-size:15px;';
            element.appendChild(document.createTextNode
            ("Current Moon Phase"));
            $('#moondiv').hide().fadeIn(4000)
          }
        }
      });
    }

//// Get Headlines

google.load("feeds", "1");

    function writeNews() {
      var feed = new google.feeds.Feed("https://news.google.com/?output=rss");
      feed.setNumEntries(1)
      feed.load(function(result) {
        if (!result.error) {
          for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            var element = document.createElement("div");
            document.getElementById('newsdiv').appendChild(element);
            newsdiv.style.cssText = 'border: 1px solid #333333;font-size:20px;color:#1D8281;height:110px;background-color:rgba(0,0,0,0.3);';
            newsdiv.style.fontFamily="Roboto Condensed', Arial, Sans-serif";
            element.appendChild(document.createTextNode
                (entry.title));
            google.setOnLoadCallback(writeNews);
            var element = document.createElement('div');
            document.getElementById('newsheader').appendChild(element);
            newsheader.style.cssText = 'font-size:15px;';
            element.appendChild(document.createTextNode
            ("Current News Headline"));
             $('#newsdiv').hide().fadeIn(4000)
          }
        }
      });
    }


//////////////////////////////////////// REMEMBER THIS MOMENT!

$(document).ready(function() {
    $("#moment[data-action]").click(function(){
        
        $('#buttondiv').fadeOut(300)
        $('#footer').fadeOut(300)
        $('#twitterdiv').fadeOut(300)
        writeDate();
        writeTrends();
        writeQuantum();
        writeBTC();
        writeGold();
        writeSilver();
        writeQuake();
        writeMoon();
        writeNews();
        $('#footer').hide().fadeIn(4000)
        $('#again').hide().fadeIn(4000)
        $('#questions').hide().fadeIn(4000)
        $('#twitterdiv').hide().fadeIn(4000)




    }); 
});

//// Questions

$(document).ready(function() {
    $("#questions[data-action]").click(function(){

        $('#datediv').hide().fadeOut(4000)
        $('#trenddiv').hide().fadeOut(4000)
        $('#quantumdiv').hide().fadeOut(4000)
        $('#btcdiv').hide().fadeOut(5000)
        $('#golddiv').hide().fadeOut(5000)
        $('#silverdiv').hide().fadeOut(5000)
        $('#quakediv').hide().fadeOut(6000)
        $('#magdiv').hide().fadeOut(6000)
        $('#moondiv').hide().fadeOut(6000)
        $('#newsdiv').hide().fadeOut(7000)

        $('#footer').hide().fadeOut(8000)
        $('#again').hide().fadeOut(8000)
        $('#questions').hide().fadeOut(8000)

        $('#buttondiv').fadeIn(8000)
        $('#footer').hide().fadeIn(8000)
        $('#again').hide().fadeIn(4000)



    }); 
});

