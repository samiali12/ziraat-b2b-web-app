import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  return (
    <div>
      <Bar
        data={data}
        options={{
          // Customize chart options here
        }}
      />
    </div>
  );
};

export default BarChart;
