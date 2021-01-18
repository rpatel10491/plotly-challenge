function readFile(sample) {

    d3.json('samples.json').then((data) => {
        //console.log(data);
        var names = data.names;
        var metadata = data.metadata;
        var samples = data.samples;
        console.log(otulabels);
        //var sample = '940'
        console.log(sample);
    
        var dropdownMenu = d3.select("#selDataset");
        names.forEach((ids) =>  {
            dropdownMenu.append('option').property('value', ids).text(ids);
        });
    
    
        // sort data
    
        // filter the data. This filters down json data to the id we reference in line 10
        var filtered_data = samples.filter(data => data.id == sample);
        console.log(filtered_data);
    
        var results = filtered_data[0];
    
        var filtered_metadata = metadata.filter(metadata => metadata.id == sample);
        console.log(filtered_metadata);
    
        var metadata_results = filtered_metadata[0];
        var dem_id = d3.select("#sample-metadata");
        dem_id.html('')
        Object.entries(metadata_results).forEach(([key, value]) => {
                dem_id.append('li').text(`${key}: ${value}`);
    
            });
            
    
        //var samplevalues = samplesArray.sample_values;
        //var sortedsamples = results.sort((a,b) =>
        //b.sample - a.sample);
    
        //slice to find top 10
    
        var topsamples = results.sample_values.slice(0,10).reverse();
    
        //reverse array to accomodate plotly's defaults
    
        //var reversed = sliced.reverse();
        //var samples_values = sample_values.slice(0, 10).reverse()
        var otulabels = results.otu_labels;
        var otu_labels = otulabels.slice(0, 10).reverse()
    
        //create horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
    
        var trace1 = {
                x: topsamples,
                y: otu_labels,
                type: 'bar',
                orientation: 'h'
            };
    
            var data = [trace1];
    
            var layout = {
                title: 'Top Ten OTUs in Sample',
                xaxis: {title: 'Sample Value'},
                yaxis: {title: 'OTU ID'},
            };
    
            Plotly.newPlot('bar', data, layout)
    
    
            //create a bubble char that displays each sample
            //create variables here for the bubble
            var otu_ids = results.otu_ids
            var sample_values = results.samples_values
    
            var trace2 = {
                x: sample_values,
                y: otu_ids,
                text: otulabels,
                mode: 'markers',
                marker:{
                    size: sample_values,
                    color: otu_ids
                }
            };
    
            var data2 = [trace2];
    
            //Create bubble chart layout
            var layout2 = {
                title: 'All OTUs in Sample',
                xaxis: {title: 'OTU ID'},
                yaxis: {title: 'Number of Samples Found'}
    
            }
    
            Plotly.newPlot('bubble', data2, layout2);
    
            //dropdown selection just for sample ids
    
            // var dropdownMenu = d3.select("#selDataset");
            // names.forEach((ids) =>  {
            //     dropdownMenu.append('option').property('value', ids).text(ids);
            // });
    
    
    })
    };
    
    //changes data with each selection
    function optionChanged(newsample){readFile(newsample)};
    
    
    readFile();
    //could add in an init function to show one id as a default or populate dropdown and pick first one found
    