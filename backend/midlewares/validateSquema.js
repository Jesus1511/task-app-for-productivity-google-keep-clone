export const validateSquema = (squema) => (req, res, next) => {
    try {
        squema.parse(req.body)
        next()
    }
    catch (error) {
        res.status(404).json({message: "esquema de solicitud invalido"})
    }
}