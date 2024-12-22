export function handleError(res, error) {
  console.error('Error:', error);
  res.status(500).json({ 
    error: error.message || 'Internal server error' 
  });
}