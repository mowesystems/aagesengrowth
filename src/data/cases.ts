export interface CaseItem {
  id: string;
  client: string;
  type: string;
  description: string;
  deliverables: string[];
  imagePath?: string;
  published: boolean;
}

export const cases: CaseItem[] = [
  {
    id: "placeholder-1",
    client: "",
    type: "",
    description: "",
    deliverables: [],
    published: false,
  },
];

export default cases;
