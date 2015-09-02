import React, { Component } from "react";
import { RouteHandler } from "react-router";

export default class AnonymousLayout extends Component {
  static displayName = "AnonymousLayout";
  constructor() {
    super();
  }

  render() {
    return (
      <RouteHandler />
    );
  }
}
