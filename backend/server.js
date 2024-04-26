const express = require('express');
const path = require("path")

const app = express()

const dbConfig = require("./db");
const placeRoute = require("./routes/placeRoute");
const locationRoute = require("./routes/locationRoute");
const usersRoute = require("./routes/usersRoute");
const bookinsRoute = require("./routes/bookingsRoute");
const contactRoute = require("./routes/contactRoute")
const uploadcsv = require("./routes/uploadCSV")
const authController=require("./controllers/sendMail")

app.use(express.json())
app.get('/sendmail', authController.sendmailController);
app.get('/verifyotp', authController.verifyotpController);

app.use("/api/places", placeRoute);
app.use("/api/locations", locationRoute);
app.use("/api/contacts", contactRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings" , bookinsRoute);
app.use("/api/upload-csv" , uploadcsv);

app.use(express.static(path.join(__dirname, './frontend/build')));
app.get('*', function(_, res){
    res.sendFile(
        path.join(__dirname, './frontend/build/index.html'),
        function(err) {
            res.status(500).send(err);
        }
    );
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Node server Started Using nodemon"));