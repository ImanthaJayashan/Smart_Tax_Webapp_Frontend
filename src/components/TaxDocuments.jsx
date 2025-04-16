import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  IconButton,
  Tooltip,
  LinearProgress,
  Box
} from '@mui/material';
import { Delete, Edit, PictureAsPdf, Search, Add } from '@mui/icons-material';

function TaxpayerRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:5000/taxpayers");
      setRegistrations(response.data);
    } catch (error) {
      console.error("Error fetching taxpayer registrations:", error);
      setError("Failed to load taxpayer registrations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this taxpayer registration?")) {
      try {
        await axios.delete(`http://localhost:5000/taxpayers/${id}`);
        fetchRegistrations();
      } catch (error) {
        console.error(`Error deleting registration with ID ${id}:`, error);
        setError("Failed to delete taxpayer registration.");
      }
    }
  };

  const generateReport = () => {
    try {
      const doc = new jsPDF();
      
      // Report header
      doc.setFontSize(18);
      doc.text("Taxpayer Registrations Report", 20, 20);
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
      
      // Filtered data
      const filteredData = registrations.filter(reg =>
        reg.fullNameEnglish?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.nicNumber?.includes(searchQuery) ||
        reg.passportNumber?.includes(searchQuery)
      );

      // Table headers
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text("NIC/Passport", 20, 50);
      doc.text("Full Name", 60, 50);
      doc.text("Date of Birth", 120, 50);
      doc.text("Status", 160, 50);
      doc.setFont(undefined, 'normal');

      // Table content
      let yPosition = 60;
      filteredData.forEach((reg) => {
        if (yPosition > 280) { // Add new page if we're near the bottom
          doc.addPage();
          yPosition = 20;
          
          // Add headers to new page
          doc.setFontSize(12);
          doc.setFont(undefined, 'bold');
          doc.text("NIC/Passport", 20, yPosition);
          doc.text("Full Name", 60, yPosition);
          doc.text("Date of Birth", 120, yPosition);
          doc.text("Status", 160, yPosition);
          doc.setFont(undefined, 'normal');
          yPosition += 10;
        }
        
        doc.text(reg.nicNumber || reg.passportNumber || 'N/A', 20, yPosition);
        doc.text(reg.fullNameEnglish || 'N/A', 60, yPosition);
        doc.text(reg.dateOfBirth ? new Date(reg.dateOfBirth).toLocaleDateString() : 'N/A', 120, yPosition);
        doc.text(reg.citizenship || 'N/A', 160, yPosition);
        yPosition += 10;
      });

      doc.save("taxpayer_registrations_report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      setError("Failed to generate report. Please try again.");
    }
  };

  const filteredRegistrations = registrations.filter(reg =>
    reg.fullNameEnglish?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reg.nicNumber?.includes(searchQuery) ||
    reg.passportNumber?.includes(searchQuery)
  );

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Taxpayer Registrations
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          component={Link}
          to="/add-taxpayer"
          sx={{ ml: 2 }}
        >
          Add New Taxpayer
        </Button>
      </Box>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by name, NIC or passport..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <Search color="action" sx={{ mr: 1 }} />
          }}
          sx={{ width: 400 }}
        />
        
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<PictureAsPdf />}
          onClick={generateReport}
          disabled={loading || registrations.length === 0}
        >
          Generate Report
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {loading ? (
        <LinearProgress />
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>NIC/Passport</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Full Name</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Date of Birth</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Citizenship</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Resident Status</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((reg) => (
                  <TableRow key={reg._id} hover>
                    <TableCell>{reg.nicNumber || reg.passportNumber || 'N/A'}</TableCell>
                    <TableCell>{reg.fullNameEnglish || 'N/A'}</TableCell>
                    <TableCell>
                      {reg.dateOfBirth ? new Date(reg.dateOfBirth).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell>{reg.citizenship || 'N/A'}</TableCell>
                    <TableCell>{reg.residentStatus || 'N/A'}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          component={Link}
                          to={`/update-taxpayer/${reg._id}`}
                          aria-label="edit"
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(reg._id)}
                          aria-label="delete"
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    {searchQuery ? 'No matching records found' : 'No taxpayer registrations available'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default TaxpayerRegistrations;