import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Colors } from 'watson-react-components';

class Sentiment extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div ref={el => { this.el = el; }}>
        <div className="top-stories widget">
          <div className="widget--header">
            <h2 className="base--h2 widget--header-title">Brand Monitor</h2>
            <div className="widget--header-spacer" />
          </div>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={data}>
              <XAxis dataKey="date" tickLine={false} />
              <YAxis/>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
              <Line type="monotone" dataKey="positive" stroke={Colors.green_30} />
              <Line type="monotone" dataKey="negative" stroke={Colors.red_30} />
              <Line type="monotone" dataKey="neutral" stroke={Colors.gray_30} />
              <Tooltip />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

Sentiment.propTypes = {
  data: PropTypes.object.isRequired
};

module.exports = Sentiment;
