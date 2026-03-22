require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve Frontend in Production
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_PATH = path.join(ROOT_DIR, 'dist');
if (fs.existsSync(DIST_PATH)) {
    app.use(express.static(DIST_PATH));
}

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

const JWT_SECRET = process.env.JWT_SECRET || 'police_portal_secret_key_2026';

// DB connection pool
let pool;

const connectDB = async () => {
    try {
        const initialPool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD,
            waitForConnections: true,
            connectionLimit: 1,
            queueLimit: 0
        });
        
        const connection = await initialPool.getConnection();
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'fd_police_db'}\`;`);
        connection.release();
        await initialPool.end();

        pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME || 'fd_police_db',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        
        const dbConn = await pool.getConnection();
        
        // Users Table
        await dbConn.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullName VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                phone VARCHAR(20) NOT NULL,
                aadharNumber VARCHAR(12) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Complaints Table
        await dbConn.query(`
            CREATE TABLE IF NOT EXISTS complaints (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                fir_number VARCHAR(50) NOT NULL UNIQUE,
                subject VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                incidentDate DATE NOT NULL,
                incidentTime TIME NOT NULL,
                location VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                status ENUM('Pending', 'Under Investigation', 'Resolved', 'Closed') DEFAULT 'Pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `);

        // Missing Persons Table
        await dbConn.query(`
            CREATE TABLE IF NOT EXISTS missing_persons (
                id INT AUTO_INCREMENT PRIMARY KEY,
                reported_by INT NOT NULL,
                name VARCHAR(255) NOT NULL,
                age INT NOT NULL,
                gender VARCHAR(20) NOT NULL,
                area VARCHAR(255) NOT NULL,
                lastSeen DATE NOT NULL,
                description TEXT NOT NULL,
                tracking_id VARCHAR(50) NOT NULL UNIQUE,
                image_url VARCHAR(500) DEFAULT 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (reported_by) REFERENCES users(id)
            );
        `);

        // Seed Missing Persons if empty
        const [existing] = await dbConn.execute('SELECT COUNT(*) as count FROM missing_persons');
        if (existing[0].count === 0) {
            await dbConn.execute(`
                INSERT INTO missing_persons (reported_by, name, age, gender, area, lastSeen, description, tracking_id, image_url)
                VALUES 
                (1, 'Rahul Verma', 24, 'Male', 'Central Market', '2026-03-15', 'Wearing blue shirt, last seen near subway.', 'MPR-100201', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'),
                (1, 'Sita Gupta', 19, 'Female', 'Rajpath Highway', '2026-03-18', 'Carrying a red bag, white dress.', 'MPR-100202', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400')
            `);
        }

        dbConn.release();
        console.log('Successfully connected to MySQL and ensured tables exist.');
    } catch (err) {
        console.error('MySQL Init Error:', err);
    }
};

connectDB();

// Auth Middleware
const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.replace('Bearer ', '');
    
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized. Please login.' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: 'Invalid token.' });
    }
};

// --- ROUTES ---

// Register
app.post('/api/register', async (req, res) => {
    try {
        const { fullName, email, phone, aadharNumber, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.execute(
            'INSERT INTO users (fullName, email, phone, aadharNumber, password) VALUES (?, ?, ?, ?, ?)',
            [fullName, email, phone, aadharNumber, hashedPassword]
        );
        res.status(201).json({ success: true, message: 'Registered successfully!' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, message: err.code === 'ER_DUP_ENTRY' ? 'Email already registered.' : 'Registration failed.' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(401).json({ success: false, message: 'Invalid credentials.' });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials.' });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ success: true, token, user: { id: user.id, fullName: user.fullName, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// Submit Complaint
app.post('/api/complaints', authMiddleware, async (req, res) => {
    try {
        const { subject, category, incidentDate, incidentTime, location, description } = req.body;
        const userId = req.user.id;
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        const firNumber = `FIR-${new Date().getFullYear()}-${randomNum}`;

        await pool.execute(
            'INSERT INTO complaints (user_id, fir_number, subject, category, incidentDate, incidentTime, location, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, firNumber, subject, category, incidentDate, incidentTime, location, description]
        );

        res.status(201).json({ success: true, message: 'Complaint filed successfully!', fir_number: firNumber });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to file complaint.' });
    }
});

// Get User's Complaints
app.get('/api/complaints', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await pool.execute('SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC', [userId]);
        res.json({ success: true, complaints: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch complaints.' });
    }
});

// Get User Profile
app.get('/api/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await pool.execute('SELECT id, fullName, email, phone, aadharNumber, created_at FROM users WHERE id = ?', [userId]);
        if (rows.length === 0) return res.status(404).json({ success: false, message: 'User not found.' });
        res.json({ success: true, user: rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// --- MISSING PERSONS ROUTES ---

// Report Missing Person
app.post('/api/missing-persons', authMiddleware, upload.single('photo'), async (req, res) => {
    try {
        const { name, age, gender, area, date, description } = req.body;
        const reporterId = req.user.id;
        const trackingId = `MPR-${Math.floor(100000 + Math.random() * 900000)}`;
        
        const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400';

        await pool.execute(
            'INSERT INTO missing_persons (reported_by, name, age, gender, area, lastSeen, description, tracking_id, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [reporterId, name, age, gender, area, date, description, trackingId, imageUrl]
        );

        res.status(201).json({ success: true, tracking_id: trackingId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Could not log report.' });
    }
});

// Fetch All Missing Persons
app.get('/api/missing-persons', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM missing_persons ORDER BY created_at DESC');
        res.json({ success: true, persons: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch directory.' });
    }
});

// Serve index.html for unknown routes (React Router Support)
if (fs.existsSync(DIST_PATH)) {
    app.get('*', (req, res) => {
        if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
            res.sendFile(path.join(DIST_PATH, 'index.html'));
        }
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
