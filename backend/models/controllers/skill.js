const env = require('dotenv')
env.config('/.env')
const db = require('../entity/index.js')
const Skill = db.SKILL;
const User=db.USER

//Adding skill

const create_skill = async (req, res) => {
    const { skillName, skillCategory, certified, userId } = req.body;
    console.log(req.body)
    if (!skillName || !skillCategory || !userId) {
        return res.status(400).send({ message: 'Skill Name, Skill Category, and UserID are required fields.'});
      }
    try {
      const skill = await Skill.create({
        Skill_Name: skillName,
        Skill_Category: skillCategory,
        Iscertified: certified,
        UserId: userId,
      });
  
      console.log('Skill added successfully');
      return res.status(200).send({ message: 'Skill added successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  };

//Get skill from DB to Admin

const fetch_skill = async (req, res) => {
    // console.log(req.params.user_id)
    try {
      const results = await User.findAll({
        where: { IsAdmin: false },
        include: [
          {
            model: Skill,
            attributes: ['Skill_Name', 'Skill_Category', 'Iscertified'],
          },
        ],
      });
  
      const formattedResults = results.map((user) => {
        return {
          UserId: User.UserId,
          UserName: User.UserName,
          Skill_Names: Skill.Skill_Name.map((skill) => skill.Skill_Name).join(', '),
          Skill_Categories: Skill.Skill_Category.map((skill) => skill.Skill_Category).join(', '),
          Iscertified: Skill.Iscertified.map((skill) => skill.Iscertified).join(', '),
        };
      });
  
      return res.status(200).json(formattedResults);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
    module.exports = {
        create_skill,
        fetch_skill
    }