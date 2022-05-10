import Airtable from "airtable";

const base = new Airtable({apiKey: 'keyN5CAY6EINWFdsd'}).base('app8ZbcPx7dkpOnP0');


base('Students').select({
    view: 'Grid view'
  }).firstPage(function(err, records) {
    if (err) {console.log(err);
    return; }
    records.forEach((record) => {
      console.log(`${record.fields.Name} + ${record.id}`)
    })
  })
  


export default base;