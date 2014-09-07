
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
    datediv.style.cssText = 'font-size:28px;color:#FBD258;height:110px;background-color:rgba(0,0,0,0.3);background-clip:content-box;padding-top:5px;padding-bottom:5px;';
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
            trenddiv.style.cssText = 'font-size:25px;color:#DB634F;height:110px;background-color:rgba(0,0,0,0.3);background-clip:content-box;padding-top:5px;padding-bottom:5px;';
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
            quantumdiv.style.cssText = 'font-size:50px;color:#40B47F;height:110px;background-color:rgba(0,0,0,0.3);background-clip:content-box;padding-top:5px;padding-bottom:5px;';
            quantumdiv.style.fontFamily="Roboto Condensed', Arial, Sans-serif";
            element.appendChild(document.createTextNode
            ((number)));
            var element = document.createElement('div');
            document.getElementById('quantumheader').appendChild(element);
            quantumheader.style.cssText = 'font-size:15px;';
            element.appendChild(document.createTextNode
            ("Current Quantum Number"));
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
            var decimals = Math.round(number * 100) / 100;
            var amount = decimals.toFixed(2);
            
            //element.id = "btc";    // if you need to id the div created above

            //document.body.appendChild(element);    // add div directly

            document.getElementById('btcdiv').appendChild(element);    // add div to another div
            btcdiv.style.cssText = 'font-size:50px;color:#F29A3F;height:110px;background-color:rgba(0,0,0,0.3);background-clip:content-box;padding-top:5px;padding-bottom:5px;';
            btcdiv.style.fontFamily="Roboto Condensed', Arial, Sans-serif";

            //document.getElementById('btcdiv').style.backgroundImage="url('/public/img/000.png')";     // add bg image

            element.appendChild(document.createTextNode
            ("$" + amount));

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
            var decimals = Math.round(number * 100) / 100;    // 2 decimal places
            var amount = decimals.toFixed(2);    // forces all 2 decimals even with trailing zero
            document.getElementById('golddiv').appendChild(element);
            golddiv.style.cssText = 'font-size:50px;color:#1D8281;height:110px;background-color:rgba(0,0,0,0.3);background-clip:content-box;padding-top:5px;padding-bottom:5px;';
            golddiv.style.fontFamily="Roboto Condensed', Arial, Sans-serif";
            element.appendChild(document.createTextNode
            ("$" + amount));
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
            var decimals = Math.round(number * 100) / 100;
            var amount = decimals.toFixed(2);
            document.getElementById('silverdiv').appendChild(element);
            silverdiv.style.cssText = 'font-size:50px;color:#FBD258;height:110px;background-color:rgba(0,0,0,0.3);background-clip:content-box;padding-top:5px;padding-bottom:5px;';
            silverdiv.style.fontFamily="Roboto Condensed', Arial, Sans-serif";
            element.appendChild(document.createTextNode
            ("$" + amount));
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
            quakediv.style.cssText = 'font-size:25px;color:#DB634F;height:110px;background-color:rgba(0,0,0,0.3);background-clip:content-box;padding-top:5px;padding-bottom:5px;';
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
            magdiv.style.cssText = 'font-size:50px;color:#44BF87;height:110px;background-color:rgba(0,0,0,0.3);background-clip:content-box;padding-top:5px;padding-bottom:5px;';
            magdiv.style.fontFamily="Roboto Condensed', Arial, Sans-serif";
            element.appendChild(document.createTextNode
            ((quakeMag)));
            var element = document.createElement('div');
            document.getElementById('magheader').appendChild(element);
            magheader.style.cssText = 'font-size:15px;';
            element.appendChild(document.createTextNode
            ("Current Earthquake Magnitude"));
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
            var stripped = entry.title.replace("Current Moon Phase:", '');    // Let's strip some of the output
            var element = document.createElement("div");
            document.getElementById('moondiv').appendChild(element);
            moondiv.style.cssText = 'font-size:32px;color:#F29A3F;height:110px;background-color:rgba(0,0,0,0.3);background-clip:content-box;padding-top:5px;padding-bottom:5px;';
            moondiv.style.fontFamily="Roboto Condensed', Arial, Sans-serif";
            element.appendChild(document.createTextNode
            (stripped));
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
            newsdiv.style.cssText = 'font-size:20px;color:#1D8281;height:120px;background-color:rgba(0,0,0,0.3);background-clip:content-box;padding-top:5px;padding-bottom:5px;';
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
    $("#questionlink[data-action]").click(function(){

        $('#footer').fadeOut(1000)
        $('#again').fadeOut(1000)
        $('#questions').fadeOut(1000)
        $('#twitterdiv').fadeOut(1000)

        $('#newsdiv').fadeOut(500)
        $('#quakediv').fadeOut(1000)
        $('#magdiv').fadeOut(1000)
        $('#moondiv').fadeOut(1000)
        $('#btcdiv').fadeOut(1500)
        $('#golddiv').fadeOut(1500)
        $('#silverdiv').fadeOut(1500)
        $('#datediv').fadeOut(2000)
        $('#trenddiv').fadeOut(2000)
        $('#quantumdiv').fadeOut(2000)

        $('#footer').delay(2000).hide().fadeIn(2000)
        $('#again').delay(2000).hide().fadeIn(2000)
        $('#questions').delay(2000).hide()
        $('#twitterdiv').delay(2000).hide().fadeIn(2000)
        $('#questionsbox').delay(2000).hide().fadeIn(2000)

    }); 
});


//// Twitter

$(document).ready(function() {
    $("#twitterlink[data-action]").click(function(){

        twitClick();

    }); 
});
