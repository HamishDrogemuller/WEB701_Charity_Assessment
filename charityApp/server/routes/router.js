const express = require('express');
const router = express.Router();
const listing = require('../models/listingSchema');
const beneficiary = require('../models/beneficiarySchema');
const provider = require('../models/providerSchema');


//Beneficiary Processes
//Create beneficiary
router.post('/beneficiarymember', async (req, res) => {
    const newBeneficiary = req.body;
  
    try {
      // Save the new beneficiary to the database
      const beneficiaryMember = await beneficiaryMember.create(newBeneficiary);
      res.status(201).send(beneficiaryMember);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating beneficiary member');
    }
  });

//Login
router.post('/beneficiarymember/login', async (req, res) => {
    const { email, password} = req.body;
  
    try {
      // Find the member with the given details and mark as online
      const beneficiaryMember = await beneficiaryMember.findOneAndUpdate({ email, password }, { loginStatus: 'online' }, { new: true });
  
      if (beneficiaryMember) {
        res.status(200).send(beneficiaryMember);
      } else {
        res.status(401).send('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error logging in beneficiary member');
    }
  });

//LogOut
router.post('/beneficiarymember/logout', async (req, res) => {
    const { email } = req.body;
  
    try {
      const beneficiaryMember = await beneficiaryMember.findOne({ email });
      if (!beneficiaryMember) {
        return res.status(404).json({ message: 'Member not found.' });
      }
  
      beneficiaryMember.loginStatus = 'offline';
      await beneficiaryMember.save();
  
      return res.status(200).json({ message: 'Member logged out successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while logging out the beneficiary member.' });
    }
  });

//Delete
router.delete('/beneficiarymember/:memberID', async (req, res) => {
    const { memberID } = req.params;
    
    try {
    // Delete member with corresponding ID
    await beneficiarymember.findByIdAndDelete(memberID);
    res.status(204).send();
    } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting member');
    }
    });

//Edit
router.put('/beneficiarymember/:memberID', async (req, res) => {
    const { memberID } = req.params;
    const updatedBeneficiaryMember = req.body;
    
    try {
    // Find member with corresponding id and update
    const beneficiaryMember = await beneficiaryMember.findByIdAndUpdate(memberID, updatedBeneficiaryMember, { new: true });
    res.status(200).send(beneficiaryMember);
    } catch (error) {
    console.error(error);
    res.status(500).send('Error updating beneficiary member');
    }
    });
//Provider Processes
//Create provider
router.post('/providermember', async (req, res) => {
    const newProvider = req.body;
  
    try {
      // Save the new provider to the database
      const providerMember = await providerMember.create(newProvider);
      res.status(201).send(providerMember);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating provider member');
    }
  });


//Listing Processes
//Create listing
router.post('/providermember/:memberID/listings', async (req, res) => {
    const { memberID } = req.params;
    const newListing = req.body;
    
    try {
    // Find the charity member with the given ID and create a new food advertisement for them
    const providerMember = await providerMember.findById(memberID);
    const listing = new Listing(newListing);
    providerMember.listing.push(listing);
    await providerMember.save();
    res.status(201).send(listing);
    } catch (error) {
    console.error(error);
    res.status(500).send('Error creating listing');
    }
    });
//Remove Listing
router.delete('/providermember/:memberID/listings/:listingID', async (req, res) => {
    const { memberID, listingID } = req.params;
    
    try {
    // Find the provider with the corresponding ID and remove the corresponding listing
    const providerMember = await providerMember.findById(memberID);
    providerMember.listing.id(listingID).remove();
    await providerMember.save();
    res.status(204).send();
    } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting listing');
    }
    });

//Edit Listing
router.put('/providermember/:memberID/listing/:listingID', async (req, res) => {
    const { memberID, listingID } = req.params;
    const updatedListing = req.body;
    
    try {
    // Locate member with corresponding ID and edit Listing with Corresponding ID
    const providerMember = await providerMember.findById(memberID);
    const listing = providerMember.listing.id(listingID);
    Object.assign(listing, updatedListing);
    await providerMember.save();
    res.status(200).send(listing);
    } catch (error) {
    console.error(error);
    res.status(500).send('Error updating listing');
    }
    });