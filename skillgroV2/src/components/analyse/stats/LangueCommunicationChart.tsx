import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

// Enregistrement des composants nécessaires de Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const initialData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Français',
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      borderColor: 'rgba(75,192,192,1)',  // Couleur bleu-vert pour Français
      tension: 0.1,
      pointBackgroundColor: 'rgba(75,192,192,1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
    },
    {
      label: 'Anglais',
      data: [60, 65, 70, 75, 80, 85],
      fill: false,
      borderColor: 'rgba(255,99,132,1)',  // Couleur rouge pour Anglais
      tension: 0.1,
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => `${context.dataset.label}: ${context.raw}`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const LangueCommunicationChart = () => {
  // Utiliser un état pour gérer les filtres
  const [filters, setFilters] = useState({
    french: true,
    english: true,
  });

  // Modifier les datasets en fonction des filtres
  const filteredData = {
    ...initialData,
    datasets: initialData.datasets.filter(dataset => {
      if (dataset.label === 'Français' && filters.french) return true;
      if (dataset.label === 'Anglais' && filters.english) return true;
      return false;
    }),
  };

  // Gérer le changement des filtres
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <Line data={filteredData} options={options} />
        </div>
        <div className="col-md-4">
          <form>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="french"
                name="french"
                checked={filters.french}
                onChange={handleFilterChange}
              />
              <label className="form-check-label" htmlFor="french">
                Français
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="english"
                name="english"
                checked={filters.english}
                onChange={handleFilterChange}
              />
              <label className="form-check-label" htmlFor="english">
                Anglais
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LangueCommunicationChart;
