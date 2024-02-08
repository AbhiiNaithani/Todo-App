const zod = require('zod');

const emailSchema = zod.string().email().endsWith('.com');
const passwordSchema = zod.string().min(8);

function authInput(req,res,next){
    const {email,password} = req.body;
    const emailResponse = emailSchema.safeParse(email);
    if(!emailResponse.success){
        res.status(401).json({
            message : 'Invalid email',
        })
        return;
    } 
    const passwordResponse = passwordSchema.safeParse(password);
    if(!passwordResponse.success){
        res.status(401).json({
            message : 'password must contain at least 8 characters',
        })
        return;
    } 
    next();
}

module.exports = authInput;