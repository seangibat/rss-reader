app.controller("VoiceSettingsCtrl", ["$scope", "VoiceSettings", "$interval", function($scope, VoiceSettings, $interval) {
  $scope.VoiceSettings = VoiceSettings;

  $scope.save = function(){
    VoiceSettings.save();
    $scope.saveMessage = "Saved!";
  }

  var prom = $interval(function(){
    $scope.languages = [];
    speechSynthesis.getVoices().forEach(function(voice){ 
      if ($scope.languages.indexOf(voice.lang) < 0) {
        $scope.languages.push(voice.lang) 
      }
    });
    $scope.selectedLang = "en-US";
    $scope.voices = speechSynthesis.getVoices();
    console.log($scope.voices, $scope.languages);

    if ($scope.languages.length) {
      $interval.cancel(prom);
    }
  },500);

}]);