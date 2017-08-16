import 'isomorphic-fetch';
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Sentiment from './Sentiment';
import moment from 'moment';

class Main extends React.Component {
  componentDidMount() {
    const qs = queryString.stringify({ query: 'iPhone' });
    fetch(`/monitor/api/search?${qs}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response;
      }
    })
    .then(json => {
      this.setState({ data: json });
    })
    .catch(response => {
      this.setState({
        data: null
      });
      // eslint-disable-next-line no-console
      console.error(response);
    });
  }

  render() {
    if (!this.state) {
      return null;
    }
    const { data } = this.state;

    return (
      <div>
        {data ? (
          <div className="results">
            <div className="_container _container_large">
              <div className="row">
                <Sentiment data={parseData(data)} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

Main.propTypes = {
  data: PropTypes.object,
};

const parseData = data => {
  const { results } = data.aggregations[0].aggregations[0].results[0].aggregations[0];
  
  return results.map(dataPoint => {
    const result = {
      date: moment(dataPoint.key_as_string).format('MM/DD'),
    };
    dataPoint.aggregations[0].results.forEach(j => {
      const { key, matching_results } = j;
      result[key] = matching_results;
    });
    return result;
  });
};

module.exports = Main;
