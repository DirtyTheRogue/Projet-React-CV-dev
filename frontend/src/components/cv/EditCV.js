import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EditCV = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    description: '',
    education: '',
    workExperience: '',
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

  const { firstName, lastName, description, education, workExperience } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://projet-react-cv-dev.onrender.com/api/cvs/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Réponse du serveur:', response); 
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
          <input type="text" name="firstName" value={firstName} onChange={onChange} required />
        </div>
        <div>
          <label>Nom</label>
          <input type="text" name="lastName" value={lastName} onChange={onChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={description} onChange={onChange} required />
        </div>
        <div>
          <label>Éducation</label>
          <input type="text" name="education" value={education} onChange={onChange} required />
        </div>
        <div>
          <label>Expérience professionnelle</label>
          <input type="text" name="workExperience" value={workExperience} onChange={onChange} required />
        </div>
        <button type="submit">Modifier le CV</button>
      </form>

      <div>
        <Link to="/">Menu Principal</Link>
      </div>

    </div>
  );
};

export default EditCV;
