import { useState, useEffect } from 'react';

const SkillsPage = () => {
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [theSkillForms, setTheSkillForms] = useState([]);
  const [editSkillIndex, setEditSkillIndex] = useState(-1);
  const [isSkillEditing, setIsSkillEditing] = useState(false);

  useEffect(() => {
    const savedSkills = localStorage.getItem('skills');
    if (savedSkills) {
      setTheSkillForms(JSON.parse(savedSkills));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('skills', JSON.stringify(theSkillForms));
  }, [theSkillForms]);

  const addSkillHandler = () => {
    if (skillName.trim() !== '') {
      const newSkill = {
        name: skillName,
        level: skillLevel
      };
      setTheSkillForms([...theSkillForms, newSkill]);
      setSkillName('');
      setSkillLevel('Beginner');
    }
  };

  const editSkillHandler = (index) => {
    const selectedSkill = theSkillForms[index];
    setSkillName(selectedSkill.name);
    setSkillLevel(selectedSkill.level);
    setEditSkillIndex(index);
    setIsSkillEditing(true);
  };

  const saveSkillHandler = () => {
    if (skillName.trim() !== '') {
      const updatedSkillForms = [...theSkillForms];
      updatedSkillForms[editSkillIndex].name = skillName;
      updatedSkillForms[editSkillIndex].level = skillLevel;
      setTheSkillForms(updatedSkillForms);
      setSkillName('');
      setSkillLevel('Beginner');
      setEditSkillIndex(-1);
      setIsSkillEditing(false);
    }
  };

  const deleteSkillHandler = () => {
    const updatedSkillForms = [...theSkillForms];
    updatedSkillForms.splice(editSkillIndex, 1);
    setTheSkillForms(updatedSkillForms);
    setSkillName('');
    setSkillLevel('Beginner');
    setEditSkillIndex(-1);
    setIsSkillEditing(false);
  };

  const submitHandler = () => {
    console.log(theSkillForms);
    // Perform other submission logic here
  };

  return (
    <div>
      <h1>Skills</h1>

      <form>
        <div>
          <label htmlFor="skillName">Skill Name:</label>
          <input
            type="text"
            id="skillName"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="skillLevel">Skill Level:</label>
          <select
            id="skillLevel"
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        {isSkillEditing ? (
          <div>
            <button type="button" onClick={saveSkillHandler}>
              Save Skill
            </button>
            <button type="button" onClick={deleteSkillHandler}>
              Delete
            </button>
          </div>
        ) : (
          <button type="button" onClick={addSkillHandler}>
            Add Skill
          </button>
        )}
      </form>

      <div>
        {theSkillForms.map((skill, index) => (
          <div key={index}>
            <button onClick={() => editSkillHandler(index)}>
              {skill.name} - {skill.level}
            </button>
          </div>
        ))}
      </div>

      <button type="button" onClick={submitHandler}>
        Submit
      </button>
    </div>
  );
};

export default SkillsPage;
