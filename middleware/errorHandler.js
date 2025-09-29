module.exports = (err, req, res, next) => {
  console.error(err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: 'Validation error', details: messages });
  }

  // CastError - invalid ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid id format' });
  }

  // Default
  res.status(500).json({ error: 'Internal Server Error' });
};
