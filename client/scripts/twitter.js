function twitClick() {
    var title = document.title;
    var url = "http://testicusmaximus.com";
    var maxLength = 140 - (url.length + 1);
    if (title.length > maxLength) {
        title = title.substr(0, (maxLength - 3)) + '...';
    }
    var link = 'http://twitter.com/home?status=' + encodeURIComponent(title + '-' + url);
    return window.open(link, 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
}