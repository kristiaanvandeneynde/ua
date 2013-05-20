/*
 * Based on Dustin Diaz's 'ify' script, which is why I've kept his license.
 * The regular expressions are different from his though, and IMHO more complete.
 *
 * Modified by Remy Sharp / http://remysharp.com / @rem
 * Last updated: $Date$
 *
 * Dustin's Credit:
 * Twita@talinkahashifyer
 * http://www.dustindiaz.com
 * http://www.dustindiaz.com/basement/ify.html
 *
 * Copyright (c) 2009 Dustin Diaz
 * licensed under public BSD
 */
var tweetify = function() {
  return {
    "link": function(t) {
      return t.replace(/[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_@:~%&\?\+#\/.=]+[^:\.,\)\s*$]/ig, function(m) {
        return '<a href="' + m + '">' + ((m.length > 25) ? m.substr(0, 24) + '...' : m) + '</a>';
      });
    },
    "at": function(t) {
      return t.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15}(\/[a-zA-Z0-9-_]+)*)/g, function(m, m1, m2) {
        return m1 + '@<a href="http://twitter.com/' + m2 + '">' + m2 + '</a>';
      });
    },
    "hash": function(t) {
      return t.replace(/(^|[^&\w'"]+)\#([a-zA-Z0-9_]+)/g, function(m, m1, m2) {
        return m1 + '#<a href="http://search.twitter.com/search?q=%23' + m2 + '">' + m2 + '</a>';
      });
    },
    "clean": function(tweet) {
      return this.hash(this.at(this.link(tweet)));
    }
  };
}();

function tweetTimeAgo(dateString) {
  var rightNow = new Date();
  var then = new Date(dateString);
   
  if ($.browser.msie) {
    // IE can't parse these crazy Ruby dates
    then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
  }

  var diff = rightNow - then,
      second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24,
      week = day * 7;

  if (isNaN(diff) || diff < 0) {
    return ""; // return blank string if unknown
  }

  if (diff < second * 2) {
    // within 2 seconds
    return "zojuist";
  }

  if (diff < minute) {
    return Math.floor(diff / second) + " seconden geleden";
  }

  if (diff < minute * 2) {
    return "ongeveer een minuut geleden";
  }

  if (diff < hour) {
    return Math.floor(diff / minute) + " minuten geleden";
  }

  if (diff < hour * 2) {
    return "ongeveer een uur geleden";
  }

  if (diff < day) {
    return  Math.floor(diff / hour) + " uur geleden";
  }

  if (diff > day && diff < day * 2) {
    return "gisteren";
  }

  if (diff < day * 365) {
    return Math.floor(diff / day) + " dagen geleden";
  }

  else {
    return "meer dan een jaar geleden";
  }
}

(function($) {
  $(function() {
    
    // Load and display tweets
    $.ajax({
      url: 'http://api.twitter.com/1/statuses/user_timeline.json/',
      type: 'GET',
      dataType: 'jsonp',
      data: {
        screen_name: 'UAntwerpen',
        count: 4,
      },
      success: function(data) {
        var i, len = data.length,
            tweet, full = '';
   
        for (i = 0; i < len; i++) {
          tweet = '<li>TWEET_TEXT - <a class="time" href="https://twitter.com/UAntwerpen/status/TWEET_ID">TWEET_AGO</a></li>';
          full += tweet.replace('TWEET_TEXT', tweetify.clean(data[i].text))
                       .replace('TWEET_AGO', tweetTimeAgo(data[i].created_at))
                       .replace('TWEET_ID', data[i].id_str);
        }

        $('.social .tweets').append(full);
      }  
    });

  });
})(jQuery);
