const listing = require('../models/model')

createListing = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide listing details'
        })
    }

    const listing = new Listing(body)

    if (!listing) {
        return res.status(400).json({ 
            success: false, error: err
        })
    }

    listing
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,

            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Listing not created'
            })
        })
}

updateListing = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Please provide update information'
        })
    }

    listing.findOne({ _id: req.params.id}, (err, listing) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Listing not found'
            })
        }
        listing.name = body.name
        listing
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: listing._id,
                    message: 'Listing Updated'
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Listing not updated'
                })
            })
    })
}

deleteListing = async (req, res) => {
    await listing.findOneAndDelete({_id: req.params.id}, (err, listing) =>{
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!listing) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: 'Listing not found'
                })
        }

        return res.status(200).json({
            success: true,
            data: listing
        })
    })
    .catch(err => console.log(err))
}

getListingById = async (req,res) => {
    await listing.find({}, (err, listings) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        if (!listings.length) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: 'Listings not found'
                })
        }
        return res.status(200).json({
            success: true,
            data: listings
        })
    }).catch(err => console.log(err))
}

createProvider = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'you must provide details'
        })
    }
}