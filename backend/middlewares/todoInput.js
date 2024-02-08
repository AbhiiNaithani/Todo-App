const zod = require('zod');

const titleSchema = zod.string().min(1);
const descriptionSchema = zod.string().min(1);

function todoInput(req,res,next){
    const {title,description} = req.body;
    const titleResponse = titleSchema.safeParse(title);
    if(!titleResponse.success){
        res.status(401).json({
            message : 'Please enter a title',
        })
        return;
    } 
    const descriptionResponse = descriptionSchema.safeParse(description);
    if(!descriptionResponse.success){
        res.status(401).json({
            message : 'Please enter a description',
        })
        return;
    } 
    next();
}

module.exports = todoInput;