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
    console.log(formData); // Log to see if all fields are present
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
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Nom</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Éducation</label>
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Expérience professionnelle</label>
          <input
            type="text"
            name="workExperience"
            value={formData.workExperience}
            onChange={(e) => setFormData({ ...formData, workExperience: e.target.value })}
            required
          />
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
