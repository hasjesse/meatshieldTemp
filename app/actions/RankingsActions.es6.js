import Reflux from 'reflux';
import request from 'superagent';
import prefix from 'superagent-prefix';

// Table sample data
var dummyData = [
  {
    "category": "Games",
    "difficulty": 60.4,
    "labels": [
      {
        "key": "Lumbersexual",
        "value": "lumbersexual"
      }
    ],
    "organic_installs": {
      "estimated_count": 3204,
      "percentage": 25.5
    },
    "search_term": "Top Free iPhone Apps",
    "rank": 1,
    "volume": 60.4
  },
  {
    "category": "Games",
    "difficulty": 80.7,
    "labels": [
      {
        "key": "Sample",
        "value": "sample"
      },
      {
        "key": "Random Tag",
        "value": "random_tag"
      }
    ],
    "organic_installs": {
      "estimated_count": 3204,
      "percentage": 65.5
    },
    "search_term": "Thundercats",
    "rank": 10,
    "volume": 47.2
  },
  {
    "category": "Games",
    "difficulty": 36.4,
    "labels": [
      {
        "key": "Chambray",
        "value": "chambray"
      }
    ],
    "organic_installs": {
      "estimated_count": 3204,
      "percentage": 65.5
    },
    "search_term": "YOLO",
    "rank": 11,
    "volume": 60.4
  },
  {
    "category": "Games",
    "difficulty": 30,
    "labels": [
      {
        "key": "gastropub",
        "value": "gastropub"
      }
    ],
    "organic_installs": {
      "estimated_count": 3204,
      "percentage": 34.5
    },
    "search_term": "Paleo",
    "rank": 20,
    "volume": 60.4
  },
  {
    "category": "Games",
    "difficulty": 30,
    "labels": [
      {
        "key": "four dollar toast",
        "value": "four_dollar_toast"
      }
    ],
    "organic_installs": {
      "estimated_count": 3204,
      "percentage": 34.5
    },
    "search_term": "Paleo",
    "rank": 72,
    "volume": 60.4
  }
];

// Table settings sample data
var tableSettings = {
  difficulty         : true,
  estimated_installs : true,
  organic            : true,
  rank               : true,
  volume             : true
};

var Actions = Reflux.createActions({
  addTagsToKeywords         : {children : ['completed', 'failed']},
  loadRankingsTable         : {children : ['completed', 'failed']},
  loadRankingsTableFilters  : {},
  loadRankingsTableSettings : {children : ['completed', 'failed']},
  removeTagsFromKeywords    : {children : ['completed', 'failed']},
  selectAllRows             : {},
  selectRow                 : {},
  selectTag                 : {},
  selectTagDropdown         : {},
  setAddTags                : {},
  setTableSize              : {},
  stopTrackingKeywords      : {children : ['completed', 'failed']}
});

Actions.loadRankingsTable.listen(function() {
  //request
  //  .get('/api/v2/users/apps/22323')
  //  .use(prefix('http://localhost:9000'))
  //  .end(function(err, res){
  //    //console.log(res.body);
  //  });
  // TODO: hook up to real data
  return this.completed(dummyData);
});

Actions.loadRankingsTableSettings.listen(function() {
  // TODO: hook up to real data
  return this.completed(tableSettings);
});

Actions.stopTrackingKeywords.listen(function(keywords) {
  // TODO: hook up to real data
  //return this.completed(tableSettings);
  console.log('stop traking: ', keywords)
});

Actions.addTagsToKeywords.listen(function(keywords, tags) {
  // TODO: hook up to real data
  //return this.completed(tableSettings);
  console.log('add tags to: ', keywords);
  console.log('add these tags: ', tags);
});

Actions.removeTagsFromKeywords.listen(function(keywords) {
  // TODO: hook up to real data
  //return this.completed(tableSettings);
  console.log('remove tags from: ', keywords);
});

module.exports = Actions;
