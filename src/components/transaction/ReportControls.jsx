import React from 'react';

function ReportControls({
  generateReport,
  setGenerateReport,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
          checked={generateReport}
          onChange={(e) => setGenerateReport(e.target.checked)}
        />
        <label className="ml-2 block text-sm font-medium text-gray-700">Generate Report</label>
      </div>
      
      {generateReport && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportControls; 