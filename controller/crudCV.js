const CV = require('../model/cv');
const Entete = require('../model/entete');
const Contact = require('../model/contact');
const Experience = require('../model/experience');
const Formation = require('../model/formation');
const Langue = require('../model/langue');
const Competence = require('../model/competence');
const CentreInteret = require('../model/centreInteret');

exports.createCV = async (req, res) => {
  try {
    const { titre, enteteId, contactId, experienceId, formationId, langueId, competenceId, centreInteretId } = req.body;

    // Fetch the associated data from their respective collections
    const entete = await Entete.findById(enteteId);
    const contact = await Contact.findById(contactId);
    const experience = await Experience.findById(experienceId);
    const formation = await Formation.findById(formationId);
    const langue = await Langue.findById(langueId);
    const competence = await Competence.findById(competenceId);
    const centreInteret = await CentreInteret.findById(centreInteretId);

    

    // Create a new instance of the CV model
    const newCV = new CV({
      titre,
      entete,
      contact,
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
