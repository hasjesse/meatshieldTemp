/**
 * TEMPLATE for hovering with multiple axis in react
 */
var React = require('react');
var yako = require('yako/lib');
var Line = require('yako/lib/addons/react-components/line');
var svg = yako.svg;

var PureRenderMixin = React.addons.PureRenderMixin;

/* Tool Tip Component */
var ToolTip = React.createClass({
  mixin: [PureRenderMixin],
  render: function () {
    var html;
    var content = this.props.content;
    if (Object.keys(content).length !== 0) {
      if (content.exactPoint) {
        html = 'point at value : ' + content.exactPoint.label + ',' + content.exactPoint.value;
      } else {
        html = content.points.map(function (key) {
          return key.label + ':' + key.value;
        });
      }
    }
    return (
      <div>
        {html}
      </div>
    );
  }
});

/* Legend Component */
var Legend = React.createClass({
  mixin: [PureRenderMixin],
  render: function () {
    return (
      <div>
        I am a legend
      </div>
    );
  }
});

/* Graph Component */
module.exports = React.createClass({
  getInitialState: function () {
    return {
      shouldShow: false,
    };
  },
  componentWillMount: function () {
    var onActivity = function (e, props) {
      self.setState({
        shouldShow: true
      });
    }
    var self = this;
    self.events = {
      // Register events for call back
      on: {
        'path:mouseMove': onActivity,
        'svg:mouseMove': onActivity,
        'container:mouseLeave': function (e) {
          self.setState({
            shouldShow: false
          });
        }
      }
    };
  },
  render: function () {
    var self = this;
    var attr = {
      width: 1200,
      height: 150,
      points: self.props.set,
      yAxis: {
        multi: true
      },
      xAxis : {
        // including format will show the xAxis Label
        format : 'dateTime',
        // interval indicates the data interval, the number of the interval indicates the label tick interval
        // same representation is also used for `dateTimeLabelFormat`
        // s - seconds
        // m - minutes
        // h - hours
        // D - days
        // M - months
        // Y - years
        interval: '1D',  //[1-9]s, [1-9]m, [1-9]h, [1-9]D, [1-9]M, [1-9]Y
        // uses the min start date and increment the label by the set interval.  interval will be converted to miliseconds
        minUTC: Date.UTC(2013,8,7),
        //this controls the dateTime label format
        //depending on the format, it will affect the label, try :: dateTimeLabelFormat: 'hhh'
        dateTimeLabelFormat: 'MM/DD'
        // or if wanted custom label
        // format: 'label',
        // labels: [Array of label], this label must match the data value length, if not the data will be limited.  We will not aggregate the data for you.
      },
      prepend: function (svgString, scale) {

        var layout = scale.layout;
        var lines = [svg.create('line').attr({
          "stroke": '#000',
          "stroke-width": 2,
          x1: 0,
          y1: Math.floor(layout.height / 3),
          x2: layout.width,
          y2: Math.floor(layout.height / 3)
        }),
          svg.create('line').attr({
            "stroke": '#000',
            "stroke-width": 2,
            x1: 0,
            x2: layout.width,
            y1: Math.floor(2 * layout.height / 3),
            y2: Math.floor(2 * layout.height / 3)
          })
        ];

        var grouping = svg.create('g').append(lines);
        return grouping;
      }
    };

    var toolTip = ToolTip || 0;
    var legend = Legend || 0;

    if (!toolTip) {
      self.events = {};
    } else {
      toolTip = {
        shouldShow: self.state.shouldShow,
        reactElement: ToolTip
      }
    }

    var self = this;
    return (
      <Line
        attr={attr}
        events={self.events}
        toolTip={toolTip}
        legend={legend} />
    );
  }
});
