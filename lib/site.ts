import { BrainCircuit, Sparkles, Network, Database, Search, MessageSquareCode, Terminal, Globe2, LayoutDashboard, Server, Wrench, BarChart3 } from 'lucide-react';

export const PHONE_DISPLAY = '0345 9119746';
export const PHONE_TEL = 'tel:+923459119746';
export const WA_NUMBER = '923459119746';
export const PHONE_WA = `https://wa.me/${WA_NUMBER}`;
export const LINKEDIN = 'https://www.linkedin.com/in/muhammad-usman-9a983137a';
export const GITHUB = 'https://github.com/asarali0073-rgb';
export const DS_PORTFOLIO = 'https://github.com/asarali0073-rgb/Data-Science-Projects-Portfolio';

export const navLinks: [string, string][] = [
  ['Home', '/'], ['Tech Stack', '/tech-stack'], ['Projects', '/projects'], ['Contact', '/contact']
];

// Every item below comes from the CV's technical skills section.
export const techCategories = [
  { icon: BrainCircuit, title: 'AI & Machine Learning', text: 'Building models that learn from data, then training and evaluating them properly.', items: ['Machine Learning', 'Deep Learning', 'Model training & evaluation'] },
  { icon: BarChart3, title: 'Data Science', text: 'Exploring data, finding patterns and presenting them clearly.', items: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Exploratory data analysis', 'Data visualization'] },
  { icon: Network, title: 'NLP', text: 'Turning raw text into clean, structured input for language workflows.', items: ['Text cleaning', 'Tokenization', 'Lemmatization', 'NLP workflows'] },
  { icon: Sparkles, title: 'Transformers & LLMs', text: 'Understanding the architecture behind modern language models, down to the components.', items: ['Self-attention', 'Multi-head attention', 'Encoder–decoder', 'Next-token prediction', 'LLMs'] },
  { icon: Search, title: 'RAG & Vector Search', text: 'End-to-end retrieval pipelines that keep language-model answers grounded in source documents.', items: ['Document ingestion', 'Chunking', 'Embeddings', 'Vector indexing', 'Top-k semantic retrieval', 'Grounded Q&A'] },
  { icon: MessageSquareCode, title: 'LLM Applications', text: 'Connecting language models to real products through APIs.', items: ['Anthropic API integration', 'LLM chatbots & assistants', 'AI content generation', 'Retrieval-grounded Q&A'] },
  { icon: Terminal, title: 'Programming & APIs', text: 'Python-first development with clean, reliable API layers.', items: ['Python', 'FastAPI', 'Flask', 'REST APIs', 'LLM API integration'] },
  { icon: Database, title: 'Data Collection', text: 'Gathering and preparing data so that it is ready for analysis and AI.', items: ['Web scraping', 'Data collection', 'Preprocessing', 'Data cleaning'] },
  { icon: LayoutDashboard, title: 'Frontend Development', text: 'Responsive, interactive interfaces for the things I build.', items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React', 'Responsive design', 'Dashboards & forms'] },
  { icon: Server, title: 'Backend Development', text: 'Server-side logic, authentication and data storage.', items: ['Node.js', 'Express.js', 'REST API development', 'Flask backends', 'Firebase Auth & Firestore'] },
  { icon: Wrench, title: 'Tools & Workflow', text: 'The everyday environment for experimenting, building and versioning.', items: ['Google Colab', 'Jupyter Notebook', 'VS Code', 'Git', 'GitHub'] }
];

export const sphereTech = ['Python', 'FastAPI', 'Flask', 'React', 'Node.js', 'Express.js', 'Firebase', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'LLMs', 'RAG', 'Transformers', 'NLP', 'Deep Learning', 'Machine Learning', 'Anthropic API', 'REST APIs', 'Git', 'GitHub', 'Jupyter', 'Colab', 'VS Code', 'JavaScript', 'HTML5', 'CSS3', 'Web Scraping'];

export const homeTech = [
  { label: 'AI & DATA', items: ['Machine Learning', 'Deep Learning', 'NLP', 'Transformers', 'LLMs', 'RAG', 'Pandas', 'NumPy'] },
  { label: 'WEB & APIS', items: ['React', 'Node.js', 'Express.js', 'Flask', 'FastAPI', 'REST APIs'] },
  { label: 'LANGUAGES & TOOLS', items: ['Python', 'JavaScript', 'Git', 'GitHub', 'Google Colab', 'VS Code'] }
];

export { Globe2 };
