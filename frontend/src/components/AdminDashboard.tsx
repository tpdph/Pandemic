import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';

interface MetricsData {
  totalVideos: number;
  successfulUploads: number;
  failedUploads: number;
  averageProcessingTime: number;
}

interface Activity {
  id: string;
  message: string;
  timestamp: string;
}

const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Fetch monitoring metrics
    axios
      .get('/api/metrics')
      .then((response) => {
        setMetrics(response.data);
      })
      .catch((err) => console.error('Error fetching metrics:', err));

    // Fetch recent activity logs
    axios
      .get('/api/activities')
      .then((res) => {
        setActivities(res.data);
      })
      .catch((error) => console.error('Error fetching activities:', error));
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">System Metrics</Typography>
              {metrics ? (
                <Box mt={2}>
                  <Typography>Total Videos: {metrics.totalVideos}</Typography>
                  <Typography>
                    Successful Uploads: {metrics.successfulUploads}
                  </Typography>
                  <Typography>Failed Uploads: {metrics.failedUploads}</Typography>
                  <Typography>
                    Avg Processing Time: {metrics.averageProcessingTime} sec
                  </Typography>
                </Box>
              ) : (
                <Typography>Loading metrics...</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Recent Activity</Typography>
              <Box mt={2}>
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <Box key={activity.id} mb={1}>
                      <Typography variant="body2">
                        {activity.timestamp}: {activity.message}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2">No recent activity</Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box mt={3}>
        <Button variant="contained" color="primary">
          Bulk Operations
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDashboard;