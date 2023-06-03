

const CV = require('../model/cv');
const Entete = require('../model/entete');
const contacts = require('../model/contact');
const Experience = require('../model/experience');
const Formation = require('../model/formation');
const Langue = require('../model/langue');
const Competence = require('../model/competence');
const CentreInteret = require('../model/centreInteret');
const { createcontact } = require('./crudContact');
  

exports.createCV = async (req, res) => {
    try {
      console.log(req.body); // Log the req.body object
      
      const { titre, enteteId, contactId, experienceId, formationId, langueId, competenceId, centreInteretId } = req.body;
  
      console.log('ContactId:', contactId);
     // Check if contactId is present and has a value
     if (!contactId) {
        return res.status(400).json({ error: 'ContactId is required' });
      }
      // Fetch the associated data from their respective collections
      const entete = await Entete.findById(enteteId);
      const contact = await contacts.findById(contactId); 
      const experience = await Experience.findById(experienceId);
      const formation = await Formation.findById(formationId);
      const langue = await Langue.findById(langueId);
      const competence = await Competence.findById(competenceId);
      const centreInteret = await CentreInteret.findById(centreInteretId);
      if (!contact) {
        throw new Error('Contact not found');
      }
      // Create a new instance of the CV model
      const newCV = new CV({
        titre,
        entete,
        contact: contact._id, // Assign the saved contact directly
        experience,
        formation,
        langue,
        competence,
        centreInteret
      });
  
      // Save the CV to the database
      const savedCV = await newCV.save();
  

      // CV saved successfully
      return res.status(200).json(savedCV);
    } catch (error) {
      console.error('Error saving CV:', error);
      return res.status(500).json({ error: 'Failed to save CV' });
    }
    
  };
  

  
  