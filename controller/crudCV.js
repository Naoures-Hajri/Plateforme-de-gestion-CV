

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
      
      const {enteteId, contactId, experienceId, formationId, langueId, competenceId, centreInteretId } = req.body;
  
      console.log('ContactId:', contactId);
      console.log('EnteteId:', enteteId);
      console.log('CompetenceId:', competenceId);
      console.log('LangueId:', langueId);
      console.log('InteretId:', centreInteretId);
      console.log('experienceId:', experienceId);
      console.log('formationId:', formationId);
     // Check if contactId is present and has a value
     if (!contactId) {
        return res.status(400).json({ error: 'ContactId is required' });
      }
       // Check if contactId is present and has a value
     if (!enteteId) {
        return res.status(400).json({ error: 'EnteteId is required' });
      }
         // Check if competenceId is present and has a value
     if (!competenceId) {
        return res.status(400).json({ error: 'CompetenceId is required' });
      }
           // Check if langueId is present and has a value
     if (!langueId) {
        return res.status(400).json({ error: 'LangueId is required' });
      }
             // Check if interetId is present and has a value
     if (!centreInteretId) {
        return res.status(400).json({ error: 'centreInteretId is required' });
      }
               // Check if experienceId is present and has a value
     if (!experienceId) {
        return res.status(400).json({ error: 'experienceId is required' });
      }
                 // Check if formationId is present and has a value
     if (!formationId) {
        return res.status(400).json({ error: 'formationId is required' });
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
      if (!entete) {
        throw new Error('Entete not found');
      }
      if (!competence) {
        throw new Error('Competence not found');
      }
      if (!langue) {
        throw new Error('Langue not found');
      }
      if (!centreInteret) {
        throw new Error('Interet not found');
      }
      if (!experience) {
        throw new Error('Experience not found');
      }
      if (!formation) {
        throw new Error('Formation not found');
      }
      // Create a new instance of the CV model
      const newCV = new CV({
       
        entete: entete._id,
        contact: contact._id, // Assign the saved contact directly
        experience: experience._id,
        formation:formation._id,
        langue: langue._id,  // Assign the saved langue directly
        competence: competence._id,  // Assign the saved competence directly
        centreInteret: centreInteret._id,
      });
  
      // Save the CV to the database
      const savedCV = await newCV.save();
        // Update the savedCV object with the cvId
    const cvId = savedCV._id;

    // Update the savedCV object with cvId
    savedCV.cvId = cvId;

    // Save the updated savedCV object
    await savedCV.save();

      // CV saved successfully
      return res.status(200).json(savedCV);
    } catch (error) {
      console.error('Error saving CV:', error);
      return res.status(500).json({ error: 'Failed to save CV' });
    }
    
  };
  

  
  