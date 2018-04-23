app.controller("personsCtrl", function ($scope, $location, personsService) {

    $scope.persons =[];

    personsService.getPersons().then(function (response) {
        $scope.persons = personsService.persons;

    }, function () {
        alert("Get persons returns error");
    });

    $scope.selectedPerson = {};

    $scope.addEditPerson = function(){
        if($scope.selectedPerson){
            if($scope.selectedPerson.id){
                personsService.editPerson($scope.selectedPerson);
            }
            else{
                personsService.addPerson($scope.selectedPerson);
            }
        }

        $("#modelId").modal('hide');

    }

    $scope.clearModel = function(){
        $scope.selectedPerson = {};
    }

    $scope.sortProp ="";
    $scope.filterProp="";

    $scope.filterPersons = function (person){
        if($scope.filterProp ==="" || person.fName.toLowerCase().includes($scope.filterProp.toLowerCase())){
            return true;
        }
        else{
            return false;
        }
    }

   $scope.editPerson = function(person){
    $scope.selectedPerson = _.clone(person);
    $("#modelId").modal('show');

   }


$('#modelId').on('hide.bs.modal', function (e) {
$scope.selectedPerson = {};
})

    $scope.deletePerson = function(person){
        if(person){
            personsService.deletePerson(person);
        }
    }

});