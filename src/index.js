const React = require('react');
const PropTypes = require('prop-types');
const DefaultLayout = require('./layouts/default');
const Main = require('./main');

class Application extends React.Component {
  render() {
    const { props } = this;

    return (
      <DefaultLayout
        title={props.title}
        hideHeader={Boolean(props.searchQuery)}
      >
        <Main {...props} />
      </DefaultLayout>
    );
  }
}

Application.propTypes = {
  data: PropTypes.object,
  searchQuery: PropTypes.string
};

module.exports = Application;
