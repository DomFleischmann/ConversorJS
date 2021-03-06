function myFunction(){
	var input = document.getElementById('data').value;;

	var getValues = function(input) {
		var values = [];
		var continued = false;
		var cont = 0;
		for (var i = 0; input.length > i; i++) {
			if (!isNaN(input[i])) {
				if (continued) {
					values[cont] += input[i];
				} else {
					continued = true;

					values.push("");
					values[cont] += input[i];
				}

			} else {
				if(continued){
					cont++;
					continued = false;
				}
			}
		}

		return values;
	}
	var values = getValues(input);
	var noValues = input;
	for(var i = 0; values.length > i;i++){
		noValues = noValues.replace(values[i], " ");
	}

	var separateWords = function (input){
		input = input.split(" ");
		var cleanArray = [];
		for(var i = 0 ; i < input.length;i++){
			if(input[i] !== ""){
				cleanArray.push(input[i]);
			}
		}

		return cleanArray;
	}

	var potentialUnits = separateWords(noValues);

	function Unit(si,names){
		this.si = si;
		this.names = names;
		this.toSI = function(number){
			return number / this.si;
		}
		this.toUnit = function(number){
			return number * this.si;
		}
		this.parse =  function(input){
			for(var i = 0; i < this.names.length; i++){
				for(var j = 0; j < input.length;j++){
					if(this.names[i] === input[j]){
						return true;
					}
				}
			}
			return false;
		}
	}
	

	function LengthUnit(si, names){
		this.si  = si;
		this.names = names;
	}

	LengthUnit.prototype = new Unit();

	var meter = new LengthUnit(1,["meters","meter","m"]);
	var feet = new LengthUnit(3.28084,["feet","foot","ft","'"]);
	var miles = new LengthUnit(0.000621371,["miles","mile","mi"]);
	var yards = new LengthUnit(1.09361,["yards","yd","yard"]);
	var inches = new LengthUnit(39.3701,["inches","inch","in","\""]);

	var lengthUnits = [meter,feet,miles,yards,inches];

	/*for(var s = 0; s < lengthUnits.length;s++){
	for(var r = 0; r < lengthUnits[s].names.length;r++){
	alert(lengthUnits[s].names[r]);
	}
	}*/

	function parseLengthInput(input,values){
		for(var i = 0; i < lengthUnits.length;i++){
			if(lengthUnits[i].parse(input)){
				for(var j = 0; j < values.length; j++){
					alert(lengthUnits[i].toSI(values[j]) + "meters");
				}
			}
		}
	}

	parseLengthInput(potentialUnits,values);

}