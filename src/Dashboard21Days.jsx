import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, X, Lock, RotateCcw } from 'lucide-react';
import { ComposedChart, Line, Bar, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import './Dashboard21Days.css';

const HABITS = [
  { id: 'entrenamiento', label: 'Entrenamiento', emoji: '🏋️' },
  { id: 'nutricion', label: 'Nutrición Limpia', emoji: '🥗' },
  { id: 'descanso', label: 'Descanso Óptimo', emoji: '😴' },
  { id: 'cardio', label: 'Cardio', emoji: '🏃' },
];

const DAYS_ABBR = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const WEEKS = [1, 2, 3];

// Initial state: 3 weeks, 7 days, 4 habits = all false
const getInitialState = () => {
  const saved = localStorage.getItem('crushit_21days_progress');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved progress', e);
    }
  }
  
  const initialState = {};
  WEEKS.forEach(week => {
    initialState[week] = {};
    for (let day = 1; day <= 7; day++) {
      initialState[week][day] = {
        entrenamiento: false,
        nutricion: false,
        descanso: false,
        cardio: false
      };
    }
  });
  return initialState;
};

const Dashboard21Days = () => {
  const [progress, setProgress] = useState(getInitialState());

  const getCleanState = () => {
    const initialState = {};
    WEEKS.forEach(week => {
      initialState[week] = {};
      for (let day = 1; day <= 7; day++) {
        initialState[week][day] = {
          entrenamiento: false,
          nutricion: false,
          descanso: false,
          cardio: false
        };
      }
    });
    return initialState;
  };

  const handleReset = () => {
    if (window.confirm("¿Estás seguro de que quieres reiniciar todo tu progreso y empezar de cero?")) {
      const clean = getCleanState();
      setProgress(clean);
      localStorage.setItem('crushit_21days_progress', JSON.stringify(clean));
    }
  };

  useEffect(() => {
    localStorage.setItem('crushit_21days_progress', JSON.stringify(progress));
  }, [progress]);

  const toggleHabit = (week, day, habitId) => {
    setProgress(prev => {
      const newState = { ...prev };
      newState[week] = { ...newState[week] };
      newState[week][day] = { ...newState[week][day] };
      newState[week][day][habitId] = !newState[week][day][habitId];
      return newState;
    });
  };

  const getDayPerformance = (week, day) => {
    const dayData = progress[week][day];
    let completed = 0;
    if (dayData.entrenamiento) completed++;
    if (dayData.nutricion) completed++;
    if (dayData.descanso) completed++;
    if (dayData.cardio) completed++;
    return (completed / 4) * 100;
  };

  const getWeeklyData = (week) => {
    const data = [];
    let totalScore = 0;
    let daysWithData = 0;

    for (let day = 1; day <= 7; day++) {
      const score = getDayPerformance(week, day);
      data.push({
        name: DAYS_ABBR[day - 1],
        score: score,
      });
      if (score > 0 || Object.values(progress[week][day]).some(v => v)) {
        totalScore += score;
        daysWithData++;
      }
    }
    
    const weeklyAvg = daysWithData > 0 ? Math.round(totalScore / daysWithData) : 0;
    const totalChecks = Object.values(progress[week]).reduce((acc, day) => {
      return acc + Object.values(day).filter(v => v).length;
    }, 0);
    
    return { data, weeklyAvg, totalChecks };
  };

  const getTotalCompletedDays = () => {
    let completedDays = 0;
    WEEKS.forEach(week => {
      for (let day = 1; day <= 7; day++) {
        if (getDayPerformance(week, day) === 100) {
          completedDays++;
        }
      }
    });
    return completedDays;
  };

  const totalCompletedDays = getTotalCompletedDays();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-score">Desempeño: {payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  const getLatestActiveDay = () => {
    let latestWeek = 0;
    let latestDay = 0;
    for (let w = 1; w <= 3; w++) {
      for (let d = 1; d <= 7; d++) {
        if (progress[w] && progress[w][d] && Object.values(progress[w][d]).some(v => v)) {
          latestWeek = w;
          latestDay = d;
        }
      }
    }
    return { week: latestWeek, day: latestDay };
  };

  const latestActive = getLatestActiveDay();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="top-actions">
          <Link to="/" className="back-button">
            <ArrowLeft size={20} /> Volver
          </Link>
          <button onClick={handleReset} className="reset-button">
            <RotateCcw size={16} /> Reiniciar Tablero
          </button>
        </div>
        <div className="dashboard-title-area">
          <h1 className="dashboard-title">📊 GRÁFICO DE TU PROGRESO</h1>
          <p className="dashboard-subtitle">Marca tu progreso y sube de rango cada 7 días:</p>
        </div>

        <div className="ranks-container">
          <div className={`rank-card ${totalCompletedDays >= 7 ? 'achieved' : ''}`}>
            <span className="rank-day">DÍA 7</span>
            <div className="rank-badge blue">PRINCIPIANTE ⚡</div>
          </div>
          <div className={`rank-card ${totalCompletedDays >= 14 ? 'achieved' : ''}`}>
            <span className="rank-day">DÍA 14</span>
            <div className="rank-badge orange">CONSTANTE 🔥</div>
          </div>
          <div className={`rank-card ${totalCompletedDays >= 21 ? 'achieved' : ''}`}>
            <span className="rank-day">DÍA 21</span>
            <div className="rank-badge green">EXCELENCIA 👑</div>
          </div>
        </div>
      </div>

      <div className="weeks-container">
        {WEEKS.map(week => {
          const { data, weeklyAvg, totalChecks } = getWeeklyData(week);
          // Unlock week 2 if week 1 has at least 15 checks, week 3 if week 2 has 15 checks
          const isLocked = week > 1 && getWeeklyData(week - 1).totalChecks < 15;

          const getColorsByWeek = (w) => {
            if (w === 1) return { main: '#3b82f6', light: 'rgba(59, 130, 246, 0.2)' }; // Azul
            if (w === 2) return { main: '#f59e0b', light: 'rgba(245, 158, 11, 0.2)' }; // Laranja
            if (w === 3) return { main: '#10b981', light: 'rgba(16, 185, 129, 0.2)' }; // Verde
            return { main: '#8b5cf6', light: 'rgba(139, 92, 246, 0.2)' };
          };

          const colors = getColorsByWeek(week);

          if (isLocked) {
            return (
              <div key={week} className="week-card locked">
                <h2 className="week-title">SEMANA {week}</h2>
                <div className="lock-overlay">
                  <Lock size={24} className="lock-icon" />
                  <span>Completa la Semana {week - 1} para Desbloquear</span>
                </div>
              </div>
            );
          }

          return (
            <div key={week} className="week-card">
              <h2 className="week-title">SEMANA {week} <span className="week-subtitle">(Activa)</span></h2>
              
              <div className="habits-grid">
                <div className="habit-row days-header">
                  <div className="habit-label"></div>
                  <div className="habit-checkboxes">
                    {DAYS_ABBR.map((abbr, i) => (
                      <div key={i} className="day-label" style={{ color: colors.main }}>{abbr}</div>
                    ))}
                  </div>
                </div>
                {HABITS.map(habit => (
                  <div key={habit.id} className="habit-row">
                    <div className="habit-label">
                      <span>{habit.emoji}</span> {habit.label}
                    </div>
                    <div className="habit-checkboxes">
                      {[1, 2, 3, 4, 5, 6, 7].map(day => {
                        const isChecked = progress[week][day][habit.id];
                        const isPast = (week < latestActive.week) || (week === latestActive.week && day < latestActive.day);
                        const isMissed = !isChecked && isPast;

                        return (
                          <button 
                            key={day}
                            className={`habit-checkbox ${isChecked ? 'checked' : ''} ${isMissed ? 'missed' : ''}`}
                            onClick={() => toggleHabit(week, day, habit.id)}
                            title={`Día ${day}`}
                          >
                            {isChecked && <Check size={14} strokeWidth={4} color="#10b981" />}
                            {isMissed && <X size={14} strokeWidth={4} color="#ef4444" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="performance-section">
                <div className="performance-header">
                  <span className="performance-label">📈 PERFORMANCE SEMANAL</span>
                  <span className="performance-value" style={{ color: colors.main }}>{weeklyAvg}%</span>
                </div>
                
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={150}>
                    <ComposedChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#222" />
                      <XAxis dataKey="name" tick={{fill: '#888', fontSize: 10}} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} ticks={[0, 50, 100]} tick={{fill: '#888', fontSize: 10}} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      
                      <defs>
                        <linearGradient id={`colorArea${week}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={colors.main} stopOpacity={0.4}/>
                          <stop offset="95%" stopColor={colors.main} stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>

                      {/* Referencia media */}
                      {weeklyAvg > 0 && <Line type="monotone" dataKey={() => weeklyAvg} stroke="#888" strokeDasharray="5 5" dot={false} strokeWidth={2} />}
                      
                      <Area type="monotone" dataKey="score" stroke="none" fill={`url(#colorArea${week})`} />

                      <Bar dataKey="score" barSize={12} radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.score < 100 ? '#ef4444' : colors.main} />
                        ))}
                      </Bar>
                      
                      <Line type="monotone" dataKey="score" stroke={colors.main} strokeWidth={2} dot={{ r: 4, fill: colors.main, strokeWidth: 2, stroke: '#000' }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="performance-footer">
                  {totalChecks} de 28 marcaciones completadas. {weeklyAvg >= 80 ? '¡Crecimiento alcista constante! 🔥' : '¡Mantén el ritmo! 💪'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard21Days;
