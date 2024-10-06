export interface IdeaTrait {
  name: string;
  value: number;
}

export interface Resource {
  type: 'file' | 'link';
  name: string;
  url: string;
  description: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  rank: number;
  resources: Resource[];
  process: string[];
  createdAt: Date;
  traits: IdeaTrait[];
}

export const traitNames = [
  "Technical Feasibility",
  "Time to MVP",
  "Cost to Develop",
  "Market Demand and Revenue Potential",
  "Scalability",
  "Maintenance and Complexity",
  "Industry Familiarity",
  "Industry Restrictions or Regulations",
  "Ease of Prototypability",
  "Number of Large Assumptions",
  "Adjacency to Users"
];