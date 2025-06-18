import React, { useState } from 'react';

interface IdeationFormProps {
  onSubmit: (description: string) => void;
}

const IdeationForm: React.FC<IdeationFormProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description);
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h3 className="mb-3">AI Research Ideation</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Describe your ML research idea..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Generate Ideas
        </button>
      </form>
    </div>
  );
};

export default IdeationForm;
