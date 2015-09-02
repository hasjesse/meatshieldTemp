import React from 'react';
import Radium from 'radium';

import Card from './Card';

export default class MDHQCardDemo {
  render() {
    return (
      <div style={STYLES.background}>
        <div style={STYLES.card} >
          <Card style={STYLES.card} elevation={0}/>
        </div>
        <div style={STYLES.card} >
          <Card elevation={1}/>
        </div>
        <div style={STYLES.card} >
          <Card elevation={2}/>
        </div>
        <div style={STYLES.card}>
          <Card elevation={3}/>
        </div>
        <div style={STYLES.card}>
          <Card elevation={4}/>
        </div>
      </div>
    );
  }
}

const STYLES = {
  card : {
    margin : '10rem'
  },
  background : {
    backgroundColor : 'lightgrey',
    padding         : '1em 0'
  }
};