function dropDown() {
    var dropDownID = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
     // console.log(data);
     var sampleIDs = data.names;
     // console.log(sampleIDs);
     sampleIDs.forEach((sampleValue) => {
         dropDownID.append("option")
         .text(sampleValue)
         .property("value", sampleValue);
     });
 var sampleID  = sampleIDs[0];
 // console.log(sampleID)
 metaData(sampleID);
 chart(sampleID);
 });
 
 }
 dropDown();
 
 function optionChanged(sample) {
     metaData(sample);
     chart(sample);
 
 }
 
 function metaData(sampleID) {
     d3.json("samples.json").then((data) => {
         // console.log(data);
         var metaIDs = data.metadata; 
         // console.log(metaIDs.id);
         // for (var i = 0; i < metaIDs.length; i++) {
             // console.log(metaIDs[i])
             var filterID = metaIDs.filter(object => object.id == sampleID);
             console.log(filterID);
             var results = filterID[0];
             var display = d3.select("#sample-metadata");
             display.html("");
             Object.entries(results).forEach(([key, value]) => {
                 display.append("h6").text(`${key} ${value}`);
             })
         // };
     });
 };
 
 function chart(sampleID) {
     samples
 }