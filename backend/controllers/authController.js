const bcrypt=require('bcryptjs'); const jwt=require('jsonwebtoken'); const User=require('../models/User');
const sign=id=>jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'});
exports.register=async(req,res)=>{try{const {name,email,phone,password}=req.body; if(!name||!phone||!password) return res.status(400).json({message:'Required fields missing'}); const exists=await User.findOne({phone}); if(exists) return res.status(400).json({message:'Phone already registered'}); const user=await User.create({name,email,phone,password:await bcrypt.hash(password,10)}); res.status(201).json({token:sign(user._id),user:{id:user._id,name,email,phone}});}catch(e){res.status(500).json({message:e.message})}};
exports.login=async(req,res)=>{try{const {phone,password}=req.body; const user=await User.findOne({phone}); if(!user||!(await bcrypt.compare(password,user.password))) return res.status(401).json({message:'Invalid credentials'}); res.json({token:sign(user._id),user:{id:user._id,name:user.name,email:user.email,phone:user.phone}});}catch(e){res.status(500).json({message:e.message})}};
exports.adminLogin=(req,res)=>{const {username,password}=req.body; if(username===process.env.ADMIN_USERNAME&&password===process.env.ADMIN_PASSWORD){return res.json({token:jwt.sign({admin:true,username},process.env.JWT_SECRET,{expiresIn:'7d'}),admin:{username}})} res.status(401).json({message:'Invalid admin credentials'});};
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    await user.save();

    res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};