const Note = require('../model/Note');

// GET /api/notes
exports.getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.json({ data: notes });
  } catch (err) {
    next(err);
  }
};

// GET /api/notes/:id
exports.getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
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

    const note = new Note({ title, content, tags, user: req.user._id });
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
    Object.keys(updates).forEach((k) => updates[k] === undefined && delete updates[k]);

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json({ data: note });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/notes/:id
exports.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
