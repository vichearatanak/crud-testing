const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// Read data from JSON file
function readData() {
    const data = [
        {"id": 1, "name": "John", "age": 30, "city": "New York"},
        {"id": 2, "name": "Jane", "age": 25, "city": "Los Angeles"},
        {"id": 3, "name": "Alice", "age": 35, "city": "Chicago"},
        {"id": 4, "name": "Bob", "age": 40, "city": "Houston"},
        {"id": 5, "name": "Eve", "age": 28, "city": "Miami"},
        {"id": 6, "name": "Michael", "age": 45, "city": "San Francisco"},
        {"id": 7, "name": "Sophia", "age": 32, "city": "Seattle"},
        {"id": 8, "name": "William", "age": 38, "city": "Boston"},
        {"id": 9, "name": "Olivia", "age": 27, "city": "Austin"},
        {"id": 10, "name": "James", "age": 33, "city": "Denver"}
    ]

    return JSON.parse(data);
}

// Write data to JSON file
function writeData(data) {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 4));
}

// CRUD operations

// Get all items
app.get('/', (req, res) => {
    const data = readData();
    res.json(data);
});

// Get item by id
app.get('/:id', (req, res) => {
    const data = readData();
    const item = data.find(item => item.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
});

// Create a new item
app.post('/', (req, res) => {
    const data = readData();
    const newItem = req.body;
    data.push(newItem);
    writeData(data);
    res.status(201).json(newItem);
});

// Update an existing item
app.put('/:id', (req, res) => {
    const data = readData();
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;
    const index = data.findIndex(item => item.id === itemId);
    if (index === -1) return res.status(404).send('Item not found');
    data[index] = { ...data[index], ...updatedItem };
    writeData(data);
    res.json(data[index]);
});

// Delete an item
app.delete('/:id', (req, res) => {
    const data = readData();
    const itemId = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === itemId);
    if (index === -1) return res.status(404).send('Item not found');
    data.splice(index, 1);
    writeData(data);
    res.send('Item deleted successfully');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export the Express API
module.exports = app
