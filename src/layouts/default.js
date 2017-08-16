import React from 'react';
import PropTypes from 'prop-types';

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>News using Watson Discovery Service</title>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="og:title" content="Watson Discovery News Search" />
          <meta name="og:description" content={this.props.description || 'Search News using Watson Discovery Service'} />
          <link rel="stylesheet" type="text/css" href="/css/watson-react-components.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/application.css"/>
        </head>
        <body>
          <main>{this.props.children}</main>
          <script type="text/javascript" src="/js/bundle.js" />
        </body>
      </html>
    );
  }
}

DefaultLayout.propTypes = {
  hideHeader: PropTypes.bool,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  initialData: PropTypes.string.isRequired
};

module.exports = DefaultLayout;
