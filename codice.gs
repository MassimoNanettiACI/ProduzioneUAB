function getScriptUrl() {
  var url = ScriptApp.getService().getUrl();
  return url;
}

function doGet() {

  return HtmlService
      .createTemplateFromFile('Index')
      .evaluate(); 
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

// ------------------------- lettura del DB e restituzione di dataObject

function readData(){

var currentUser = Session.getActiveUser().getEmail()
  //  Logger.log(currentUser)

var datiUtenteUAB = JSON.parse(loadUtenteUAB(currentUser))
  // Logger.log(datiUtenteUAB[0]['Funzione'])
  // Logger.log(datiUtenteUAB)

var dataProduzione = sheet.getDataRange().getValues()

// rimuove riga 2 e 3
// dataRilevazioni.splice(1,2)
// Logger.log (dataProduzione) 

var dataObjectsArray = ObjApp.rangeToObjectsNoCamel(dataProduzione) //Object con un Array di Objects

// modifica il formato della data di rilevazione
// dataObjectsArray.forEach(function(obj) { Utilities.formatDate(new Date(obj['Data']), "CET", "dd/MM/yyyy"); });
if(datiUtenteUAB[0]['Funzione'] == 'RUT') { 
      // ----------------- Filtra l'ufficio se è RUT
      var dataObjectsArrayFiltered
      var dataObjectsArraySum = []
        for ( var i = 0 ; i < datiUtenteUAB.length; i++ ) {
                
         dataObjectsArrayFiltered = dataObjectsArray.filter( function(el) {     
            return el.Ufficio == datiUtenteUAB[i]['Provincia'] && datiUtenteUAB[i]['Funzione'] == 'RUT'
        })
      
          for (var j=0; j<dataObjectsArrayFiltered.length; j++){
            dataObjectsArraySum.push(dataObjectsArrayFiltered[j])
          }        
        }
      
      // 
      dataObjectsArray = dataObjectsArraySum
      // ----------------- Fine Filtra l'ufficio se è RUT     
      }

// controlla il ruolo utente: viewer, editor, owner  

dataObjectsArray.forEach(function(obj){ 

  if(currentUser == obj['Nome utente']){
    obj.Ruolo = "Editor" ; 
  }
  else
  {
    obj.Ruolo = "Viewer"; 
  }
  
//  Logger.log(obj['Ufficio'])
  
})

// Logger.log(JSON.stringify(dataObjectsArray))

var mainObject = {  // quando completa l'array di Object costruisce l'oggetto Contenitore
      user: currentUser,
      table: dataObjectsArray,
    };
  
// Logger.log(mainObject);
// return mainObject  // il risultato viene restituito come Object
  Logger.log(JSON.stringify(mainObject));
  return JSON.stringify(mainObject) // il risultato viene restituito come JSON e sarà necesario effettuare JSON.parse()
}


// ---------------------------------------------
// estrazione dei dati dalla tabella Utenti UABNet

function loadUtenteUAB(user){
  
    var dataUserUAB =  sheetUser.getDataRange().getValues()
    
    var dataUserUABObjArray = ObjApp.rangeToObjectsNoCamel(dataUserUAB)
   
      dataUserUABObjArray = dataUserUABObjArray.filter(function(el){ 
        return el.Account == user
      
      })
    
//    Logger.log(dataUserUABObjArray)
//    Logger.log(dataUserUABObjArray.length)
    
    return JSON.stringify(dataUserUABObjArray)
    
}

// ---------------------------------------------