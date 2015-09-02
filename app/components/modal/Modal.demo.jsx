var React = require('react');

var Modal = require('../modal/Modal');
var DotLoader = require('../loaders/DotLoader');
var ProgressBar = require('../progress/ProgressBar');

module.exports = React.createClass({
  'displayName' : 'MDHQ_Modal_Demo',
  'propTypes' : {},

  'render' : function() {
    return (
      <div>
        <Modal
          title="This is the title">
          <p>Drinking vinegar tofu bespoke, asymmetrical paleo pop-up 8-bit. Artisan try-hard Etsy messenger bag aesthetic banh mi, Tumblr cornhole forage DIY art party Austin ethical vegan pickled. Scenester lumbersexual Austin, wolf narwhal master cleanse irony occupy sartorial street art flexitarian synth. Lo-fi meh migas, lomo VHS bicycle rights stumptown artisan heirloom wolf. Before they sold out gentrify viral, selfies blog aesthetic hashtag hella seitan street art Neutra messenger bag direct trade Odd Future Shoreditch. Salvia hoodie hashtag quinoa. Swag squid hella tousled leggings DIY chambray.</p>
        </Modal>
      </div>
    );
  }
});