DuckieTV.controller('serieTorrentSettingsCtrl', function($scope, $filter, $modalInstance, FavoritesService, FormlyLoader, data) {
    console.info("Reinitcontroller!");
    $scope.model = FavoritesService.getById(data.serie.TVDB_ID); // refresh the model because it's cached somehow by the $modalInstance. (serialisation probably)
    $scope.model.autoDownload = $scope.model.autoDownload == 1;

    FormlyLoader.load('SerieTorrentSettings').then(function(form) {
        $scope.fields = form;
    });

    $scope.save = function() {
        $scope.model.autoDownload = $scope.model.autoDownload ? 1 : 0;
        $scope.model.customSearchString = $scope.model.customSearchString;

        $scope.model.Persist().then(function() {
            $modalInstance.close();
            $scope.$destroy();
        });
    };

    $scope.cancel = function() {
        $modalInstance.close();
        $scope.$destroy();
    };

});