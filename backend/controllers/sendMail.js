const nodemailer = require("nodemailer");

let global_otp = 0;

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); 
};

const sendmailController = async (req, res) => {
    try {
        const { email, subject } = req.query;
        
        if (!email) {
            return res.status(400).send('Email address is required');
        }

        const otp = generateOTP();

        let accountTest = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'satyanukala.24@gmail.com',
                pass: 'pxuxjbecotgmwlbt'
            }
        });

        var mailOptions = {
            from: 'satyanukala.24@gmail.com',
            to: email,
            subject: subject || "OTP for Verification", // Default subject if not provided
            text: `Your OTP is: ${otp}`, 
        };

        let info = await transporter.sendMail(mailOptions);

        console.log("Message sent: %s", info.response);

        global_otp = otp;
        console.log(global_otp)
        console.log(otp)
        res.status(200).send("Email sent successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while sending the email");
    }
};

const verifyotpController = (req, res) => {
    const { otp } = req.query;
    const storedOTP = global_otp
  
    if (!storedOTP) {
      res.status(400).send('OTP expired or invalid');
    } else if (parseInt(otp) === storedOTP) {
      res.status(200).send('OTP verified successfully');
    } else {
      res.status(400).send('Incorrect OTP');
    }
};



module.exports = { sendmailController, verifyotpController };
 