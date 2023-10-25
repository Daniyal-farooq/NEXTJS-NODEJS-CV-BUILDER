import { useState, useEffect } from "react";
import styles from '../styles/form2.module.css';

const SkillsForm = () => {
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [theSkillForms, setTheSkillForms] = useState([]); // Initialize with an empty array
  const [editSkillIndex, setEditSkillIndex] = useState(-1);
  const [isSkillEditing, setIsSkillEditing] = useState(false);

  const addSkillHandler = () => {
    if (skillName.trim() !== "") {
      const newSkill = {
        name: skillName,
        level: skillLevel,
      };
      setTheSkillForms([...theSkillForms, newSkill]);
      setSkillName("");
      setSkillLevel("Beginner");
      setIsSkillEditing(false);
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
    if (skillName.trim() !== "") {
      const updatedSkillForms = [...theSkillForms];
      if (isSkillEditing) {
        updatedSkillForms[editSkillIndex] = { name: skillName, level: skillLevel };
      } else {
        updatedSkillForms.push({ name: skillName, level: skillLevel });
      }
      setTheSkillForms(updatedSkillForms);
      setSkillName("");
      setSkillLevel("Beginner");
      setIsSkillEditing(false);
    }
  };

  useEffect(() => {
    const storedSkills = localStorage.getItem("skills");
    if (storedSkills) {
      setTheSkillForms(JSON.parse(storedSkills));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(theSkillForms));
  }, [theSkillForms]);

  return (
    <section style={{ marginTop: "10px" }}>
      <div className="container">
        <div className="row">
          <div className={`col-12 mx-auto ${styles.backgroundColor}`}>
            <div className="row">
              <div className="col-md-4">
                <p
                  style={{
                    color: "white",
                    fontSize: "20px",
                    textAlign: "center",
                    padding: "none",
                    display: "inline",
                    marginLeft: "15px",
                  }}
                >
                  SKILLS
                </p>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-6" style={{}}>
                  <input
                    style={{ height: "20px", marginTop: "5px" }}
                    placeholder="Skill name here..."
                    type="text"
                    className={`form-control ${styles.placeHolder}`}
                    id="skillName"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                  />
                </div>
                <div className="col-md-4" style={{}}>
                  <select
                    className={styles.slct}
                    style={{ fontFamily: "Rondal" }}
                    id="skillLevel"
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div className="col-md-2" style={{}}>
                  {isSkillEditing ? (
                    <div
                      className={styles.saveGroup}
                      style={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <button
                        type="button"
                        onClick={saveSkillHandler}
                        style={{ marginTop: "3px", marginRight: "10px" }}
                        className={`${styles.animatedBtn} ${styles.btns} `}
                      >
                        <span className={styles.transition}></span>
                        <span className={styles.gradient}></span>
                        <span className={styles.label}>Save</span>
                      </button>
                    </div>
                  ) : (
                    <div className="col-12 d-flex justify-content-end">
                      <button
                        type="button"
                        onClick={addSkillHandler}
                        style={{ marginTop: "3px" }}
                        className={`${styles.animatedBtn} ${styles.addSkillBtn}`}
                      >
                        <span className={styles.transition}></span>
                        <span className={styles.gradient}></span>
                        <span className={styles.label}>Add Skill</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div>
                  {theSkillForms.map((skill, index) => (
                    <div key={index}>
                      <button
                        className={`${styles.customBtn} ${styles.btn1}`}
                        onClick={() => editSkillHandler(index)}
                      >
                        {skill.name} - {skill.level}
                      </button>
                      <button
                        className={`${styles.customBtn} ${styles.crossBtn}`}
                        onClick={() => setTheSkillForms(theSkillForms.filter((_, i) => i !== index))}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsForm;
