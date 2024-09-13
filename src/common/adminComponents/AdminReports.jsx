import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Reports = () => {
    const [stats, setStats] = useState({
        applicationsSubmitted: 20,
        interviewsAttended: 15,
        offersReceived: 5
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStats({
            ...stats,
            [name]: Number(value) 
        });
    };

    const data = {
        labels: ['Applications Submitted', 'Interviews Attended', 'Offers Received'],
        datasets: [{
            label: 'Metrics',
            data: [stats.applicationsSubmitted, stats.interviewsAttended, stats.offersReceived],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1
        }]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Reports & Analytics</h2>
            <div className="space-y-4">
                <div className="p-4 border rounded shadow-sm">
                    <h3 className="text-lg font-medium mb-2">Edit Application Statistics</h3>
                    {/* Editable inputs for stats */}
                    <div className="mb-2">
                        <label>Applications Submitted:</label>
                        <input
                            type="number"
                            name="applicationsSubmitted"
                            value={stats.applicationsSubmitted}
                            onChange={handleInputChange}
                            className="border rounded p-1 ml-2"
                        />
                    </div>
                    <div className="mb-2">
                        <label>Interviews Attended:</label>
                        <input
                            type="number"
                            name="interviewsAttended"
                            value={stats.interviewsAttended}
                            onChange={handleInputChange}
                            className="border rounded p-1 ml-2"
                        />
                    </div>
                    <div className="mb-2">
                        <label>Offers Received:</label>
                        <input
                            type="number"
                            name="offersReceived"
                            value={stats.offersReceived}
                            onChange={handleInputChange}
                            className="border rounded p-1 ml-2"
                        />
                    </div>
                </div>
                <div className="p-4 border rounded shadow-sm">
                    <h3 className="text-lg font-medium">Visual Representation</h3>
                    {/* Render the Bar chart */}
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default Reports;
