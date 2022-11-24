export interface LineOfBusiness {
  id: number;
  name: string;
  description: string;
}

// NEW START -
export interface RecentQuote {
  id: number;
  quoteNumber: string;
  lineOfBusiness: number;
}
// NEW END -