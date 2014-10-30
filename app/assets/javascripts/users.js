  google.load('visualization', '1.0', {
    'packages': ['controls']
  });

  function drawVisualization() {
    var var1 = document.getElementById('var1').value;
    var var2 = document.getElementById('var2').value;
    var queryText = encodeURIComponent("SELECT " + var1 + ", " + var2 + " FROM 1ANohL0vlL2Z4dP5yE-bV34rONS8WdG9L0_3TXo23");


    google.visualization.drawChart({
      "containerId": "graph",
      "dataSourceUrl": 'https://www.google.com/fusiontables/gvizdata?tq=',
      "query": "SELECT " + var1 + ", " + var2 + " FROM 1ANohL0vlL2Z4dP5yE-bV34rONS8WdG9L0_3TXo23",
      "refreshInterval": 5,
      "chartType": "ScatterChart",
      "options": {
        "title": var1 + "vs" + var2,
        "vAxis": {
          "title": var2
        },
        "hAxis": {
          "title": var1
        },
        "trendlines": {
          0: {}

        },
        height: 1000,
        width: 1000

      }
    });
  }

  // google.setOnLoadCallback(drawVisualization);
