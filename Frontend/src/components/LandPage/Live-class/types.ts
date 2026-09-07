export interface LiveClassFeature {
  icon: string;
  title: string;
  description: string;
}

export interface LiveClassesData {
  title: string;
  description: string;

  imageUrl: string;
  imageAlt: string;

  features: LiveClassFeature[];
}

export interface LiveClassesProps {
  type: string;
  variant: string;
  data: LiveClassesData;
}