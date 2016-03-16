var app = angular.module('streamstats', ['ngRoute', 'ngAnimate']);
app.config(['$routeprovider', function($routeProvider){

  $routeProvider.when('/twitch', {
templateUrl: 'partials/twitchstats.html',
controller: 'TwitchStatsController',
  }).otherwise({
    templateUrl: 'partials/index.html',
    controller: 'MainController',
  });
}]);
app.controller('TwitchStatsController', function($scope, $http, $sce){
    $scope.searchuser = function(){
            $http({method: 'GET', url: 'https://api.twitch.tv/kraken/channels/' + $scope.usersearch}).then(function successCallback(response){
         var data = response.data;
         var Avatar = data['logo'];
         var Username = data['display_name'];
         var Online = data['online'];
         if(data['type'] != null){
            var lastPlayed = data['game'];
         }else{
            var lastPlayed = "None";
         }
         var joined = data['createdAt'];
         var html = '<center><img src="' + avatar + '"width="100px" height="100px" style="border:3px solid #fff">';
         html += '<h1><span class="label label-success">' + Username + '</h1>';
         html += '<br><b><span class="label label-success">Followers:' + followers + '</b>';
         html += '<br><b><span class="label label-success">Last Follower:' + Follows + '</b>';
         html += '<br><b><span class="label label-success">Total Views:' + totalViews + '</b>';
         html += "<br>";
         html += '<br><b><span class="label label-success">Current Status: ' + online + '</b>';
         html += "<br>";
         html += '<br><b><span class="label label-info"><font color="White"><a href="https://twitch.tv/' + Username + '">Twitch.tv/'+ Username +'</a></font></b>';
         html += '<br><b><span class="label label-danger">Partnered:' + sub + '</b>';
         html += '<br><b><span class="label label-primary">Has mature content: ' + mature + '</b>';
         html += '<br><b><span class="label label-primary">Last Played: ' + lastPlayed + '</b>'
         html += "<br>";
         if(Online){
             html += '<br><b><font color="White"><a href="https://twitch.tv/' + Username + '">Online</a></font></b>';
         }else{
             html += '<br><b><font color="red">Offline</font></b>';
         }

         html += '<br><b><span class="label label-primary">Joined on: '+joined+' </b>'.replace('T', ' at ');
         $scope.profileT = $sce.trustAsHtml(html);
            });

      };

});
app.controller('MainController', function($scope, $http){


});
