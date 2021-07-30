const { parseFunction } = require('../utils/utils');

Parse.Cloud.beforeSave('Template', 
	parseFunction(async request => {
    console.log(' ---- request: ', request);
  })
)