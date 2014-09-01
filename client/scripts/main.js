
//// Write Date

function writeDate() {
    var date = new Date();
    var day = date.getDate();
	var month = date.getMonth();
	month++;	// increment because January is 0
	var year = date.getFullYear();
    var element = document.createElement('div');
    element.id = "date";
    document.body.appendChild(element);
    element.appendChild(document.createTextNode
        //(date.toDateString()));
		(month + "/" + day + "/" + year));
}

//// Write Time

function writeTime() {
    var date = new Date();
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
    element.id = "time";
    document.body.appendChild(element);
    element.appendChild(document.createTextNode
    	(time));
}

//// Get Headlines

google.load("feeds", "1");

    function writeNews() {
      var feed = new google.feeds.Feed("https://news.google.com/?output=rss");
      feed.setNumEntries(1)  // fetches 4 by default but this sets most recent headline
      feed.load(function(result) {
        if (!result.error) {
          for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            var element = document.createElement("div");
            element.id = "news";
            document.body.appendChild(element);
            element.appendChild(document.createTextNode
                (entry.title));
            google.setOnLoadCallback(writeNews);  // put this inside function to write after click
          }
        }
      });
    }

//// Get Moon Phase

google.load("feeds", "1");

    function writeMoon() {
      var feed = new google.feeds.Feed("http://feeds.feedburner.com/FarmersAlmanac-CurrentMoonPhase");
      feed.setNumEntries(1)  // fetches 4 by default but this sets most recent headline
      feed.load(function(result) {
        if (!result.error) {
          for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            var element = document.createElement("div");
            element.id = "moon";
            document.body.appendChild(element);
            element.appendChild(document.createTextNode
                (entry.title));
            google.setOnLoadCallback(writeMoon);  // put this inside function to write after click
          }
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
            element.id = "quake";
            document.body.appendChild(element);
            element.appendChild(document.createTextNode
            ("Current Quake Location: " + (quakePlace) + " Magnitude: " + (quakeMag)));
        }
    });
}

//// BTC Value in USD

function writeBTC() {
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        data: {},
        url: "http://coinabul.com/api.php",
        success: function (msg) {
            var number = msg["BTC"]["USD"];
            var element = document.createElement('div');
            element.id = "btc";
            document.body.appendChild(element);
            element.appendChild(document.createTextNode
            ("Current value of Bitcoin in USD: " + Math.round(number)));
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
//        error: function (jqXHR, textStatus, errorThrown) {    // Example of error function
//            console.log(jqXHR)
//        },
        success: function (msg) {
            var number = msg["Gold"]["USD"];
            var element = document.createElement('div');
            element.id = "gold";
            document.body.appendChild(element);
            element.appendChild(document.createTextNode
            ("Current value of Gold in USD: " + Math.round(number)));
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
            element.id = "silver";
            document.body.appendChild(element);
            element.appendChild(document.createTextNode
            ("Current value of Silver in USD: " + Math.round(number)));
        }
    });
}

//// Get ANU Quantum Random Number

function writeQuantum() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        data: {},
        url: '/server/scripts/proxy.php?url=http%3A%2F%2Fqrng.anu.edu.au%2FAPI%2FjsonI.php%3Flength%3D1%26type%3Duint16',	//proxy for json xdomain
        success: function (msg) {
            var number = msg["contents"]["data"][0];
            var element = document.createElement('div');
            element.id = "quantum";
            document.body.appendChild(element);
            element.appendChild(document.createTextNode
            ("ANU Quantum Random Number: " + (number)));
        }
    });
}


//////////////////////////////////////// REMEMBER THIS MOMENT!

$(document).ready(function() {
    $("#moment[data-action]").click(function(){
        
        
        writeDate();
        writeTime();
        writeNews();
        writeMoon();
        writeQuake();
        writeBTC();
        writeGold();
        writeSilver();
        writeQuantum();
        
       // fadeButton();

    }); 
});

