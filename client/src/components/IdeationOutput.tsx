import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface IdeationOutputProps {
  output: string;
}

const IdeationOutput: React.FC<IdeationOutputProps> = ({ output }) => {
  if (!output) return null;

  return (
    <div className="card p-4">
      <h4>Generated Ideation</h4>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {output}
      </ReactMarkdown>
    </div>
  );
};

export default IdeationOutput;
