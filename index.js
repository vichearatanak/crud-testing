const express = require('express');
const app = express();

app.use(express.json());
// CRUD operations
// Get all items
app.get('/', (req, res) => {
    res.json('data');
});

// Get item by id
app.get('/:id', (req, res) => {
    // const data = readData();
    // const item = data.find(item => item.id === parseInt(req.params.id));
    // if (!item) return res.status(404).send('Item not found');
    res.json('get by id');
});

// Create a new item
app.post('/', (req, res) => {
    res.status(201).json('post');
});

// Update an existing item
app.put('/:id', (req, res) => {
    res.json('updated');
});

// Delete an item
app.delete('/:id', (req, res) => {
    res.send('Item deleted successfully');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export the Express API
module.exports = app;
