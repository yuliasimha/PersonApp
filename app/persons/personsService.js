app.factory("personsService", function ($http, $q, ) {

    function Person(personData){
      this.fName = personData.fName;
      this.lName = personData.lName;
      this.age = personData.age;
      if(personData.id){
      this.id = personData.id;
      }
      else{
          this.id = _.uniqueId();
      }
    }

    var persons =[];
    function getPersons(){
      var async =$q.defer();
      $http.get("files/persons.json").then(function(response){
        persons.splice(0, persons.length);
        for(var i = 0; i < response.data.length; i++)
        {
            person = response.data[i];
            if(person){
                persons.push(new Person(person));
            }
        }
        async.resolve();
    },function(response){
        console.log("Can't read persons data");
        async.reject();
      });
      return async.promise;
    }

    
    function addPerson(person){
        if(person)
        {
            var personIndex =  _.findIndex(persons, function (personObj) { return personObj.id === person.id });
            if(personIndex >= 0){
                console.log("Person with such id is already exists");
            }
            else{
                persons.push(new Person(person));
            }
        }
    }

    function deletePerson(person){
        if(person)
        {
            var personIndex =  _.findIndex(persons, function (personObj) { return personObj.id === person.id });
            if(personIndex < 0){
                console.log("Can't delete non existing person");
            }
            else{
                persons.splice(personIndex, 1);
            }
        }
    }

    function editPerson(updatedPerson){
        if(updatedPerson)
        {
            var personIndex =  _.findIndex(persons, function (personObj) { return personObj.id === updatedPerson.id });
            if(personIndex < 0){
                console.log("Can't edit non existing person");
            }
            else{
                persons[personIndex] = _.clone(updatedPerson)
            }
        }
    }


    return {
        persons: persons,
        getPersons: getPersons,
        deletePerson : deletePerson,
        editPerson : editPerson,
        addPerson : addPerson
    };
    
});