const { parseFunction } = require('../utils/utils');

const validationRules = request => {
  if (!request.user) {
    throw Error('Validation failed. Please login to continue.');
  }
}

Parse.Cloud.beforeSave('Template', 
	parseFunction(async request => {
    // console.log(' ---- request: ', request);
  }),
  validationRules,
  // { requireUser: true },
)