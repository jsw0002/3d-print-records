import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';

export default function Chart(props) {
  const [data, setData] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const printArray = [];
    let cost = 0;
    props.prints.map((p, index) => {
      cost += p.material_cost/100;
      printArray.push({ index, cost });
      return p;
    });
    setData(printArray);
    setTotalCost(cost);
  }, [props.prints]);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Cost of all prints
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="index"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              {`$${totalCost}`}
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="cost"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}