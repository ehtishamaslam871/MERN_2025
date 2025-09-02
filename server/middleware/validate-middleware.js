const validate = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    } catch (err) {
        res.status(422).json({
            message: "Fill the inputs properly",
            extraDetails: err.errors
        });
    }
};

module.exports =  validate;
