/* 
Librerie necessarie allo script objApp leggi istruzioni per caricamento:

   caricare la libreria ObjApp project MTeYmpfWgqPbiBkVHnpgnM9kh30YExdAc
   usare metodo rangeToObjectsNoCamel()
   es. var dataObjectsArray = rangeToObjectsNoCamel(sheet.getDataRange().getValues())

   ".. restituisce un oggetto a partire da un range, le proprietà conserveranno i nomi esatti delle headers dello sheet,
    quindi per maneggiare i dati è sufficiente la notazione obj['Prop 1'];
    se invece si usa 'rangeToObjects' le proprietà saranno convertite in camelCase,
    ad esempio:  'propA' invece di 'Prop A' .."
*/

/* 
Gestione delle date in codice.gs:

    // quando completa l'Object lo aggiunge all'array di Objects
    // 1. inizializzare una variabile con il contenuto delle celle "date"
    var existingDate = dataObjects.Data 
    // 2. formattare l'array contenente le date nel formato desiderato
    dataObjects.Data = Utilities.formatDate(new Date(existingDate), "CET", "dd/MM/yyyy")
    // 3. inserire nell'array l'object così ottenuto
    dataObjectsArray.push(dataObjects)
*/

// Database Monitoraggi attività GTART: 
// https://docs.google.com/spreadsheets/d/1A2-BGyBcXVRBnywFuz3giulmzotOwMQIuEIkb6b24BU/edit#gid=0

ss = SpreadsheetApp.openById('1A2-BGyBcXVRBnywFuz3giulmzotOwMQIuEIkb6b24BU')
sheetname = 'Produzione'
sheet = ss.getSheetByName(sheetname)

// Database utenti UABNet
// https://docs.google.com/spreadsheets/d/14GPU0TBpKUP9ul1a-wIuyumi8mAU1s5Ja-_eYbtb4Cg/edit#gid=1334604098
ssUser = SpreadsheetApp.openById('14GPU0TBpKUP9ul1a-wIuyumi8mAU1s5Ja-_eYbtb4Cg')
sheetnameUser = 'User'
sheetUser = ssUser.getSheetByName(sheetnameUser)