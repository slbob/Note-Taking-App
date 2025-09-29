const Note = require('../models/Note');

// GET /api/notes - list notes (with optional ?archived=true/false and ?tag=...)
exports.getNotes = async (req, res, next) => {
  try {
    const { archived, tag, q, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (archived === 'true') filter.archived = true;
    if (archived === 'false') filter.archived = false;
    if (tag) filter.tags = tag;
    if (q) filter.$text = { $search: q };

    const skip = (Math.max(1, Number(page)) - 1) * Number(limit);

    const notes = await Note.find(filter)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ data: notes });
  } catch (err) {
    next(err);
  }
};

// GET /api/notes/:id
exports.getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json({ data: note });
  } catch (err) {
    next(err);
  }
};

// POST /api/notes
exports.createNote = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const note = new Note({ title, content, tags });
    await note.save();
    res.status(201).json({ data: note });
  } catch (err) {
    next(err);
  }
};

// PUT /api/notes/:id
exports.updateNote = async (req, res, next) => {
  try {
    const updates = (({ title, content, tags, archived }) => ({ title, content, tags, archived }))(req.body);

    // Remove undefined fields
    Object.keys(updates).forEach((k) => updates[k] === undefined && delete updates[k]);

    const note = await Note.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json({ data: note });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/notes/:id
exports.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
