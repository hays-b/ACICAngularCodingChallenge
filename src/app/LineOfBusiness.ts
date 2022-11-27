export interface LineOfBusiness {
  id: number;
  name: string;
  description: string;
}

export interface RecentQuote {
  id: number;
  quoteNumber: string;
  lineOfBusiness: number;
}

export interface LineOfBusinessWithQuotes {
  id: number;
  name: string;
  description: string;
  quotes: number;
}