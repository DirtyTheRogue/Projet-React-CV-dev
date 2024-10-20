import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EditCV = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    description: '',
    education: [{ degree: '', institution: '', year: '' }],
    workExperience: [{ jobTitle: '', company: '', duration: '', description: '' }],
    visible: false
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const res = await axios.get(`https://projet-react-cv-dev.onrender.com/api/cvs/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFormData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCV();
  }, [id]);

  const handleEducationChange = (index, event) => {
    const values = [...formData.education];
    values[index][event.target.name] = event.target.value;
    setFormData({ ...formData, education: values });
  };

  const handleWorkExperienceChange = (index, event) => {
    const values = [...formData.workExperience];
    values[index][event.target.name] = event.target.value;
    setFormData({ ...formData, workExperience: values });
  };

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://projet-react-cv-dev.onrender.com/api/cvs/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/cvs');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Modifier le CV</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Prénom</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Nom</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            required
          />
        </div>

        <h3>Éducation</h3>
        {formData.education.map((edu, index) => (
          <div key={index}>
            <label>Diplôme</label>
            <input
              type="text"
              name="degree"
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, e)}
            />
            <label>Institution</label>
            <input
              type="text"
              name="institution"
              value={edu.institution}
              onChange={(e) => handleEducationChange(index, e)}
            />
            <label>Année</label>
            <input
              type="text"
              name="year"
              value={edu.year}
              onChange={(e) => handleEducationChange(index, e)}
            />
          </div>
        ))}

        <h3>Expérience professionnelle</h3>
        {formData.workExperience.map((exp, index) => (
          <div key={index}>
            <label>Titre du poste</label>
            <input
              type="text"
              name="jobTitle"
              value={exp.jobTitle}
              onChange={(e) => handleWorkExperienceChange(index, e)}
            />
            <label>Entreprise</label>
            <input
              type="text"
              name="company"
              value={exp.company}
              onChange={(e) => handleWorkExperienceChange(index, e)}
            />
            <label>Durée</label>
            <input
              type="text"
              name="duration"
              value={exp.duration}
              onChange={(e) => handleWorkExperienceChange(index, e)}
            />
            <label>Description</label>
            <textarea
              name="description"
              value={exp.description}
              onChange={(e) => handleWorkExperienceChange(index, e)}
            />
          </div>
        ))}

        <button type="submit">Modifier le CV</button>
      </form>

      <div>
        <Link to="/">Menu Principal</Link>
      </div>
    </div>
  );
};

export default EditCV;
