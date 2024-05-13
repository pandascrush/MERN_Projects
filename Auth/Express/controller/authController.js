import authModel from "../model/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// SignUp Controller
const Signup = async (req, res) => {
  const { Name, Email, Mobile, Password } = req.body;

  try {
    const user = await authModel.findOne({ Email });
    if (user) {
      // res.status(500);
      res.json({ msg: "exist" });
    } else {
      const hashPassword = await bcrypt.hash(Password, 10);
      const userData = new authModel({
        Name,
        Mobile,
        Email,
        Password: hashPassword,
      });
      await userData.save();
      res.status(200).json({ msg: "added", user: userData });
    }
  } catch (err) {
    res.json({ msg: "error" });
  }
};

// Login Controller
const Login = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await authModel.findOne({ Email });
    // console.log(user);
    if (!user) {
      res.json({ msg: "please_signup" });
    } else {
      const matchPassword = await bcrypt.compare(Password, user.Password);
      if (!matchPassword) {
        res.json({ msg: "password_incorrect" });
      } 
      else{
        const token = jwt.sign({user:user._id},"secretkey",{expiresIn:"2m"})
        res.cookie("accessToken",token,{secure:true,sameSite:true,httpOnly:true})
        res.json({ msg: "login_successfully" })
      }
    }
  } catch (err) {
    res.json({ msg: "error" });
  }
};


// Forget Password Controller
const ForgotPassword = async (req, res) => {
  const { Email } = req.body;

  const user = await authModel.findOne({ Email });
  console.log(user);

  const token = jwt.sign({id: user._id }, "secretkey", { expiresIn: "5m" });

  try {
    if (!user) {
      res.json({ status: false, msg: "not_exist" });
    } else {

      var transporter = nodemailer.createTransport({
        service:"Gmail",
        auth: {
          user: "sivaranji5670@gmail.com",
          pass: "rukd whpj dzcn kjur",
        },
      });

      const text = `http://localhost:3000/reset/${token}`;

      var mailOptions = {
        from: "sivaranji5670@gmail.com",
        to: Email,
        subject: "Reset Password",
        html : `<h1>Reset Password Link</h1>
                <p>Warmest birthday wishes to you on your special day! We hope this day brings you happiness, good health, and the fulfillment of all your dreams. Your dedication and hard work are truly appreciated, and we are grateful to have you as part of our team.

                May the year ahead be filled with success, both personally and professionally. Enjoy your day to the fullest!</p>
                <p>${text}</p>`,
    
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("mail error", error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.json({ status: true, msg: "mail_send" });
    }
  } catch (e) {
    res.json({ msg: "catch error", err: e });
  }
}

// Reset Password Controller
const ResetPassword = async(req,res)=>{
  const {Password} = req.body
  const {id} = req.params
 
  try{
  const verified = jwt.verify(id,"secretkey")
  const userId =  verified.id
  const hashPassword = await bcrypt.hash(Password,10)
  await authModel.findByIdAndUpdate({_id:userId},{Password:hashPassword})
  res.json({status:true, msg:"updated"})
  }
  catch(e){
    res.json({msg:"catch_error"})
  }

}

// Coookie Verification Controller
const Verify = async(req,res)=>{
     res.json({status:true,msg:"authorized"})
}

// Logout Controller
const Logout = async(req,res) =>{
  res.clearCookie('accessToken')
  res.json({status:true,msg:"logout"})
}

export { Signup, Login, ForgotPassword, ResetPassword, Verify, Logout };
