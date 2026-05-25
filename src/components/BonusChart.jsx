import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './BonusChart.css';

const generateData = () => {
  const data = [];
  for (let i = 1; i <= 28; i++) {
    // Generate some mock scores between 0 and 100 for each category
    data.push({
      dia: `Día ${i}`,
      semana: `Semana ${Math.ceil(i / 7)}`,
      entrenamiento: Math.floor(Math.random() * 40) + 60, // 60-100
      descanso: Math.floor(Math.random() * 50) + 50, // 50-100
      alimentacion: Math.floor(Math.random() * 30) + 70, // 70-100
      cardio: Math.floor(Math.random() * 60) + 40, // 40-100
    });
  }
  return data;
};

const data = generateData();

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip glass-panel">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: '4px 0' }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const BonusChart = () => {
  return (
    <div className="chart-container glass-panel">
      <div className="chart-header">
        <h3>Reto 4 Semanas</h3>
        <p>Seguimiento de Consistencia Diaria</p>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: -20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="dia" 
              stroke="var(--color-text-muted)" 
              tick={{ fill: 'var(--color-text-muted)' }} 
              tickFormatter={(tick) => {
                // Show less ticks on mobile
                return tick;
              }}
            />
            <YAxis stroke="var(--color-text-muted)" tick={{ fill: 'var(--color-text-muted)' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            
            <Line 
              type="monotone" 
              dataKey="entrenamiento" 
              name="Entrenamiento" 
              stroke="#8b5cf6" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              dataKey="alimentacion" 
              name="Alimentación" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="descanso" 
              name="Descanso" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="cardio" 
              name="Cardio" 
              stroke="#f59e0b" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BonusChart;
